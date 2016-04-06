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
    if (this.props.currentPlaylist !== nextProps.currentPlaylist) {
      this.props.actions.fetchPlaylistIfNeeded(nextProps.currentPlaylist);
    }
  }

  render() {
    var songs = this.props.currentPlaylist.songs || [];
    var isLocal = this.props.currentPlaylist && this.props.currentPlaylist.source === "local";

    return (
      <div className="main-area">
        <Playlist
          updateCurrentSong={this.props.actions.updateCurrentSongAndPlayIt}
          currentPlaylist={this.props.currentPlaylist}
          isLocal={isLocal}
          currentSong={this.props.currentSong}
          localPlaylists={this.props.localPlaylists}
          videoSize={this.props.videoSize}
          addSongToPlaylist={this.props.actions.addSongToPlaylist}
          removeSongFromPlaylist={this.props.actions.removeSongFromPlaylist}
          showContextMenu={this.props.actions.showContextMenu}
          hideContextMenu={this.props.actions.hideContextMenu}
        />
      </div>
    );
  }
}

export default MainArea;
