import React from "react";
import ContextMenuContainer from "../../../containers/ContextMenuContainer/ContextMenuContainer.js";

class SidebarPlaylistItem extends React.Component {
  constructor(props) {
    super(props);

    this.contextMenu = this.contextMenu.bind(this);
    this.onRemovePlaylist = this.onRemovePlaylist.bind(this);
  }

  contextMenu(event) {
    event.preventDefault();

    // FIXME: not sure how to handle contextMenus globally...
    // this.setState({isContextMenuVisible: true});
  }

  onRemovePlaylist(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removePlaylist(this.props.playlist.playlistName);
    // this.setState({isContextMenuVisible: false});
  }

  render() {
    const {playlistName, url} = this.props.playlist;
    var itemClass = classNames({
      "sidebar-playlist-item": true,
      "active": this.props.isActive
    });
    var contextMenuItems = [
      {label: "Remove playlist", action: this.onRemovePlaylist},
      {label: "Add playlist", action: (function(event) { console.log( "add pl")})},
    ];

    return (
      <li className={itemClass}
        url={url}
        key={this.props.key}
        onClick={this.props.onClickHandler.bind(this, this.props.playlist)}
        onContextMenu={this.contextMenu}
      >
        <i className="fa fa-music fa-fw"></i> {playlistName}
        <ContextMenuContainer menuItems={contextMenuItems} />
      </li>
    );
  }
}

export default SidebarPlaylistItem;
