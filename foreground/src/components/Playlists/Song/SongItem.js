import React from "react";
import ContextMenuContainer from "../../../containers/ContextMenuContainer/ContextMenuContainer.js";

require("./song-item.css");

class SongItem extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveClickHandler = this.onSaveClickHandler.bind(this);
    this.onUnsaveClickHandler = this.onUnsaveClickHandler.bind(this);
    this.onRemoveSongHandler = this.onRemoveSongHandler.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
  }

  onSaveClickHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onSaveSong.call(this, this.props.song);
  }

  // removes from "Saved" playlist
  onUnsaveClickHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onRemoveSongFromSavedPlaylist.call(this, this.props.song);
  }

  onRemoveSongHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.removeSongFromPlaylist.call(this, this.props.currentPlaylist, this.props.song);
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
    const ADD_TO_PLAYLIST = (chrome.runtime.id ? chrome.i18n.getMessage("add_to_playlist") : "Add To Playlist");
    const REMOVE_SONG = (chrome.runtime.id ? chrome.i18n.getMessage("remove_song") : "Remove Song");
    var contextMenuItems = [
      {
        item: <span className="context-menu-item clearfix add-to-playlist-menu">
          {ADD_TO_PLAYLIST}
          <i className="fa fa-caret-right fa-fw playlist-expand"></i></span>,
        action: null
      },
      {item: <span>{REMOVE_SONG}</span>, action: this.onRemoveSongHandler},
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
            removeSongFromPlaylist={this.onRemoveSongHandler}
            song={this.props.song}
          />
        </td>
        <td className="song-artist-cell truncate">{artist}</td>
        <td className="song-not-saved text-center"
          onClick={this.onSaveClickHandler}
        ><i className="fa fa-heart-o fa-fw"></i></td>
        <td className="song-saved text-center"
          onClick={this.onUnsaveClickHandler}
        ><i className="fa fa-heart fa-fw"></i></td>
        <td className="song-more-cell text-center"
          onClick={this.contextMenu}
        ><i className="fa fa-ellipsis-h fa-fw show-song-context-menu"></i></td>
      </tr>
    );
  }
}

export default SongItem;
