import React from "react";
import SidebarPlaylists from "./SidebarPlaylists/SidebarPlaylists";
import SidebarPlaylistItem from "./SidebarPlaylistItem/SidebarPlaylistItem";

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    // Playlists that are expanded in sidebar
    this.state = {
      expandedPlaylists: {
        melon: false,
        itunes: false,
        local: false,
        spotify: false
      }
    };

    this.makePlaylists = this.makePlaylists.bind(this);
    this.isSamePlaylist = this.isSamePlaylist.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onUpdateCurrentPlaylist = this.onUpdateCurrentPlaylist.bind(this);
  }

  componentWillMount() {
    this.props.actions.setupPlaylists();
    this.props.actions.loadUserPlaylists();
    this.props.actions.updateCurrentPlaylist(null);
  }

  componentWillReceiveProps(props) {
    var songNotifications = props.songNotifications;
    var wasSongAdded = false;
    for (var pl in songNotifications) {
      if (songNotifications[pl] > 0) {
        wasSongAdded = true;
      }
    }

    if (wasSongAdded) {
      this.setState({expandedPlaylists: Object.assign({},
        this.state.expandedPlaylists, { local: true }
      )});
    }
  }

  isSamePlaylist(playlist1, playlist2) {
    return (
      playlist1.playlistName === playlist2.playlistName &&
      playlist1.url === playlist2.url
    );
  }

  onClickHandler(source, event) {
    var expandedPlaylists = Object.assign({}, this.state.expandedPlaylists);
    expandedPlaylists[source] = !expandedPlaylists[source];
    this.setState({ expandedPlaylists: expandedPlaylists });
  }

  onUpdateCurrentPlaylist(playlist, event) {
    this.props.actions.updateCurrentPlaylist(playlist);
  }

  makePlaylists(playlists, source, currentPlaylist) {
    return playlists[source].map(function(playlist, idx) {
      return (
        <SidebarPlaylistItem key={idx}
          onClickHandler={this.onUpdateCurrentPlaylist}
          playlist={playlist}
          isActive={currentPlaylist.url === playlist.url && currentPlaylist.playlistName === playlist.playlistName}
          removePlaylist={this.props.actions.removePlaylist}
          showContextMenu={this.props.actions.showContextMenu}
          hideContextMenu={this.props.actions.hideContextMenu}
        />
      );
    }, this);
  }

  render() {
    var playlists = this.props.playlists;
    if (!playlists) {
      return (<div>Loading...</div>)
    }

    var melonPlaylists = this.makePlaylists(playlists, 'melon', this.props.currentPlaylist);
    var itunesPlaylists = this.makePlaylists(playlists, 'itunes', this.props.currentPlaylist);
    var spotifyPlaylists = this.makePlaylists(playlists, 'spotify', this.props.currentPlaylist);
    var localPlaylists = this.makePlaylists(playlists, 'local', this.props.currentPlaylist);

    // Reorder charts based on user locale
    if (chrome.runtime.id && (chrome.i18n.getMessage("@@ui_locale") === "ko" || chrome.i18n.getMessage("@@ui_locale") === "ko-kr")) {
      return (
        <div className="playlists">
          <ul>
            <SidebarPlaylists
              source="local"
              playlists={localPlaylists}
              onClickHandler={this.onClickHandler}
              isExpanded={this.state.expandedPlaylists["local"]}
              addPlaylist={this.props.actions.addPlaylist}
            />
            <SidebarPlaylists
              source="melon"
              playlists={melonPlaylists}
              onClickHandler={this.onClickHandler}
              isExpanded={this.state.expandedPlaylists["melon"]}
            />
            <SidebarPlaylists
              source="spotify"
              playlists={spotifyPlaylists}
              onClickHandler={this.onClickHandler}
              isExpanded={this.state.expandedPlaylists["spotify"]}
            />
            <SidebarPlaylists
              source="itunes"
              playlists={itunesPlaylists}
              onClickHandler={this.onClickHandler}
              isExpanded={this.state.expandedPlaylists["itunes"]}
            />
          </ul>
        </div>
      );
    }

    return (
      <div className="playlists">
        <ul className="playlist-folders">
          <SidebarPlaylists
            source="local"
            playlists={localPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["local"]}
            addPlaylist={this.props.actions.addPlaylist}
            loadUserPlaylists={this.props.actions.loadUserPlaylists}
          />
          <SidebarPlaylists
            source="spotify"
            playlists={spotifyPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["spotify"]}
          />
          <SidebarPlaylists
            source="itunes"
            playlists={itunesPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["itunes"]}
          />
          <SidebarPlaylists
            source="melon"
            playlists={melonPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["melon"]}
          />
        </ul>
      </div>
    );
  }
}

export default Playlists;
