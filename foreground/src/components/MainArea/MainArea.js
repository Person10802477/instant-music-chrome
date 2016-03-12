import React from "react";
import Playlist from "../Playlists/Playlist";

require("./main-area.css");

class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.areSongsEqual = this.areSongsEqual.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchPlaylistIfNeeded(this.props.currentPlaylist);
  }


  areSongsEqual(songs1, songs2) {
    if (songs1.length !== songs2.length) {
      return false;
    }

    var isEqual = true;

    $.each(songs1, (song, idx) => {
      if (song.videoId !== songs2[idx].videoId) {
        isEqual = false;
        return false;
      }
    });

    return isEqual;
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