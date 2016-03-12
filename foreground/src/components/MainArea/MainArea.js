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

    return (
      <div className="main-area">
        <Playlist
          updateCurrentSong={this.props.actions.updateCurrentSongAndPlayIt}
          songs={songs}
          currentSong={this.props.currentSong}
          localPlaylist={this.props.localPlaylist}
          addSongToLocalPlaylistAndChrome={this.props.actions.addSongToLocalPlaylistAndChrome}
          removeSongFromLocalPlaylistAndChrome={this.props.actions.removeSongFromLocalPlaylistAndChrome}
        />
      </div>
    );
  }
}

export default MainArea;
