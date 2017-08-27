import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import PropTypes from "prop-types";
import _get from "lodash.get";

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
  {
    withAnalytics = [],
    withPerf = [],
    withMonitoring = [],
    trackingName,
    attrs,
    trackView,
    trackChildViews
  } = {}
) => {
  const componentName = getDisplayName(WrappedComponent, trackingName);

  class WithTracking extends Component {
    constructor(props) {
      super(props);

      this.wrappedFuncs = new Map();
      this.childData = {};
      this.viewed = new Set();
      this.getProps = this.getProps.bind(this);

      if (trackChildViews) {
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        };

        this.observer = new window.IntersectionObserver(
          this.onObserved.bind(this),
          options
        );
      }
    }

    componentWillMount() {
      this.setState(prevState => {
        if (!prevState.startRender) {
          return {
            ...prevState,
            startRender: window.performance.now()
          };
        }

        return prevState;
      });
    }

    componentDidMount() {
      if (!this.context || !this.context.tracking) {
        return;
      }

      if (trackView) {
        this.context.tracking.analytics({
          object: componentName,
          action: "Rendered",
          props: {
            ...attrs
          }
        });
      }

      this.observeChildren();

      this.context.tracking.perf({
        object: componentName,
        action: "Rendered",
        props: {
          time: window.performance.now() - this.state.startRender
        }
      });
    }

    componentDidUpdate() {
      this.observeChildren();
    }

    onObserved([{ intersectionRatio, isIntersecting, time, target }]) {
      if (this.context && !this.context.tracking) {
        return;
      }

      if (
        isIntersecting &&
        intersectionRatio === 1 &&
        !this.viewed.has(target.id)
      ) {
        this.viewed.add(target.id);

        const custom = (trackChildViews.attrs || []).reduce(
          (ck, key) => ({
            ...ck,
            [key]: this.childData[target.id][key]
          }),
          {}
        );

        this.context.tracking.analytics({
          object: `${componentName}Child`,
          action: "Viewed",
          props: {
            id: target.id,
            time: new Date(window.performance.timing.navigationStart + time),
            ...custom
          }
        });
      }
    }

    observeChild(props) {
      this.observer.observe(document.getElementById(props[trackChildViews.id]));
      this.childData[props[trackChildViews.id]] = props;
    }

    observeChildren() {
      if (trackChildViews && trackChildViews.listPath) {
        const list = _get(this.props, trackChildViews.listPath, []);
        list.forEach((props, indx) => {
          if (!this.childData[props[trackChildViews.id]]) {
            this.observeChild({ ...props, indx });
          }
        });
      }
    }

    getProps(props, trackingCb) {
      return (funcsAsProps, funcName) => {
        const [origFunc, wrappedFunc] = this.wrappedFuncs.get(funcName) || [];

        if (wrappedFunc && props[funcName] === origFunc) {
          return {
            ...funcsAsProps,
            [funcName]: wrappedFunc
          };
        }

        const funcWrapped = (...args) => {
          if (!this.context.tracking) {
            return props[funcName](...args);
          }

          trackingCb(funcName, attrs);

          return props[funcName] && props[funcName](...args);
        };
        this.wrappedFuncs.set(funcName, [props[funcName], funcWrapped]);

        return {
          ...funcsAsProps,
          [funcName]: funcWrapped
        };
      };
    }

    wrapWithAnalytics(funcName, requestedProps) {
      this.context.tracking.analytics({
        object: componentName,
        action: "Action",
        props: {
          actionName: funcName,
          ...requestedProps
        }
      });
    }

    wrapWithPerf(funcName, requestedProps) {
      this.context.tracking.perf({
        object: componentName,
        action: "Event",
        props: {
          actionName: funcName,
          ...requestedProps
        }
      });
    }

    wrapWithMonitoring(funcName, requestedProps) {
      this.context.tracking.monitoring({
        object: componentName,
        action: "Event",
        props: {
          actionName: funcName,
          ...requestedProps
        }
      });
    }

    render() {
      const passProps = this.context.tracking
        ? {
            ...this.props,
            ...withAnalytics.reduce(
              this.getProps(this.props, this.wrapWithAnalytics.bind(this)),
              {}
            ),
            ...withPerf.reduce(
              this.getProps(this.props, this.wrapWithPerf.bind(this)),
              {}
            ),
            ...withMonitoring.reduce(
              this.getProps(this.props, this.wrapWithMonitoring.bind(this)),
              {}
            )
          }
        : {
            ...this.props
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
          perf(...args) {
            console.log("doing something with perf", ...args);
          },
          monitoring(...args) {
            console.log("doing something with monitoring", ...args);
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
