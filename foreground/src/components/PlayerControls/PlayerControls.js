import React from "react";

require("./player-controls.css");

class PlayerControls extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    // this.props.actions.fetchPlaylistIfNeeded(nextProps.currentPlaylist);  
  }

  render() {
    var playClass = classNames({
      "fa fa-play fa-fw": true,
      "hidden": this.props.isPlaying
    });

    var pauseClass = classNames({
      "fa fa-pause fa-fw": true,
      "hidden": !this.props.isPlaying
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