import React from "react";
import SidebarPlaylist from "./SidebarPlaylist/SidebarPlaylist";

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    // indices of playlists that are expanded in sidebar
    this.state = {
      expandedPlaylists: {
        melon: false,
        itunes: false,
        local: false
      }
    };

    this.makeSidebarPlaylists = this.makeSidebarPlaylists.bind(this);
    this.isSamePlaylist = this.isSamePlaylist.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onUpdateCurrentPlaylist = this.onUpdateCurrentPlaylist.bind(this);
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

  onClickHandler(source, event) {
    var expandedPlaylists = Object.assign({}, this.state.expandedPlaylists);
    expandedPlaylists[source] = !expandedPlaylists[source];
    this.setState({ expandedPlaylists: expandedPlaylists });
  }

  onUpdateCurrentPlaylist(playlist, event) {
    this.props.actions.updateCurrentPlaylist(playlist);
    event.stopPropagation();
  }

  makeSidebarPlaylists(playlists, source) {
    return playlists[source].map(function(playlist, idx) {
      return (
        <li className="sidebar-playlist-item"
          url={playlist.url}
          key={idx}
          onClick={this.onUpdateCurrentPlaylist.bind(this, playlist)}
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

    var melonPlaylists = this.makeSidebarPlaylists(playlists, 'melon');
    var itunesPlaylists = this.makeSidebarPlaylists(playlists, 'itunes');
    var localPlaylists = this.makeSidebarPlaylists(playlists, 'local');

    return (
      <div className="playlists">
        <ul>
          <SidebarPlaylist
            source="local"
            playlists={localPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["local"]}
          />
          <SidebarPlaylist
            source="melon"
            playlists={melonPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["melon"]}
          />
          <SidebarPlaylist
            source="itunes"
            playlists={itunesPlaylists}
            onClickHandler={this.onClickHandler}
            isExpanded={this.state.expandedPlaylists["itunes"]}
          />
        </ul>
      </div>
    );
  }
}

export default Playlists;
