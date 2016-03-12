import React from "react";
import SongItem from "./Song/SongItem";

require("./playlist.css");

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // debugger
  }

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
      <div className="playlist-songs">
        <table className="table table-songs table-condensed">
          <thead>
            <tr>
              <th className="song-rank">RANK</th>
              <th className="song-title">SONG</th>
              <th className="song-artist">ARTIST</th>
              <th className="song-save">SAVE</th>
              <th className="song-share">SHARE</th>
            </tr>
          </thead>
          <tbody id="songitems">
            {songItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Playlist;
