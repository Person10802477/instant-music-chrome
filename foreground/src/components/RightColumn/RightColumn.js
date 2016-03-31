import React from "react";
import ControlsContainer from '../../containers/ControlsContainer/ControlsContainer';
import SongDisplayContainer from '../../containers/SongDisplayContainer/SongDisplayContainer';
import AuxControls from '../../containers/AuxControlsContainer/AuxControlsContainer';

var API_URL = "http://localhost:3000/api/";

require("./right-column.css");

class RightColumn extends React.Component {
  constructor(props) {
    super(props);

    this.onSignInClick = this.onSignInClick.bind(this);
  }

  // HOWON: MOVE THIS LOGIC TO AN APPROPRIATE PLACE
  // When you open the app in the beginning, silently log in the user if possible
  // after that, sign the user in when
  // a. he tries to add a playlist
  // b. clicks the login button
  onSignInClick(event) {
    event.preventDefault();
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      $.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+token, function(data) {
        var email = data.email;
        email = "a@test.com";
        var name = data.name;

        // send a GET request to server to get playlists
        $.get(API_URL+"/playlists?email="+email, function(playlists) {
          debugger;
        });
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
