import React, { useEffect, useState } from "react";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import "./UseMenu.css";

function UseMenu({ product }) {
  const itemBtns = ["all", ...new Set(product.map((el) => el.category))];
  const { isDark } = UseGlobalContext();
  const [selected, setSelected] = useState("all");
  const [search, setSearch] = useState("");
  const [isSearching, setIssearching] = useState(false);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState(product);
  const searchItem = items.filter(
    (item) => item.name.substring(0, search.length) == search
  );

  const filteredItem = product.filter((item) =>
    selected == "all" ? item : item.category == selected
  );

  const filterItem = () => {
    setItems(filteredItem);
  };

  useEffect(() => {
    filterItem();
  }, [selected]);

  const sortByDiscount = () => {
    setItems(filteredItem.filter((item) => item.isDiscounted));
  };

  const sortByFreeShip = () => {
    setItems(filteredItem.filter((item) => item.freeShipping));
  };

  const selectItem = (i, btn) => {
    setIndex(i);
    setSelected(btn);
  };

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
          <div className="discount-btn" onClick={() => sortByFreeShip()}>
            <img src="https://img.icons8.com/dusk/30/000000/delivery--v1.png" />
          </div>
          <div className="free-btn" onClick={() => sortByDiscount()}>
            <img src="https://img.icons8.com/dusk/30/000000/discount.png" />
          </div>
        </div>
      </div>
      <div className="items">
        {(isSearching ? searchItem : items).map((item, i) => {
          const { name, img, price, isDiscounted, freeShipping } = item;
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
                  <button>Review</button>
                  <button>Add to cart</button>
                  <button>buy now</button>
                </div>
              </div>
              {isDiscounted && (
                <img
                  className="discount"
                  src="https://img.icons8.com/dusk/50/000000/discount.png"
                />
              )}
              {freeShipping && (
                <img
                  className="freeShipping"
                  src="https://img.icons8.com/dusk/50/000000/delivery--v1.png"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UseMenu;
