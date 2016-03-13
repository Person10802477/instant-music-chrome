import React from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";

require("./header.css");

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="brand-container">
          <span className="brand-logo">INSTANT MUSIC</span>
          <span className="beta-logo">Beta</span>
        </div>
        <SearchContainer />
      </div>
    );
  }
}

export default Header;
