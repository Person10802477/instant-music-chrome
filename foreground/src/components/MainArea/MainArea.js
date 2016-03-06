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

  // check if props are different
  // componentWillReceiveProps(nextProps) {
  //   debugger
  //   if (nextProps.currentPlaylist.playlistName !== this.props.currentPlaylist.playlistName) {
  //     this.props.actions.fetchPlaylistIfNeeded(nextProps.currentPlaylist);
  //   }
  // }

  render() {
    var songs = this.props.currentPlaylist.songs || [];

    return (
      <div className="main-area">
        <div>Main area</div>
        <Playlist
          updateCurrentSong={this.props.actions.updateCurrentSong}
          songs={songs}
        />
      </div>
    );
  }
}

export default MainArea;
