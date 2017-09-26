import React, { Component } from "react";
import { findNodeHandle, requireNativeComponent, AppState } from "react-native";
import PropTypes from "prop-types";

import propTypes from "./brightcove-player.proptypes";
import defaults from "./brightcove-player.defaults";

const nativeClassName = "RNTBrightcove";
const RNTBrightcove = requireNativeComponent(nativeClassName, null);

class BrightcoveVideo extends Component {
  static getNativeBrightcoveComponent() {
    return RNTBrightcove;
  }

  static getNativeClassName() {
    return nativeClassName;
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      appState: AppState.currentState,
      isPlaying: false,
      isFinished: false,
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.onError = this.onError.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    this.publicMethods = {
      play: this.play.bind(this),
      pause: this.pause.bind(this)
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    if (AppState.removeEventListener) {
      AppState.removeEventListener("change", this.handleAppStateChange);
    }
  }

  onError(evt) {
    this.props.onError(evt.nativeEvent);
  }

  getNodeHandle() {
    return findNodeHandle(this.bcPlayer);
  }

  handleChange(evt) {
    const nextState = {
      isPlaying: evt.nativeEvent.isPlaying,
      duration: evt.nativeEvent.duration,
      progress: evt.nativeEvent.progress,
      isFinished: evt.nativeEvent.isFinished,
      isFullscreen: evt.nativeEvent.isFullscreen
    };

    const playingStatusChanged = this.state.isPlaying !== nextState.isPlaying;
    const fullscreenStatusChanged =
      this.state.isFullscreen !== nextState.isFullscreen;
    const willFinish =
      this.state.isFinished !== nextState.isFinished && nextState.isFinished;

    if (playingStatusChanged) {
      if (nextState.isPlaying) {
        this.props.onPlay();
      } else {
        this.props.onPause();
      }
    }

    if (fullscreenStatusChanged) {
      if (nextState.isFullscreen) {
        this.props.onEnterFullscreen();
      } else {
        this.props.onExitFullscreen();
      }
    }

    if (this.state.duration !== nextState.duration) {
      this.props.onDuration(nextState.duration);
    }

    if (this.state.progress !== nextState.progress) {
      this.props.onProgress(nextState.progress);
    }

    if (willFinish) {
      this.props.onFinish();
    }

    this.setState(nextState);
  }

  handleAppStateChange(nextAppState) {
    this.setState(prevState => {
      const nextState = { appState: nextAppState };

      if (prevState.appState !== nextAppState) {
        if (
          nextAppState === "active" &&
          prevState.wasPlayingBeforeAppBackgrounded
        ) {
          nextState.wasPlayingBeforeAppBackgrounded = false;
          this.play();
        } else if (prevState.isPlaying && nextAppState !== "active") {
          nextState.wasPlayingBeforeAppBackgrounded = true;
          this.pause();
        }
      }

      return nextState;
    });
  }

  play() {
    this.props.runNativeCommand("play", []);
  }

  pause() {
    this.props.runNativeCommand("pause", []);
  }

  render() {
    const NativeBrightcove = BrightcoveVideo.getNativeBrightcoveComponent();

    return (
      <NativeBrightcove
        ref={ref => {
          this.bcPlayer = ref;
        }}
        style={{ height: this.props.height, width: this.props.width }}
        policyKey={this.props.policyKey}
        accountId={this.props.accountId}
        videoId={this.props.videoId}
        autoplay={this.props.autoplay}
        hideFullScreenButton={this.props.hideFullScreenButton}
        onChange={this.handleChange}
        onLoadingError={this.onError} // android handler seems to be reserved on iOS
        onIOSError={this.onError} // so we use this instead
      />
    );
  }
}

BrightcoveVideo.defaultProps = Object.assign(
  { runNativeCommand: () => {} },
  defaults
);
BrightcoveVideo.propTypes = Object.assign(
  { runNativeCommand: PropTypes.func.isRequired },
  propTypes
);

export default BrightcoveVideo;
