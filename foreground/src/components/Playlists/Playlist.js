import React from "react";
import SongItem from "./Song/SongItem";

require("./playlist.css");

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.makeSongItems = this.makeSongItems.bind(this);
    this.onSaveSongHandler = this.onSaveSongHandler.bind(this);
    this.onRemoveSongFromSavedPlaylist = this.onRemoveSongFromSavedPlaylist.bind(this);
  }

  onSaveSongHandler(song) {
    this.props.addSongToPlaylist(this.props.localPlaylists[0], song);
  }

  onRemoveSongFromSavedPlaylist(song) {
    this.props.removeSongFromPlaylist(this.props.localPlaylists[0], song);
  }

  makeSongItems(songs, savedSongs, currentVideoId) {
    return (
      songs.map((song) =>
        <SongItem
          song={song}
          key={song.videoId}
          currentPlaylist={this.props.currentPlaylist}
          updateCurrentSong={this.props.updateCurrentSong}
          isCurrentSong={song.videoId === currentVideoId}
          isSaved={!!(_.find(savedSongs, (s) => s.videoId === song.videoId))}
          onSaveSong={this.onSaveSongHandler}
          onRemoveSongFromSavedPlaylist={this.onRemoveSongFromSavedPlaylist}
          showContextMenu={this.props.showContextMenu}
          hideContextMenu={this.props.hideContextMenu}
          localPlaylists={this.props.localPlaylists}
          addSongToPlaylist={this.props.addSongToPlaylist}
          removeSongFromPlaylist={this.props.removeSongFromPlaylist}
        />
      )
    )
  }

  render() {
    var songs = this.props.currentPlaylist.songs;
    var songItems;

    // HOWON: NOTE: this relies on the fact that in PlaylistReducer
    // I always reorder the playlists so that "saved" playlist is the first playlist
    // seems error-prone -- should change the way it's implemented later
    var localSavePlaylist = this.props.localPlaylists[0];

    var savedSongs = localSavePlaylist ? localSavePlaylist.songs : [];
    var currentVideoId = (this.props.currentSong ? this.props.currentSong.videoId : '')
    var isLocal = this.props.isLocal;
    var playlistClass = classNames({
      "playlist-songs": true,
      // THIS IS A HACK! I BETTER CHECK isFetching
      "is-fetching": (_.isEmpty(songs) && !isLocal),
      "is-local": isLocal,
      'small-video': this.props.videoSize.height === 200,
      'big-video': this.props.videoSize.height === 480,
      'full-video': this.props.videoSize.height > 480
    });
    var target = this.refs.playlistLoading;
    var spinner = new Spinner({
      lines: 10, // The number of lines to draw
      length: 0, // The length of each line
      width: 6, // The line thickness
      radius: 30, // The radius of the inner circle
      scale: 1.5  , // Scales overall size of the spinner
      color: '#fff', // #rgb or #rrggbb or array of colors
      speed: 1.3, // Rounds per second
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      position: 'absolute', // Element positioning
    }).spin(target);

    var rankLabel, songLabel, artistLabel, saveLabel;

    if (chrome.runtime.id) {
      rankLabel = chrome.i18n.getMessage("rank");
      songLabel = chrome.i18n.getMessage("song");
      artistLabel = chrome.i18n.getMessage("artist");
      saveLabel =  chrome.i18n.getMessage("save");
    } else {
      rankLabel = "RANK";
      songLabel = "SONG";
      artistLabel = "ARTIST";
      saveLabel = "SAVE";
    }

    // HOWON FIXME: if empty, show "No song is available in this playlist"
    if (!_.isEmpty(songs)) {
      songItems = this.makeSongItems(songs, savedSongs, currentVideoId);
    }

    return (
      <div className={playlistClass}>
        <table className="table table-songs table-condensed">
          <thead>
            <tr>
              <th className="song-rank">{rankLabel}</th>
              <th className="song-title">{songLabel}</th>
              <th className="song-artist">{artistLabel}</th>
              <th className="song-save text-center"></th>
              <th className="song-more text-center"></th>
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
