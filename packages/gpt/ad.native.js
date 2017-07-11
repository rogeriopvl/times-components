import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, WebView } from "react-native";
import { getSlotConfig } from "./generate-config";

const { width } = Dimensions.get("window");

class Ad extends Component {
  constructor(props) {
    super(props);
    this.config = getSlotConfig(props.section, props.code, width);
  }

  render() {
    const html = `
      <html>
        <head>
          <script>window.alert('hey')</script>
          <script src="http://localhost:5000/app.bundle.js"></script>
          <script>
            loadAds("d.thetimes.co.uk", "25436805", "${this.props.section}", "${this.config.code}")
          </script>
        </head>
        <body>
          <div id='${this.config.code}'>
          </div>
        </body>
      </html>
      `;

    return (
      <WebView source={{ html, baseUrl: "http://example.com" }} height={250} />
    );
  }
}

Ad.propTypes = {
  networkId: PropTypes.string,
  adUnit: PropTypes.string,
  code: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired
};

Ad.defaultProps = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk"
};

export default Ad;
