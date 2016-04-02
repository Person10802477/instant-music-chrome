import React from "react";

import ContextMenu from "../../ContextMenu/ContextMenu.js";

class SidebarPlaylistItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isContextMenuVisible: false
    };

    this.contextMenu = this.contextMenu.bind(this);
    this.onRemovePlaylist = this.onRemovePlaylist.bind(this);
  }

  contextMenu(event) {
    event.preventDefault();
    this.setState({isContextMenuVisible: true});
  }

  onRemovePlaylist(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.removePlaylist(this.props.playlist.playlistName);
    console.log("Remove Playlist");
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
        {this.state.isContextMenuVisible ? <ContextMenu menuItems={contextMenuItems} /> : null}
      </li>
    );
  }
}

export default SidebarPlaylistItem;
