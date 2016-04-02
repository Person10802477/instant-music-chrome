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
    // Only try to fetch if currentPlaylist was updated
    var isCurrentPlaylistUpdated = (this.props.currentPlaylist !== nextProps.currentPlaylist);
    if (isCurrentPlaylistUpdated) {
      this.props.actions.fetchPlaylistIfNeeded(nextProps.currentPlaylist);
    }
  }

  render() {
    var songs = this.props.currentPlaylist.songs || [];
    var savedSongs = this.props.localPlaylist.songs;
    var isLocal = this.props.currentPlaylist && this.props.currentPlaylist.source === "local";

    return (
      <div className="main-area">
        <Playlist
          updateCurrentSong={this.props.actions.updateCurrentSongAndPlayIt}
          songs={songs}
          isLocal={isLocal}
          currentSong={this.props.currentSong}
          localPlaylist={this.props.localPlaylist}
          videoSize={this.props.videoSize}
          addSongToPlaylist={this.props.actions.addSongToPlaylist}
          removeSongFromLocalPlaylistAndChrome={this.props.actions.removeSongFromLocalPlaylistAndChrome}
        />
      </div>
    );
  }
}

export default MainArea;
