import React from "react";
import { FcBusinessman, FcExpand } from "react-icons/fc";
import "../sidebar/sidebar.css";

const links = [
  {
    logo: (
      <img src="https://img.icons8.com/dusk/50/000000/small-business.png" />
    ),
    name: "ShopOnClick",
  },
  {
    logo: <img src="https://img.icons8.com/dusk/25/000000/super-mario.png" />,
    name: "edit profile",
  },
  {
    logo: (
      <img src="https://img.icons8.com/office/25/000000/bookmark-ribbon--v1.png" />
    ),
    name: "saved",
  },
  {
    logo: <img src="https://img.icons8.com/dusk/25/000000/packaging.png" />,
    name: "voucher",
  },
  {
    logo: (
      <img src="https://img.icons8.com/dusk/25/000000/shopping-bag--v1.png" />
    ),
    name: "products",
    button: <FcExpand />,
    items: [
      {
        logo: <img src="https://img.icons8.com/dusk/64/000000/t-shirt.png" />,
        name: "clothing",
      },
      {
        logo: <img src="https://img.icons8.com/dusk/64/000000/t-shirt.png" />,
        name: "clothing",
      },
    ],
  },
  {
    logo: <img src="https://img.icons8.com/dusk/25/000000/shopping-cart.png" />,
    name: "cart",
  },
  {
    logo: <img src="https://img.icons8.com/dusk/20/000000/left.png" />,
    name: "sign-out",
  },
  {
    logo: <img src="https://img.icons8.com/office/25/000000/settings.png" />,
    name: "settings",
  },
];

function SideBar() {
  return (
    <div className="sidebar">
      {links.map((link) => {
        const { logo, name, button } = link;
        return (
          <div className="links">
            <span>{logo}</span>
            <div className="items">
              <p>{name}</p>
              {button}
            </div>
          </div>
        );
      })}
      <div className="profile">
        <img src={`https://avatars.dicebear.com/api/avataaars/male/.svg?`} />
        <div className="info">
          <p>keifer ramos</p>
          <p>krramos@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
