import React from "react";

class Playlist extends React.Component {
  render() {
    var songItems;

    if (this.props.songs) {
      songItems = (
        this.props.songs.map((song) =>
          <div
            className="song-item"
            videoId={song.videoId}
            key={song.videoId}
          >{song.rank} - {song.title} - {song.artist}</div>
        )
      )
    } else {
      songItems = <div>Loading...</div>
    }

    return (
      <div className="songs">
        {songItems}
      </div>
    );
  }
}

export default Playlist;
