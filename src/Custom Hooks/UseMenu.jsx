import React, { useEffect, useState } from "react";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import "./UseMenu.css";
import UseCartModal from "./UseCartModal";
import Functionality from "../NavigationLinks/sidebar/functionality";

function UseMenu({ product }) {
  const itemBtns = ["all", ...new Set(product.map((el) => el.category))];
  const { isDark } = UseGlobalContext();
  const [selected, setSelected] = useState("all");
  const [search, setSearch] = useState("");
  const [isSearching, setIssearching] = useState(false);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState(product);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [text, setText] = useState("already in cart");
  const searchItem = items.filter(
    (item) => item.name.substring(0, search.length) == search
  );

  const filteredItem = product.filter((item) =>
    selected == "all" ? item : item.category == selected
  );

  const filterItem = () => setItems(filteredItem);

  useEffect(() => filterItem(), [selected]);

  const sortByDiscount = () => {
    setItems(filteredItem.filter((item) => item.isDiscounted));
  };

  const selectItem = (i, btn) => {
    setIndex(i);
    setSelected(btn);
  };

  const showModal = () => setAlreadyAdded(true);
  const hideModal = () => setAlreadyAdded(false);
  const changeText = (changedtext) => setText(changedtext);

  return (
    <div className="product" style={{ color: `${isDark ? "#fff" : "#000"}` }}>
      <div className="category-btns">
        {itemBtns.map((btn, i) => (
          <button
            key={i}
            className={`${index == i && "selected"} category-btn`}
            onClick={() => selectItem(i, btn)}
          >
            {btn}
          </button>
        ))}
        <div className="search-box">
          <input
            type="text"
            placeholder="type here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setIssearching(true)}
          />
        </div>
        <div className="promos">
          <div className="free-btn" onClick={() => sortByDiscount()}>
            <img src="https://img.icons8.com/dusk/30/000000/discount.png" />
          </div>
        </div>
      </div>
      <div className="items">
        {(isSearching ? searchItem : items).map((item, i) => {
          return (
            <Items item={item} i={i} func={showModal} changeText={changeText} />
          );
        })}
      </div>
      {alreadyAdded && <UseCartModal func={hideModal} text={text} />}
    </div>
  );
}

function Items({ item, i, func, changeText }) {
  const { users, activeUser, setUsers } = UseGlobalContext();
  const { setCart } = Functionality();
  const { name, img, price, isDiscounted, freeShipping } = item;
  const currUser = users.find((user) => user.email == activeUser.email);

  useEffect(() => {
    setCart(currUser.cart.length);
  }, [users]);

  const AddToCart = () => {
    if (currUser.cart.includes(name)) {
      changeText("item already added to cart");
      func();
      return;
    } else {
      changeText("item added to cart");
    }
    func();
    const addedItem = users.map((user) => {
      if (currUser == user) {
        user.cart.push(name);
        return user;
      } else {
        return user;
      }
    });
    setUsers(addedItem);
  };
  return (
    <div className="product-item" key={i}>
      <div className="image">{img}</div>
      <div className="info">
        <p>{name}</p>
        <p className="price">
          <img src="https://img.icons8.com/dusk/20/000000/cent.png" />
          {price}
        </p>
        <div className="btns">
          <button onClick={() => AddToCart()}>Add to cart</button>
        </div>
      </div>
      {isDiscounted && (
        <img
          className="discount"
          src="https://img.icons8.com/dusk/50/000000/discount.png"
        />
      )}
    </div>
  );
}

export default UseMenu;
