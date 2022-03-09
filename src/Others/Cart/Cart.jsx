import React, { useEffect, useState } from "react";
import "./Cart.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";
import items from "../../main/API";

function Cart() {
  const { users, activeUser, setUsers } = UseGlobalContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const currUser = users.find((user) => user.email == activeUser.email);
  const userItems = items.filter((item) => currUser.cart.includes(item.name));
  const [hasCheckout, setHasCheckout] = useState(false);
  const [hasConfirm, setHasConfirm] = useState(false);

  const addPrice = (price) => setTotalPrice(totalPrice + price);
  const minusPrice = (price) => setTotalPrice(totalPrice - price);

  useEffect(() => {
    userItems.forEach((userItem) => {
      setTotalPrice((prevVal) => prevVal + userItem.price);
    });
    console.log(currUser);
  }, []);

  const clearCart = () => {
    setHasCheckout(false);
    setTotalPrice(0);
    const clearItems = users.map((user) => {
      if (user == currUser) {
        return { ...user, cart: [] };
      } else {
        return user;
      }
    });
    setUsers(clearItems);
  };

  return (
    <div className="Cart">
      <div className="cart-items">
        <div className="check-out">
          <div className="total">
            total Price: $ {totalPrice}
            <img
              src="https://img.icons8.com/dusk/25/000000/handshake.png"
              onClick={() => totalPrice > 0 && setHasCheckout(true)}
            />
          </div>
        </div>
        {!hasCheckout ? (
          <div className="container">
            {userItems.map((item, i) => {
              return (
                <Items
                  key={i}
                  {...item}
                  addPrice={addPrice}
                  minusPrice={minusPrice}
                />
              );
            })}
          </div>
        ) : (
          <div className="checkout">
            <div className="totalPrice">
              <p>{`hello ${currUser.infos.name}`}</p>
              <p>your total price is ${totalPrice}</p>
            </div>
            <div className="add-info">
              <p>your item will be delivered to this address</p>
              <p style={{ color: "green" }}>{currUser.infos.address}</p>
              <p>
                if we have a hard time finding your address we will contact you
                at this number
              </p>
              <p style={{ color: "green" }}>{currUser.infos.contact}</p>
              <button
                className="checkout-btn"
                onClick={() => setHasConfirm(true)}
              >
                confirm
              </button>
            </div>
            {hasConfirm && (
              <div className="confirm-modal">
                <div className="modal-container">
                  <p>thank you for shopping</p>
                  <button onClick={() => clearCart()}>ok</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Items({ name, price, img, addPrice, minusPrice }) {
  const { users, activeUser, setUsers } = UseGlobalContext();
  const currUser = users.find((user) => user.email == activeUser.email);
  const [quantity, setQuantity] = useState(1);
  const decrement = () => {
    minusPrice(price);
    if (quantity <= 1) {
      const removedItem = users.map((user) => {
        if (user == currUser) {
          const itemremoved = user.cart.filter((item) => item !== name);
          console.log(itemremoved);
          return { ...user, cart: itemremoved };
        } else {
          return user;
        }
      });
      setUsers(removedItem);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const increment = () => {
    setQuantity((prevVal) => prevVal + 1);
    addPrice(price);
  };
  return (
    <div className="cart-item">
      {img}
      <p>{name}</p>
      <p className="price">$ {price * quantity}</p>
      <div className="cart-btn">
        <FaAngleLeft onClick={() => decrement()} />
        {quantity}
        <FaAngleRight onClick={() => increment()} />
      </div>
    </div>
  );
}

export default Cart;
