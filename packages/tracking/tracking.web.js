import { makeTracking } from "./base-tracking";
export { addTrackingContext, logger } from "./base-tracking";

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
) =>
  class WithTracking extends makeTracking(WrappedComponent, {
    withAnalytics,
    withPerf,
    withMonitoring,
    trackingName,
    attrs,
    trackView,
    trackChildViews
  }) {
    constructor(props) {
      super(props);

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

    observeChild(props) {
      this.observer.observe(document.getElementById(props[trackChildViews.id]));
      this.childData[props[trackChildViews.id]] = props;
    }

    currentTime() {
      return window.performance.now();
    }

    makeDateFromElapsedTime(time) {
      return new Date(window.performance.timing.navigationStart + time);
    }
  };
