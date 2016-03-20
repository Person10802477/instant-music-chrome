import React from "react";

class Webview extends React.Component {
  constructor(props) {
    super(props);
  }

  didComponentMount() {
    debugger;

    window.app = window.app || {};
    var webview = this.refs.youtubeWebview;
    app.sandboxMessenger = new SandboxMessenger(this.props.state, this.props.dispatch, webview);
  }

  render() {
    return (
      <div id="webview-container">
        <div class="loading-placeholder">
          <div class="loading-msg">
            <p>"You can't overdose on Instant Music"</p>
            <p><small>- H.S.</small></p>
          </div>
        </div>
        <webview id="youtube-webview" ref="youtubeWebview" src="sandbox/sandbox.html" partition="static"></webview>
      </div>
    );
  }
}

export default Webview;
