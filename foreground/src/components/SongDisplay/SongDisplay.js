import React from "react";

require("./song-display.css");

class SongDisplay extends React.Component {
  render() {
    var title, artist;
    if (this.props.currentSong) {
      title = this.props.currentSong.title;
      artist = this.props.currentSong.artist;
    } else {
      title = "";
      artist = "";
    }

    return (
      <div className="song-display">
        <div className="song-title">
          {title}
        </div>
        <div className="song-artist">
          {artist}
        </div>
      </div>
    );
  }
}

export default SongDisplay;
