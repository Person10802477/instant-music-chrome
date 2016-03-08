import React from "react";
import Playlist from "../Playlists/Playlist";

require("./main-area.css");

class MainArea extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchPlaylistIfNeeded(this.props.currentPlaylist);
  }

  componentWillReceiveProps(nextProps) {
    this.props.actions.fetchPlaylistIfNeeded(nextProps.currentPlaylist);  
  }

  render() {
    var songs = this.props.currentPlaylist.songs || [];

    return (
      <div className="main-area">
        <Playlist
          updateCurrentSong={this.props.actions.updateCurrentSongAndPlayIt}
          songs={songs}
          currentSong={this.props.currentSong}
        />
      </div>
    );
  }
}

export default MainArea;

// updateCurrentSong={this.props.actions.updateCurrentSong}