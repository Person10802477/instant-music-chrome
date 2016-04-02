import React from "react";

require("./context-menu.css");

class ContextMenu extends React.Component {
  render() {

    // FIXME: wtf is wrong with this

    var menuItems;
    if (this.props.menuItems) {
      menuItems = this.props.menuItems.map((item) =>
        <li onClick={item.action}>{item.label}</li>
      );
    }

    if (this.props.id === this.props.currentContextMenu) {
      return (
        <div className="context-menu">
          <ul>
            {menuItems}
          </ul>
        </div>
      );      
    } else {
      return null;
    }
  }
}

export default ContextMenu;
