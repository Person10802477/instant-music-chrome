import React from "react";

require("./song-item.css");

class SongItem extends React.Component {
  render() {
    const { videoId, rank, title, artist } = this.props.song;
    const className = (this.props.isCurrentSong ? "song-item active" : "song-item");

    return (
      <tr
        className={className}
        videoId={videoId}
        onClick={this.props.updateCurrentSong.bind(this, this.props.song)}
      >
        <td className="song-rank-cell">{rank}</td>
        <td className="song-title-cell truncate">{title}</td>
        <td className="song-artist-cell truncate">{artist}</td>
        <td className="song-save-cell text-center"><i className="fa fa-heart-o fa-fw"></i></td>
        <td className="song-more-cell text-center"><i className="fa fa-share-alt fa-fw"></i></td>
      </tr>
    );
  }
}

export default SongItem;
