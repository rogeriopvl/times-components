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

    currentTime() {
      return new Date().getTime();
    }

    onViewed(data) {
      const id = data[trackChildViews.id];

      if (this.viewed.has(id)) {
        return;
      }

      this.viewed.add(id);

      this.onChildView(id, data, new Date().getTime());
    }

    render() {
      return super.render({ onViewed: this.onViewed.bind(this) });
    }
  };
