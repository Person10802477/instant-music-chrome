import React from "react";
import SongItem from "./Song/SongItem";

require("./playlist.css");

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }

  // FIXME: how do I make it re-render everytime currentSong is updated?
  render() {
    var songItems;
    var currentVideoId = (this.props.currentSong ? this.props.currentSong.videoId : '')

    if (this.props.songs) {
      songItems = (
        this.props.songs.map((song) =>
          <SongItem
            song={song}
            key={song.videoId}
            updateCurrentSong={this.props.updateCurrentSong}

            // FIXME: what if the user adds two identical songs to playlist?
            isCurrentSong={song.videoId === currentVideoId}
          />
        )
      )
    } else {
      songItems = <div>Loading...</div>
    }

    return (
      <div className="songs">
        {songItems}
      </div>
    );
  }
}

export default Playlist;
