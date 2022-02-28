import React, { useState, useEffect } from "react";
import { links } from "../../main/API";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import Functionality from "../sidebar/functionality";
import UseModal from "../../Custom Hooks/UseModal";

function Navbar() {
  const { logo, name, button } = links[0];
  const items = links.filter((el, i) => i > 0);
  const { width, activeUser } = UseGlobalContext();
  const [index, setIndex] = useState(null);
  const [toggled, setToggled] = useState(false);
  const { showModal, signOut } = Functionality();
  const nav = useNavigate();

  useEffect(() => {
    if (width >= 700) {
      setIndex(null);
      setToggled(false);
    }
  }, [width]);

  const navigate = (link) => {
    nav(link);
    setToggled(false);
  };

  return (
    <div
      className={`${
        width >= 700 ? "closed" : toggled ? "" : "minimize"
      } nav-bar`}
    >
      <div className="header">
        <div className="brand-name">
          <span>{logo}</span>
          <p>{name}</p>
        </div>
        <div
          className="button"
          onClick={() => {
            setToggled(!toggled);
            setIndex(null);
          }}
        >
          {button}
        </div>
      </div>
      <div className={`items-link ${toggled ? "show" : ""}`}>
        {items.map((item, i) => {
          const { logo, name, button, items } = item;
          return (
            <div className="link" key={i}>
              <span className="logo">{logo}</span>
              <div className="item">
                <div className="name">{name}</div>
                <button
                  className="item-btn"
                  onClick={() => setIndex(i == index ? null : i)}
                >
                  {button[i == index ? 1 : 0]}
                </button>
              </div>
              {i == index &&
                items.map((item) => {
                  const { name, logo, link } = item;
                  return (
                    <div
                      className="items"
                      onClick={() => {
                        name == "sign-out" ? signOut() : navigate(link);
                      }}
                    >
                      <div className="item-logo">{logo}</div>
                      <div className="item-name">{name}</div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
      {toggled && (
        <div className="profile">
          <img
            src={`https://avatars.dicebear.com/api/initials/${
              activeUser && activeUser.username
            }/.svg?background=%354269`}
          />
          <div className="info">
            <p>{activeUser.username}</p>
            <p>{activeUser.email}</p>
          </div>
        </div>
      )}
      {showModal && <UseModal func={signOut} />}
    </div>
  );
}

export default Navbar;
