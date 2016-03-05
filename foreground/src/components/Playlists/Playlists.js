import React from "react";

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this.makeSidebarPlaylists = this.makeSidebarPlaylists.bind(this);
  }

  componentWillMount() {
    this.props.actions.setupPlaylists();
    this.props.actions.updateCurrentPlaylist(null);
  }

  componentWillReceiveProps(nextProps) {
    console.log("playlists component: componentWillReceiveProps", nextProps);
    // this.props.actions.updateCurrentPlaylist(nextProps.currentPlaylist);
  }

  makeSidebarPlaylists(playlists, source) {
    return playlists[source].map(function(playlist, idx) {
      return (
        <li className="sidebar-playlist-item"
          url={playlist.url}
          key={idx}
          // onClick={this.props.loadPlaylist.bind(this, playlist)}
        >
          <a href='#'>{playlist.playlistName}</a>
        </li>
      );
    });
  }

  render() {
    var playlists = this.props.playlists;
    if (!playlists) {
      return (<div>Loading...</div>)
    }

    var melonPlaylists = this.makeSidebarPlaylists(playlists, 'melon');
    var itunesPlaylists = this.makeSidebarPlaylists(playlists, 'itunes');
    var localPlaylists = this.makeSidebarPlaylists(playlists, 'local');

    return (
      <div className="playlists">
        <div className="playlists__playlist-label">Playlists</div>

        <ul>
          <li>
            Melon
            <ul>
              {melonPlaylists}
            </ul>
          </li>

          <li>
            iTunes
            <ul>
              {itunesPlaylists}
            </ul>
          </li>

          <li>
            Local
            <ul>
              {localPlaylists}
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
