import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import PropTypes from "prop-types";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

export const addTracking = WrappedComponent => {
  class WithTracking extends Component {
    componentDidMount() {
      if (!this.context.tracking) {
        return;
      }

      this.context.tracking.analytics({
        object: getDisplayName(WrappedComponent),
        action: "viewed"
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithTracking.displayName = `WithTracking(${getDisplayName(
    WrappedComponent
  )})`;

  hoistNonReactStatic(WithTracking, WrappedComponent);

  WithTracking.contextTypes = {
    tracking: PropTypes.shape({
      perf: PropTypes.func,
      monitoring: PropTypes.func,
      analytics: PropTypes.func
    })
  };

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
          }
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

  WithTrackingContext.childContextTypes = {
    tracking: PropTypes.shape({
      perf: PropTypes.func,
      monitoring: PropTypes.func,
      analytics: PropTypes.func
    })
  };

  return WithTrackingContext;
};
