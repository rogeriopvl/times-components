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
    }

    observeChild(props) {

    }

    currentTime() {

    }

    makeDateFromElapsedTime() {

    }
  };
