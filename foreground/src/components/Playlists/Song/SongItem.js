import React from "react";

require("./song-item.css");

class SongItem extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveClickHandler = this.onSaveClickHandler.bind(this);
    this.onRemoveClickHandler = this.onRemoveClickHandler.bind(this);
  }

  onSaveClickHandler(event) {
    this.props.onSaveSong.call(this, this.props.song);
    event.stopPropagation();
    event.preventDefault();
  }

  onRemoveClickHandler(event) {
    this.props.onRemoveSong.call(this, this.props.song);
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { videoId, rank, title, artist } = this.props.song;
    const songClass = classNames({
      "song-item": true,
      "active": this.props.isCurrentSong,
      "is-saved": this.props.isSaved
    });

    return (
      <tr
        className={songClass}
        videoId={videoId}
        onClick={this.props.updateCurrentSong.bind(this, this.props.song)}
      >
        <td className="song-rank-cell">{rank}</td>
        <td className="song-title-cell truncate">{title}</td>
        <td className="song-artist-cell truncate">{artist}</td>
        <td className="song-not-saved text-center"
          onClick={this.onSaveClickHandler}
        ><i className="fa fa-heart-o fa-fw"></i></td>
        <td className="song-saved text-center"
          onClick={this.onRemoveClickHandler}
        ><i className="fa fa-heart fa-fw"></i></td>
        <td className="song-more-cell text-center"><i className="fa fa-share-alt fa-fw"></i></td>
      </tr>
    );
  }
}

export default SongItem;
