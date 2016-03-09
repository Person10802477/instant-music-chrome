import React from 'react';

require('./search-item.css');

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, description, thumbnail, videoId} = this.props.result;
    var itemClass = classNames({
      "search-result-item": true,
      "truncate": true,
      "selected": this.props.isSelected
    });

    return (
      <div className={itemClass}
        onClick={this.props.onSave.bind(this, this.props.result)}
      >
        <div className="result-thumbnail">
          <img src={thumbnail} />
        </div>
        <div className="result-title truncate">
          {title}
        </div>
        <div className="result-description truncate">
          {description}
        </div>
      </div>
    );
  }
}

export default SearchItem;
