import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";
import UseModal from "../../Custom Hooks/UseModal";
import { links } from "../../main/API";
import "../sidebar/sidebar.css";
import Functionality from "./functionality";

function SideBar() {
  const { toggled, showSidebar, setItem, index, navigate, showModal, signOut } =
    Functionality();
  const { width, activeUser, isDark, setIsDark } = UseGlobalContext();

  return (
    <div
      className={`${width <= 700 ? "closed" : toggled && "open"} sidebar`}
      style={{
        background: `var(--${isDark ? "dark" : "light"}mode)`,
        color: `${isDark ? "#fff" : "#000"}`,
      }}
    >
      {links.map((link, i) => {
        const { logo, name, button, items } = link;
        return (
          <div
            className="main-container"
            key={i}
            style={{
              background: `var(--${isDark ? "dark" : "light"}mode)`,
              boxShadow: `var(--${isDark ? "dark" : "light"}-shadow)`,
            }}
          >
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
              {items?.map((item, i) => {
                const { logo, name, link } = item;
                return (
                  <div
                    className="item-links"
                    key={i}
                    onClick={() => {
                      name == "sign-out" ? signOut() : navigate(link);
                    }}
                    style={{
                      background: `var(--${isDark ? "dark" : "light"}mode)`,
                      boxShadow: `var(--${isDark ? "dark" : "light"}-shadow)`,
                    }}
                  >
                    <span className="item-logo">{logo}</span>
                    <div className="item-btn">
                      <p>{name}</p>
                    </div>
                    {name == "cart" && <div className="notif">12</div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div
        className={`${!toggled ? "resize " : ""}profile`}
        style={{
          background: `var(--${isDark ? "dark" : "light"}mode)`,
          boxShadow: `var(--${isDark ? "dark" : "light"}-shadow)`,
        }}
      >
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
        <div className="darkmode" onClick={() => setIsDark(!isDark)}>
          {isDark ? (
            <img src="https://img.icons8.com/dusk/34/000000/summer.png" />
          ) : (
            <img src="https://img.icons8.com/dusk/34/000000/new-moon--v2.png" />
          )}
        </div>
      </div>
      {showModal && <UseModal func={signOut} />}
    </div>
  );
}

export default SideBar;
