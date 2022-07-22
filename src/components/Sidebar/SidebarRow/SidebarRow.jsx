import React from "react";
import { NavLink } from "react-router-dom";

import "../SidebarRow/SidebarRow.css";

function SidebarRow({ Icon, title, link, color, isOpen }) {

  return (
    <div className={`sidebarRow align-items-center`}>
      <NavLink to={link ? `/${link}` : "/"} activeclassname="active">
        <div className="d-flex align-items-center icon">
          {Icon && <Icon style={color ? { color: `${color}` } : null} />}
          {isOpen ? <h4>{title}</h4> : null}
        </div>
      </NavLink>
    </div>
  );
}

export default SidebarRow;
