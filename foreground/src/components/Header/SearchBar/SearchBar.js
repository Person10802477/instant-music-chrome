import React from 'react';

require('./search-bar.css');

class SearchBar extends React.Component {
  render() { 
    return (
      <div className="search-bar">
        <i className="fa fa-search search-icon fa-fw"></i>
        <input className="search-input form-control truncate" placeholder="ex. John Lennon Imagine"
          autocomplete="off" spellcheck="false" autocorrect="off" tabindex="1" />
        <i className="fa fa-times clear-icon fa-fw"></i>
      </div>
    );
  }
}

export default SearchBar;
