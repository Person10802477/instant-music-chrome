import React from "react";

require("./song-notifications.css");

class SongNotifications extends React.Component {
  render() {
    var numSongNotifications = this.props.numSongNotifications;
    var notiClass = classNames({
      "song-notifications": true,
      "hidden": (this.props.isHidden || numSongNotifications === 0)
    });

    return (
      <div className={notiClass}>
        {numSongNotifications}
      </div>
    );
  }
}

export default SongNotifications;
