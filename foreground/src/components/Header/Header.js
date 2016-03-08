import React from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";

require("./header.css");

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <SearchContainer />
      </div>
    );
  }
}

export default Header;
