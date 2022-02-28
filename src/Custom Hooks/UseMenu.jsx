import React, { useEffect, useState } from "react";
import "./UseMenu.css";

function UseMenu({ product }) {
  const itemBtns = ["all", ...new Set(product.map((el) => el.category))];
  const [selected, setSelected] = useState("all");
  const [search, setSearch] = useState("");
  const [isSearching, setIssearching] = useState(false);
  const [index, setIndex] = useState(0);
  const items = product.filter((item) =>
    selected == "all" ? item : item.category == selected
  );
  const [highest, setHighest] = useState(items[0].price);
  const [lowest, setLowest] = useState(items[0].price);
  const searchItem = items.filter(
    (item) => item.name.substring(0, search.length) == search
  );

  useEffect(() => {
    items.forEach((item) => {
      if (item.price > highest) {
        setHighest(item.price);
      }
    });
    items.forEach((item) => {
      if (item.price < lowest) {
        setLowest(item.price);
      }
    });
  });

  const selectItem = (i, btn) => {
    setIndex(i);
    setSelected(btn);
  };

  return (
    <div className="product">
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
      </div>
      <div className="items">
        {(isSearching ? searchItem : items).map((item, i) => {
          const { name, img, price } = item;
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UseMenu;
