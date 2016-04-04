import React from "react";
import ContextMenuContainer from "../../../containers/ContextMenuContainer/ContextMenuContainer.js";

class SidebarPlaylistItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.onRemovePlaylist = this.onRemovePlaylist.bind(this);
  }

  contextMenu(event) {
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

    return (
      <li className={itemClass}
        url={url}
        key={this.props.key}
        onClick={this.onClickHandler}
        onContextMenu={this.contextMenu}
      >
        <i className="fa fa-music fa-fw"></i> {playlistName}
        <ContextMenuContainer menuItems={contextMenuItems} id={playlistName} />
      </li>
    );
  }
}

export default SidebarPlaylistItem;
