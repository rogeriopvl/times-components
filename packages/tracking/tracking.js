import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import PropTypes from "prop-types";

const getDisplayName = (WrappedComponent, alternativeName) =>
  alternativeName ||
  WrappedComponent.displayName ||
  WrappedComponent.name ||
  "Component";

export const trackingContextTypes = {
  tracking: PropTypes.shape({
    perf: PropTypes.func,
    monitoring: PropTypes.func,
    analytics: PropTypes.func,
    addTrackingContext: PropTypes.func,
    addTracking: PropTypes.func
  })
};

export const addTracking = (
  WrappedComponent,
  funcsToTrack = [],
  alternativeName
) => {
  const componentName = getDisplayName(WrappedComponent, alternativeName);

  class WithTracking extends Component {
    constructor(props) {
      super(props);

      this.wrappedFuncs = new Map();
      this.getProps = this.getProps.bind(this);
    }

    componentDidMount() {
      if (!this.context.tracking) {
        return;
      }

      this.context.tracking.analytics({
        object: componentName,
        action: "Rendered"
      });
    }

    getProps(props) {
      return (funcsAsProps, funcName) => {
        const [origFunc, wrappedFunc] = this.wrappedFuncs.get(funcName) || [];

        if (wrappedFunc && props[funcName] === origFunc) {
          return {
            ...funcsAsProps,
            funcName: wrappedFunc
          };
        }

        const funcWrapped = (...args) => {
          if (!this.context.tracking) {
            return props[funcName](...args);
          }

          this.context.tracking.analytics({
            object: componentName,
            action: "Action",
            props: {
              actionName: funcName
            }
          });

          return props[funcName] && props[funcName](...args);
        };
        this.wrappedFuncs.set(funcName, [props[funcName], funcWrapped]);

        return {
          ...funcsAsProps,
          [funcName]: funcWrapped
        };
      };
    }

    render() {
      const passProps = {
        ...this.props,
        ...funcsToTrack.reduce(this.getProps(this.props), {})
      };

      return <WrappedComponent {...passProps} />;
    }
  }

  WithTracking.displayName = `WithTracking(${componentName})`;

  hoistNonReactStatic(WithTracking, WrappedComponent);

  WithTracking.contextTypes = trackingContextTypes;
  WithTracking.propTypes = WrappedComponent.propTypes;
  WithTracking.defaultProps = WrappedComponent.defaultProps;

  return WithTracking;
};

export const addTrackingContext = WrappedComponent => {
  class WithTrackingContext extends Component {
    getChildContext() {
      return {
        tracking: {
          perf() {
            console.log("doing something with perf");
          },
          monitoring() {
            console.log("doing something with monitoring");
          },
          analytics(...args) {
            console.log("doing something with analytics", ...args);
          },
          addTracking,
          addTrackingContext
        }
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithTrackingContext.displayName = `WithTrackingContext(${getDisplayName(
    WrappedComponent
  )})`;

  hoistNonReactStatic(WithTrackingContext, WrappedComponent);

  WithTrackingContext.childContextTypes = trackingContextTypes;
  WithTrackingContext.propTypes = WrappedComponent.propTypes;
  WithTrackingContext.defaultProps = WrappedComponent.defaultProps;

  return WithTrackingContext;
};
