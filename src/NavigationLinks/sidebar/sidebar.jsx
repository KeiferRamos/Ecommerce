import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";
import { links } from "../../main/API";
import "../sidebar/sidebar.css";
import Functionality from "./functionality";

function SideBar() {
  const { toggled, showSidebar, setItem, index } = Functionality();
  const { width, activeUser, setActiveUser } = UseGlobalContext();
  const nav = useNavigate();

  return (
    <div className={`${width <= 700 ? "closed" : toggled && "open"} sidebar`}>
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
                  const { logo, name, link } = item;
                  return (
                    <div
                      className="item-links"
                      key={i}
                      onClick={() => {
                        name == "sign-out" ? setActiveUser({}) : nav(link);
                      }}
                    >
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
        <img
          src={`https://avatars.dicebear.com/api/initials/${
            activeUser && activeUser.username
          }/.svg?background=%354269`}
        />
        {toggled && activeUser && (
          <div className="info">
            <p>{activeUser.username}</p>
            <p>{activeUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
