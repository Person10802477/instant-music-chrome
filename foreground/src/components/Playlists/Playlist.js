import React from "react";
import SongItem from "./Song/SongItem";

require("./playlist.css");

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.makeSongItems = this.makeSongItems.bind(this);
    this.onSaveSongHandler = this.onSaveSongHandler.bind(this);
    this.onRemoveSongHandler = this.onRemoveSongHandler.bind(this);
  }

  onSaveSongHandler(song) {
    this.props.addSongToLocalPlaylistAndChrome(this.props.localPlaylist, song);
  }

  onRemoveSongHandler(song) {
    this.props.removeSongFromLocalPlaylistAndChrome(this.props.localPlaylist, song);
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
          onRemoveSong={this.onRemoveSongHandler}
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
    var target = this.refs.playlistLoading;
    var spinner = new Spinner({
      lines: 10, // The number of lines to draw
      length: 0, // The length of each line
      width: 5, // The line thickness
      radius: 25, // The radius of the inner circle
      scale: 1.2  , // Scales overall size of the spinner
      color: '#fff', // #rgb or #rrggbb or array of colors
      speed: 2.0, // Rounds per second
      className: 'spinner', // The CSS class to assign to the spinner
      top: '40%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      position: 'absolute', // Element positioning
    }).spin(target);

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
        <div className="playlist-loading" ref="playlistLoading">
        </div>
      </div>
    );
  }
}

export default Playlist;
