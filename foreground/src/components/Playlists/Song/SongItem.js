import React from "react";
import ContextMenuContainer from "../../../containers/ContextMenuContainer/ContextMenuContainer.js";

require("./song-item.css");

class SongItem extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveClickHandler = this.onSaveClickHandler.bind(this);
    this.onRemoveClickHandler = this.onRemoveClickHandler.bind(this);
    this.onRemoveSong = this.onRemoveSong.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
  }

  onSaveClickHandler(event) {
    this.props.onSaveSong.call(this, this.props.song);
    event.stopPropagation();
    event.preventDefault();
  }

  // removes from "Saved" playlist
  onRemoveClickHandler(event) {
    this.props.onRemoveSong.call(this, this.props.song);
    event.stopPropagation();
    event.preventDefault();
  }

  // removes from current playlist
  onRemoveSong(event) {
    console.log(event)
  }

  contextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.showContextMenu(this.props.song.videoId, event);
  }

  render() {
    const { videoId, rank, title, artist } = this.props.song;
    const songClass = classNames({
      "song-item": true,
      "active": this.props.isCurrentSong,
      "is-saved": this.props.isSaved
    });
    var contextMenuItems = [
      {
        item: <span className="context-menu-item clearfix add-to-playlist-menu">
          Add to Playlist
          <i className="fa fa-caret-right fa-fw playlist-expand"></i></span>,
        action: null
      },
      {item: <span>Remove Song</span>, action: this.onRemoveSong},
    ];

    return (
      <tr
        className={songClass}
        videoId={videoId}
        onClick={this.props.updateCurrentSong.bind(this, this.props.song)}
        onContextMenu={this.contextMenu}
      >
        <td className="song-rank-cell">{rank}</td>
        <td className="song-title-cell truncate">
          {title}
          <ContextMenuContainer
            menuItems={contextMenuItems}
            id={videoId}
            localPlaylists={this.props.localPlaylists}
            addSongToPlaylist={this.props.addSongToPlaylist}
            song={this.props.song}
          />
        </td>
        <td className="song-artist-cell truncate">{artist}</td>
        <td className="song-not-saved text-center"
          onClick={this.onSaveClickHandler}
        ><i className="fa fa-heart-o fa-fw"></i></td>
        <td className="song-saved text-center"
          onClick={this.onRemoveClickHandler}
        ><i className="fa fa-heart fa-fw"></i></td>
        <td className="song-more-cell text-center"
          onClick={this.contextMenu}
        ><i className="fa fa-ellipsis-h fa-fw show-song-context-menu"></i></td>
      </tr>
    );
  }
}

export default SongItem;
