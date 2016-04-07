import React from "react";

require("./song-notifications.css");

class SongNotifications extends React.Component {
  render() {
    var songNotifications = this.props.songNotifications;
    var numNotis = songNotifications[this.props.playlistName]
    var notiClass = classNames({
      "song-notifications": true,
      "hidden": !(numNotis && numNotis > 0)
    });

    return (
      <div className={notiClass}>
        {songNotifications[this.props.playlistName]}
      </div>
    );
  }
}

export default SongNotifications;
