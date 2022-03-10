import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";

const Functionality = () => {
  const [toggled, setToggled] = useState(false);
  const [index, setIndex] = useState(null);
  const { width, users, activeUser } = UseGlobalContext();
  const currUser = users.find((user) => user.email == activeUser.email);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState(0);
  const nav = useNavigate();

  const showSidebar = () => {
    setToggled(!toggled);
    setIndex(null);
  };

  const navigate = (link) => {
    nav(link);
    setToggled(false);
    setIndex(null);
  };

  const signOut = () => {
    setShowModal(!showModal);
    nav("/Ecommerce");
  };

  useEffect(() => {
    if (width <= 700) {
      setToggled(false);
      setIndex(null);
    }
  }, [width]);

  const setItem = (i) => setIndex(index == i ? null : i);

  const clearNotif = (link) => {
    setCart(0);
    nav(link);
  };

  useEffect(() => {
    if (window.location.href == "http://localhost:3000/Ecommerce/Cart") {
      return;
    }
    setCart(currUser.cart.length);
  }, [users]);

  return {
    navigate,
    toggled,
    showSidebar,
    setItem,
    index,
    setIndex,
    showModal,
    signOut,
    cart,
    setCart,
    clearNotif,
  };
};

export default Functionality;
