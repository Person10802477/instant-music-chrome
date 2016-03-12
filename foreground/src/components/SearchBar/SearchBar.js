import React from 'react';
import SearchItem from './SearchItem/SearchItem';
import { PLAYLIST_DATA } from '../../containers/PlaylistContainer/constants';

require('./search-bar.css');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputQuery: "",
      selectedIdx: 0
    };

    this.onSearchInput = this.onSearchInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputClear = this.onInputClear.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onSaveHandler = this.onSaveHandler.bind(this);
  }

  onSearchInput(event) {
    var query = this.state.searchInputQuery;
    this.props.actions.fetchSearchResults(query);
    event.preventDefault();

    // clear the search input as soon as the data
    // are retrieved
    this.refs.searchInput.value = "";
  }

  onInputChange(event) {
    var q = event.target.value;
    if (q.length === 0) {
      this.props.actions.clearSearchResults();
    }

    this.setState({ searchInputQuery: q });
  }

  onInputClear() {
    this.refs.searchInput.value = "";
    this.setState({ searchInputQuery: "" });
    this.props.actions.clearSearchResults();
  }

  onKeyDownHandler(event) {
    if (this.props.searchResults.length === 0) {
      return false;
    }

    var currentIdx = this.state.selectedIdx;

    switch(event.keyCode) {
      case 38: // up arrow
        var idx = (currentIdx === 0) ? 0 : currentIdx-1;
        this.setState({selectedIdx: idx});
        return false;
      case 40: // down arrow
        var idx = (currentIdx === this.props.maxResults-1) ? this.props.maxResults-1 : currentIdx+1;
        this.setState({selectedIdx: idx});
        return false;
      case 13: // enter
        if (this.state.searchInputQuery.length === 0) {
          return false;
        }
        var selected = this.props.searchResults[currentIdx];
        this.onSaveHandler(selected);
        event.preventDefault();
        return false;
      case 27: // esc
        this.onInputClear();
        return false;
      default:
        return false;
    }
  }

  onSaveHandler(song) {
    // HOWON: ADD TO CHROME
    // this.props.actions.addSongToPlaylist(song);

    // FIXME: since we only have one playlist for now...
    this.props.actions.addSongToLocalPlaylistAndChrome(PLAYLIST_DATA.local[0], song);
    this.onInputClear();
  }

  render() {
    var searchResults = [];
    var searchBarClass;

    // FIXME: Handle the case where there's no search result
    if (this.props.searchResults) {
      searchResults = this.props.searchResults.map((result, idx) =>
        <SearchItem
          key={idx}
          result={result}
          onSave={this.onSaveHandler}
          isSelected={this.state.selectedIdx === idx}
        />
      )
    }

    searchBarClass = classNames({
      "search-bar": true,
      "active": (searchResults.length > 0)
    });

    return (

      <div className={searchBarClass}>
        <i className="fa fa-search search-icon fa-fw"></i>
        <form className="search-input-form"
          onSubmit={this.onSearchInput}
        >
          <input className="search-input form-control truncate"
            placeholder="ex) John Lennon Imagine"
            ref="searchInput"
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDownHandler}
          />
        </form>
        <i className="fa fa-times clear-icon fa-fw"
          onClick={this.onInputClear}
        ></i>
        <div className="search-results">
          {searchResults}
        </div>
      </div>
    );
  }
}

export default SearchBar;
