import React from "react";

require("./context-menu.css");

class ContextMenu extends React.Component {
  componentDidUpdate() {
    // how do I get the click event? lol
    // menuDimension.x = contextMenu.outerWidth();
    // menuDimension.y = contextMenu.outerHeight();
    // mousePosition.x = event.pageX;
    // mousePosition.y = event.pageY;
  }

  render() {
    var currentContextMenuId = this.props.currentContextMenu ?
      this.props.currentContextMenu.id : null;
    if (!currentContextMenuId) {
      return null;
    }

    var menuStyle = {
      top: this.props.currentContextMenu.mousePosition.y,
      left: this.props.currentContextMenu.mousePosition.x
    };
    var menuItems;
    if (this.props.menuItems) {
      menuItems = this.props.menuItems.map((item, idx) =>
        <li key={idx} onClick={item.action}>{item.item}</li>
      );
    }

    if (this.props.id === currentContextMenuId) {
      return (
        <div className="context-menu" style={menuStyle}>
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
