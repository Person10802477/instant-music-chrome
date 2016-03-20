import React from 'react';
import VolumeControlContainer from '../../containers/VolumeControlContainer/VolumeControlContainer';

require("./aux-controls.css");

class AuxControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var shuffleClass = classNames({
      "fa fa-fw fa-random toggle-shuffle-btn": true,
      "active": this.props.isShuffle
    });

    var repeatClass = classNames({
      "fa fa-fw fa-repeat toggle-repeat-btn": true,
      "active": this.props.isRepeat,
      "fa-spin": this.props.isRepeat,
    });

    return (
      <div className='aux-controls clearfix'>
        <div className="aux-controls-inner-wrapper">
          <i className={shuffleClass}
            onClick={this.props.actions.toggleShuffle}
          ></i>
          <i className={repeatClass}
            onClick={this.props.actions.toggleRepeat}
          ></i>
          <VolumeControlContainer />
        </div>
      </div>
    );
  }
}

export default AuxControls;
