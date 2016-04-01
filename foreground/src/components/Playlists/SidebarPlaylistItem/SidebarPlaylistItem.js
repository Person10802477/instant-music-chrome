import React from "react";

class SidebarPlaylistItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {playlistName, url} = this.props.playlist;

    var itemClass = classNames({
      "sidebar-playlist-item": true,
      "active": this.props.isActive
    });

    return (
      <li className={itemClass}
        url={url}
        key={this.props.key}
        onClick={this.props.onClickHandler.bind(this, this.props.playlist)}
      >
        <i className="fa fa-music fa-fw"></i> {playlistName}
      </li>
    );
  }
}

export default SidebarPlaylistItem;
