import React from "react";

require("./song-item.css");

class SongItem extends React.Component {
  render() {
    const { videoId, rank, title, artist } = this.props.song;
    const className = (this.props.isCurrentSong ? "song-item active" : "song-item");

    return (
      <div
        className={className}
        videoId={videoId}
        onClick={this.props.updateCurrentSong.bind(this, this.props.song)}
      >
        {rank} - {title} - {artist}
      </div>
    );
  }
}

export default SongItem;
