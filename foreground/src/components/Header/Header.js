import React from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";

require("./header.css");

class Header extends React.Component {
  render() {
    var version_name = (chrome.runtime.id ? chrome.runtime.getManifest().version : "Beta");

    return (
      <div className="header">
        <div className="brand-container">
          <span className="brand-logo">INSTANT MUSIC</span>
          <span className="beta-logo">v{version_name}</span>
        </div>
        <div className="brand-container-sm">
          IM
        </div>
        <SearchContainer />
      </div>
    );
  }
}

export default Header;
