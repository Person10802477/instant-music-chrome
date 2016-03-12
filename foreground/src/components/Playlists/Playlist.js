import React from "react";
import SongItem from "./Song/SongItem";

require("./playlist.css");

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.makeSongItems = this.makeSongItems.bind(this);
    this.onSaveSongHandler = this.onSaveSongHandler.bind(this);
  }

  onSaveSongHandler(song) {
    this.props.addSongToLocalPlaylistAndChrome(this.props.localPlaylist, song);
  }

  makeSongItems(songs, savedSongs, currentVideoId) {
    return (
      songs.map((song) =>
        <SongItem
          song={song}
          key={song.videoId}
          updateCurrentSong={this.props.updateCurrentSong}
          isCurrentSong={song.videoId === currentVideoId}
          isSaved={!!(_.find(savedSongs, (s) => s.videoId === song.videoId))}
          onSaveSong={this.onSaveSongHandler}
        />
      )
    )
  }

  render() {
    var songItems;
    var savedSongs = this.props.localPlaylist.songs;
    var currentVideoId = (this.props.currentSong ? this.props.currentSong.videoId : '')
    var playlistClass = classNames({
      "playlist-songs": true,
      "is-fetching": _.isEmpty(this.props.songs)
    });

    if (!_.isEmpty(this.props.songs)) {
      songItems = this.makeSongItems(this.props.songs, savedSongs, currentVideoId);
    }

    return (
      <div className={playlistClass}>
        <table className="table table-songs table-condensed">
          <thead>
            <tr>
              <th className="song-rank">RANK</th>
              <th className="song-title">SONG</th>
              <th className="song-artist">ARTIST</th>
              <th className="song-save text-center">SAVE</th>
              <th className="song-share text-center">SHARE</th>
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
