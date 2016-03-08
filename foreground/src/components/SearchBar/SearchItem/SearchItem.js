import React from 'react';

require('./search-item.css');

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, description, thumbnail, videoId} = this.props.result;

    return (
      <div className="search-result-item truncate"
        onClick={this.props.onSave.bind(this, this.props.result)}
      >
        <div className="result-thumbnail">
          <img src={thumbnail} />
        </div>
        <div className="result-title">
          {title}
        </div>
        <div className="result-artist">
          {description}
        </div>
      </div>
    );
  }
}

export default SearchItem;
