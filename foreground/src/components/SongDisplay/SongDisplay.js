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

    var titleClass = classNames({
      "song-title truncate": true,
      "extra-margin-top": !artist
    });

    return (
      <div className="song-display">
        <div className={titleClass}>
          {title}
        </div>
        <div className="song-artist truncate">
          {artist}
        </div>
      </div>
    );
  }
}

export default SongDisplay;
