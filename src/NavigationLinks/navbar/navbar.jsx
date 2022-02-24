import React, { useState, useEffect } from "react";
import { links } from "../../main/API";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";
import "./navbar.css";

function Navbar() {
  const { logo, name, button } = links[0];
  const items = links.filter((el, i) => i > 0);
  const { width } = UseGlobalContext();
  const [index, setIndex] = useState(null);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if (width > 700) {
      setIndex(null);
      setToggled(false);
    }
  }, [width]);

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
      <div className="links">
        {items.map((item, i) => {
          const { logo, name, button, items } = item;
          return (
            <div className="link">
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
                  return (
                    <div className="items">
                      <div className="item-logo">{item.logo}</div>
                      <div className="item-name">{item.name}</div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
