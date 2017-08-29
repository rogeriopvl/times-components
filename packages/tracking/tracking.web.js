import _get from "lodash.get";
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

    currentTime() {
      return window.performance.now();
    }

    makeDateFromElapsedTime(time) {
      return new Date(window.performance.timing.navigationStart + time);
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

        this.onChildView(
          target.id,
          this.childData[target.id],
          this.makeDateFromElapsedTime(time)
        );
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

    componentDidMount(...args) {
      super.componentDidMount(...args);

      this.observeChildren();
    }

    componentDidUpdate(...args) {
      super.componentDidUpdate(...args);

      this.observeChildren();
    }
  };
