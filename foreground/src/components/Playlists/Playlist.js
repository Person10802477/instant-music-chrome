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
    var playlistClass = classNames({
      "playlist-songs": true,
      "is-fetching": _.isEmpty(this.props.songs)
    });

    if (!_.isEmpty(this.props.songs)) {
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
    }

    return (
      <div className={playlistClass}>
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
        <div className="playlist-loading">
          Loading...
        </div>
      </div>
    );
  }
}

export default Playlist;
