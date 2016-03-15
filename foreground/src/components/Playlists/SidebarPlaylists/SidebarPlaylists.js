import React from "react";

require("./sidebar-playlists.css");

import SongNotificationsContainer from '../../../containers/SongNotificationsContainer/SongNotificationsContainer';

class SidebarPlaylists extends React.Component {
  constructor(props) {
    super(props);

    this.getLabel = this.getLabel.bind(this);
  }

  // FIXME: replace with constants
  getLabel(source) {
    switch (source) {
      case "local":
        return "YOUR MUSIC";
      case "melon":
        return "MELON";
      case "itunes":
        return "ITUNES";
      default:
        return "";
    }
  }

  render() {
    var parentClass = classNames({
      'sidebar-playlist': true,
      'expanded': this.props.isExpanded
    });
    var folderIconClass = classNames({
      'fa': true,
      'fa-fw': true,
      'fa-folder': !this.props.isExpanded,
      'fa-folder-open': this.props.isExpanded
    });
    var label = this.getLabel(this.props.source);

    return (
      <li className={parentClass}
        onClick={this.props.onClickHandler.bind(this, this.props.source)}>
        <div className="playlist-label">
          <i className={folderIconClass}></i> {label}
          <SongNotificationsContainer isHidden={this.props.source !== 'local'} />
        </div>
        <ul className="chart-songs">
          {this.props.playlists}
        </ul>
      </li>
    );
  }
}

export default SidebarPlaylists;


