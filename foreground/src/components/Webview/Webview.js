import React from "react";
import ReactDOM from "react-dom";
import SandboxMessenger from "../../others/SandboxMessenger"

require('./webview.css');

var resizeWebview = function(webview) {
  webview.style.width = "300px";
  webview.style.height = "200px";
}

// Attach the necessary headers to play YouTube videos in a Chrome App
var setHttpReferer = function(webview) {
  if (!chrome.runtime.id) {
    console.log("Failed to set HTTP referer because chrome runtime id dne");
    return false;
  }

  var filter = {
    urls: ['*://*.youtube.com/embed/*' + chrome.runtime.id]
  };
  var optParam = ['blocking', 'requestHeaders'];

  webview.request.onBeforeSendHeaders.addListener(function (req) {
    var customurl = req.url.substring(0, req.url.indexOf('/embed/'));
    var customRefererObject = { name: 'Referer', value: customurl };

    $.grep(req.requestHeaders, function (headers) {
      if (headers.name === 'Referer') {
        headers.value = customurl;
      }
    });
    
    req.requestHeaders.push(customRefererObject);

    return { requestHeaders: req.requestHeaders };

  }, filter, optParam);
}

class Webview extends React.Component {
  constructor(props) {
    super(props);

    this.onSetVideoSize = this.onSetVideoSize.bind(this);
  }

  componentDidMount() {
    // Note: I needed to add 'is' hack to make a non-standard attribute 'partition'
    // attached to the DOM element of webview
    // https://github.com/facebook/react/issues/140
    var webview = ReactDOM.findDOMNode(this.refs.Webview);
    window.IM = window.IM || {};
    window.IM.sandboxMessenger = new SandboxMessenger(IM.store, webview);
    resizeWebview(webview);
    setHttpReferer(webview);
  }

  // videoMode = [small, big, full]
  onSetVideoSize(videoMode) {
    switch (videoMode) {
      case "big":
        this.props.actions.setVideoSize(854, 480);
        break;
      case "full":
        this.props.actions.setVideoSize(window.screen.width, window.screen.height);
        break;
      case "small":
      default:
        this.props.actions.setVideoSize(300, 200);
        break;
    }
  }

  render() {
    var webviewContainerClass = classNames({
      'webview-container': true,
      'small-video': this.props.videoSize.height === 200,
      'big-video': this.props.videoSize.height === 480,
      'full-video': this.props.videoSize.height > 480,
    });
    var webviewClass = classNames({
      'hidden': !this.props.isWebviewReady
    });
    var smallIconClass = classNames({
      'fa fa-compress fa-fw video-size-icon small': true,
      'hidden': this.props.videoSize.height === 200
    });
    var bigIconClass = classNames({
      'fa fa-expand fa-fw video-size-icon big': true,
      'hidden': this.props.videoSize.height >= 480
    });
    var fullIconClass = classNames({
      'fa fa-arrows-alt fa-fw video-size-icon full': true,
      'hidden': this.props.videoSize.height > 480
    });
    var videoSizeBtnsClass = classNames({
      'video-size-btns': true,
      'video-big': this.props.videoSize.height === 480,
      'video-full': this.props.videoSize.height > 480,
      'hidden': !this.props.isWebviewReady
    });
    var loadingClass = classNames({
      'loading-placeholder': true,
      'hidden': this.props.isWebviewReady
    });

    return (
      <div className={webviewContainerClass}>
        <div className={loadingClass}>
          <div className="loading-msg">
            <p>"You can't overdose on Instant Music"</p>
            <p><small>- H.S.</small></p>
          </div>
        </div>

        <webview is id="youtube-webview"
          class={webviewClass}
          ref="Webview" src="sandbox/sandbox.html"
          partition="static">
        </webview>

        <div className={videoSizeBtnsClass}>
          <i className={smallIconClass}
            onClick={this.onSetVideoSize.bind(this, "small")}
          ></i>
          <i className={bigIconClass}
            onClick={this.onSetVideoSize.bind(this, "big")}
          ></i>
          <i className={fullIconClass}
            onClick={this.onSetVideoSize.bind(this, "full")}
          ></i>
        </div>
      </div>
    );
  }
}

export default Webview;
