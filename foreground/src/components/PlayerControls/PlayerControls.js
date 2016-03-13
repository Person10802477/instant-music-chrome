import React from "react";

require("./player-controls.css");

class PlayerControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var playClass = classNames({
      "fa fa-play fa-fw": true,
      "hidden": this.props.isPlaying,
      "control-center-icon": true
    });

    var pauseClass = classNames({
      "fa fa-pause fa-fw": true,
      "hidden": !this.props.isPlaying,
      "control-center-icon": true
    });

    return (
      <div className="player-controls">
        <i className="fa fa-step-backward fa-fw"
          onClick={this.props.actions.playPrevSong}
        ></i>
        <i className={playClass}
          onClick={this.props.actions.togglePlayPause}
        ></i>
        <i className={pauseClass}
          onClick={this.props.actions.togglePlayPause}
        ></i>
        <i className="fa fa-step-forward fa-fw"
          onClick={this.props.actions.playNextSong}
        ></i>
      </div>
    );
  }
}

export default PlayerControls;
