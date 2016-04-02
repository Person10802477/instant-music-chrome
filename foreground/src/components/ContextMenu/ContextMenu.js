import React from "react";

require("./context-menu.css");

class ContextMenu extends React.Component {
  render() {
    var menuItems;
    if (this.props.menuItems) {
      menuItems = this.props.menuItems.map((item) =>
        <li onClick={item.action}>{item.label}</li>
      );
    }

    return (
      <div className="context-menu">
        <ul>
          {menuItems}
        </ul>
      </div>
    );
  }
}

export default ContextMenu;
