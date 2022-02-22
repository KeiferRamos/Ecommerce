import React, { useEffect, useState } from "react";
import { links } from "../../main/API";
import "../sidebar/sidebar.css";
import Functionality from "./functionality";

function SideBar() {
  const { toggled, showSidebar, setItem, index } = Functionality();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  });

  return (
    <div className={`${toggled ? "minimize" : ""} sidebar`}>
      {links.map((link, i) => {
        const { logo, name, button, items } = link;
        return (
          <div className="main-container" key={i}>
            <span className="logo" onClick={() => i == 0 && showSidebar()}>
              {logo}
            </span>
            <div className="links" key={i}>
              <p>{name}</p>
              <button
                className="toggle"
                onClick={() => (i == 0 ? showSidebar() : setItem(i))}
              >
                {i == 0 ? button : button[index == i ? 1 : 0]}
              </button>
            </div>
            <div className={`${index == i ? "show" : ""} items-container`}>
              {items &&
                items.map((item, i) => {
                  const { logo, name } = item;
                  return (
                    <div className="item-links" key={i}>
                      <span className="item-logo">{logo}</span>
                      <div className="item-btn">
                        <p>{name}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      <div className={`${!toggled ? "resize " : ""}profile`}>
        <img src={`https://avatars.dicebear.com/api/avataaars/male/.svg?`} />
        {toggled && (
          <div className="info">
            <p>keifer ramos</p>
            <p>krramos@gmail.com</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
