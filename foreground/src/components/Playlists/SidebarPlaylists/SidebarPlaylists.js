import React from "react";

require("./sidebar-playlists.css");

class SidebarPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingPlaylist: false
    }

    this.getLabel = this.getLabel.bind(this);
    this.startAddingPlaylist = this.startAddingPlaylist.bind(this);
    this.endAddingPlaylist = this.endAddingPlaylist.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.onAddPlaylist = this.onAddPlaylist.bind(this);
    this.onSignInAndLoadUserPlaylists = this.onSignInAndLoadUserPlaylists.bind(this);
  }

  // FIXME: replace with constants
  getLabel(source) {
    switch (source) {
      case "local":
        return chrome.i18n.getMessage("local");
      case "melon":
        return chrome.i18n.getMessage("melon");
      case "itunes":
        return chrome.i18n.getMessage("itunes");
      case "spotify":
        return chrome.i18n.getMessage("spotify");
      default:
        return "";
    }
  }

  startAddingPlaylist(event) {
    event.stopPropagation();
    this.setState({isAddingPlaylist: true});
  }

  onSignInAndLoadUserPlaylists(event) {
    event.stopPropagation();
    debugger
    this.props.loadUserPlaylists(null, false);
  }

  endAddingPlaylist() {
    this.setState({isAddingPlaylist: false});
  }

  onAddPlaylist(event) {
    var playlistTitle = React.findDOMNode(this.refs.addInput).value;    
    event.stopPropagation();
    event.preventDefault();
    this.props.addPlaylist(playlistTitle);
    this.endAddingPlaylist();
  }

  onInputClick(event) {
    event.stopPropagation();
  }

  componentDidUpdate() {
    if (this.state.isAddingPlaylist) {
      var input = React.findDOMNode(this.refs.addInput);
      input.focus();
      input.select();
    }
  }

  render() {
    var parentClass = classNames({
      'sidebar-playlist': true,
      'expanded': this.props.isExpanded
    });
    var folderIconClass = classNames({
      'fa': true,
      'fa-fw': true,
      'fa-folder': !this.props.isExpanded,
      'fa-folder-open': this.props.isExpanded
    });
    var addPlaylistClass = classNames({
      'add-playlist': true,
      'sidebar-playlist-item': true,
      'hidden': this.props.source !== 'local' || _.isEmpty(this.props.playlists)
    });
    var addInputClass = classNames({
      'input-playlist-wrapper': true,
      'hidden': !this.state.isAddingPlaylist
    });
    var signInClass = classNames({
      'sidebar-playlist-item': true,
      'hidden': ((this.props.source !== 'local') || !_.isEmpty(this.props.playlists))
    });
    var label = this.getLabel(this.props.source);

    return (
      <li className={parentClass}
        onClick={this.props.onClickHandler.bind(this, this.props.source)}>
        <div className="playlist-label">
          <i className={folderIconClass}></i> <span className="folder-label">{label}</span>
        </div>
        <ul className="chart-songs">
          {this.props.playlists}

          <li className={addInputClass}>
            <i className="fa fa-music fa-fw"></i> 
            <form className="form-playlist" onSubmit={this.onAddPlaylist}>
              <input type="text" className="input-playlist"
                ref="addInput" defaultValue="New Playlist"
                onClick={this.onInputClick}
                onBlur={this.endAddingPlaylist}
              />
            </form>
          </li>

          <li className={addPlaylistClass} onClick={this.startAddingPlaylist}>
            <i className="fa fa-plus fa-fw"></i> Add Playlist
          </li>

          <li className={signInClass} onClick={this.onSignInAndLoadUserPlaylists}>
            {chrome.i18n.getMessage("sign_in_for_playlists")}
          </li>
        </ul>
      </li>
    );
  }
}

export default SidebarPlaylists;


