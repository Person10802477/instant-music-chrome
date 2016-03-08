import React from "react";

require("./sidebar-playlists.css");

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.makeSidebarPlaylists = this.makeSidebarPlaylists.bind(this);
    this.isSamePlaylist = this.isSamePlaylist.bind(this);
  }

  componentWillMount() {
    this.props.actions.setupPlaylists();
    this.props.actions.updateCurrentPlaylist(null);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("received", nextProps);
  //   // this.props.actions.updateCurrentPlaylist(nextProps.currentPlaylist);
  // }

  isSamePlaylist(playlist1, playlist2) {
    return (
      playlist1.playlistName === playlist2.playlistName &&
      playlist1.url === playlist2.url
    );
  }

  makeSidebarPlaylists(playlists, source, currentPlaylist) {
    return playlists[source].map(function(playlist, idx) {
      var className = (this.isSamePlaylist(playlist, currentPlaylist) ?
        'sidebar-playlist-item active' : 'sidebar-playlist-item');

      return (
        <li className={className}
          url={playlist.url}
          key={idx}
          onClick={this.props.actions.updateCurrentPlaylist.bind(this, playlist)}
        >
          <i className="fa fa-music"></i> {playlist.playlistName}
        </li>
      );
    }, this);
  }

  render() {
    var playlists = this.props.playlists;
    if (!playlists) {
      return (<div>Loading...</div>)
    }

    var melonPlaylists = this.makeSidebarPlaylists(playlists, 'melon', this.props.currentPlaylist);
    var itunesPlaylists = this.makeSidebarPlaylists(playlists, 'itunes', this.props.currentPlaylist);
    var localPlaylists = this.makeSidebarPlaylists(playlists, 'local', this.props.currentPlaylist);

    return (
      <div className="playlists">
        <ul>
          <li>
            <div className="playlist-label">
              <i className="fa fa-fw fa-folder"></i> YOUR MUSIC
            </div>
            <ul className="chart-songs">
              {localPlaylists}
            </ul>
          </li>

          <li>
            <div className="playlist-label">
              <i className="fa fa-fw fa-folder-open"></i> MELON
            </div>
            <ul className="chart-songs">
              {melonPlaylists}
            </ul>
          </li>

          <li>
            <div className="playlist-label">
              <i className="fa fa-fw fa-folder"></i> ITUNES
            </div>
            <ul className="chart-songs">
              {itunesPlaylists}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Playlists;

/*
CurrentPlaylist:
Playlists:
  Melon:
    Melon/playlist1
    Melon/playlist2
  ITunes:
    ITUNES/playlist1
    ITUNES/playlist2
  Mine:
    MINE/Playlist1
    playlist2
    playlist3 ...
*/
