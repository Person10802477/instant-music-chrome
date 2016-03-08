import React from 'react';
import SearchItem from './SearchItem/SearchItem';

require('./search-bar.css');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputQuery: "",
      selectedIdx: 0 // FIXME: keyboard arrows to select item
    };

    this.onSearchInput = this.onSearchInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSearchInput(event) {
    var query = this.state.searchInputQuery;
    this.props.actions.fetchSearchResults(query);
    event.preventDefault();
  }

  onInputChange(event) {
    var q = event.target.value;
    if (q.length === 0) {
      this.props.actions.clearSearchResults();
    }

    this.setState({ searchInputQuery: q });
  }

  render() {
    var searchResults = [];
    var className = "search-bar";

    if (this.props.searchResults) {
      searchResults = this.props.searchResults.map((result, idx) =>
        <SearchItem
          key={idx}
          result={result}
          onSave={this.props.actions.addSongToPlaylist}
        />
      )

      if (searchResults.length > 0) {
        className = "search-bar active";  
      }
    }

    return (
      <div className={className}>
        <i className="fa fa-search search-icon fa-fw"></i>
        <form className="search-input-form"
          onSubmit={this.onSearchInput}
        >
          <input className="search-input form-control truncate"
            placeholder="ex) John Lennon Imagine"
            onChange={this.onInputChange}
             />
        </form>
        <i className="fa fa-times clear-icon fa-fw"></i>
        <div className="search-results">
          {searchResults}
        </div>
      </div>
    );
  }
}

export default SearchBar;
