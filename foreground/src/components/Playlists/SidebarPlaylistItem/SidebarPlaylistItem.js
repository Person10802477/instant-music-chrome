import React from "react";
import ContextMenuContainer from "../../../containers/ContextMenuContainer/ContextMenuContainer.js";
import SongNotificationsContainer from '../../../containers/SongNotificationsContainer/SongNotificationsContainer';

class SidebarPlaylistItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.showContextMenu = this.showContextMenu.bind(this);
    this.onRemovePlaylist = this.onRemovePlaylist.bind(this);
  }

  showContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    // FIXME: showContextMenu requires a unique ID globally,
    // but not sure what can work as a unique global Id other than
    // the playlistName. Should I just use a global counter?
    this.props.showContextMenu(this.props.playlist.playlistName, event);
  }

  onRemovePlaylist(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removePlaylist(this.props.playlist.playlistName);
    this.props.hideContextMenu();
  }

  onClickHandler(event) {
    event.stopPropagation();
    this.props.onClickHandler(this.props.playlist);

    // FIXME: not just here, but clicking anywhere outside
    // the target should call hideContextMenu();
    this.props.hideContextMenu();
  }

  render() {
    const {playlistName, url} = this.props.playlist;
    var itemClass = classNames({
      "sidebar-playlist-item": true,
      "active": this.props.isActive
    });
    var contextMenuItems = [
      {item: <span>Remove Playlist</span>, action: this.onRemovePlaylist},
    ];
    var songNoti = this.props.playlist.source === "local" ?
      <SongNotificationsContainer playlistName={this.props.playlist.playlistName} /> : null;
    var contextMenu = this.props.playlist.source === "local" ?
      <ContextMenuContainer menuItems={contextMenuItems} id={playlistName} /> : null;

    return (
      <li className={itemClass}
        url={url}
        key={this.props.key}
        onClick={this.onClickHandler}
        onContextMenu={this.showContextMenu}
      >
        <i className="fa fa-music fa-fw"></i> {playlistName}
        {songNoti}
        {contextMenu}
      </li>
    );
  }
}

export default SidebarPlaylistItem;
