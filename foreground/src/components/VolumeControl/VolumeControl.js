import React from "react";

require("./volume-control.css");

class VolumeControl extends React.Component {
  constructor(props) {
    super(props);

    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);
  }

  onVolumeChange(event) {
    var volume = event.target.value;
    this.props.actions.setVolume(volume);
  }

  onMuteClick(event) {
    // pass for now
  }

  render() {
    var currentVolume = parseInt(this.props.currentVolume);
    var volumeClass = classNames({
      "fa fa-fw volume-btn": true,
      "fa-volume-up": currentVolume > 50,
      "fa-volume-down": currentVolume > 0 && currentVolume < 50,
      "fa-volume-off": currentVolume === 0
    });

    // FIXME: change background color of the slider track
    // that is to the left of the current value
    return (
      <div className="volume-control">
        <i className={volumeClass}
          onClick={this.onMuteClick}
        ></i>
        <span className="volume-control-slider-container">
          <input className="volume-control-slider"
            type="range"
            defaultValue="100"
            min="0"
            max="100"
            step="1"
            onChange={this.onVolumeChange}
          />
        </span>
      </div>
    );
  }
}

export default VolumeControl;
