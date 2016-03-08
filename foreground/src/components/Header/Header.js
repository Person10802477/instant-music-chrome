import React from "react";
import SearchBar from "./SearchBar/SearchBar";

require("./header.css");

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <SearchBar />
      </div>
    );
  }
}

export default Header;
