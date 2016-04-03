import React from "react";
import Playlist from "../Playlists/Playlist";

require("./main-area.css");

class MainArea extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchPlaylistIfNeeded(this.props.currentPlaylist);

    $(document).click(function(e) {
      this.props.actions.hideContextMenu();
    }.bind(this));
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
    var isLocal = this.props.currentPlaylist && this.props.currentPlaylist.source === "local";

    return (
      <div className="main-area">
        <Playlist
          updateCurrentSong={this.props.actions.updateCurrentSongAndPlayIt}
          songs={songs}
          isLocal={isLocal}
          currentSong={this.props.currentSong}
          localPlaylists={this.props.localPlaylists}
          localSavePlaylist={this.props.localPlaylists[0]}
          videoSize={this.props.videoSize}
          addSongToPlaylist={this.props.actions.addSongToPlaylist}
          removeSongFromLocalPlaylistAndChrome={this.props.actions.removeSongFromLocalPlaylistAndChrome}
          showContextMenu={this.props.actions.showContextMenu}
          hideContextMenu={this.props.actions.hideContextMenu}
        />
      </div>
    );
  }
}

export default MainArea;
