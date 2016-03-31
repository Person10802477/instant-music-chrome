import React from "react";
import ControlsContainer from '../../containers/ControlsContainer/ControlsContainer';
import SongDisplayContainer from '../../containers/SongDisplayContainer/SongDisplayContainer';
import AuxControls from '../../containers/AuxControlsContainer/AuxControlsContainer';
// import WebviewContainer from "../../containers/WebviewContainer/WebviewContainer";

require("./right-column.css");

class RightColumn extends React.Component {
  constructor(props) {
    super(props);

    this.onSignInClick = this.onSignInClick.bind(this);
  }

  onSignInClick(event) {
    event.preventDefault();
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      $.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+token, function(data) {
        var email = data.email;

        // send a POST request to server to add a playlist
        debugger
      });
    });
  }

  render() {
    return (
      <div className="right-column">
        <div>
          <SongDisplayContainer />
          <ControlsContainer />
          <AuxControls />
          <button onClick={this.onSignInClick} className="btn btn-primary">Sign In</button>
        </div>
      </div>
    );
  }
}

export default RightColumn;
