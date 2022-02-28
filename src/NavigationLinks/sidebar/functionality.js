import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";

const Functionality = () => {
  const [toggled, setToggled] = useState(false);
  const [index, setIndex] = useState(null);
  const { width } = UseGlobalContext();
  const [showModal, setShowModal] = useState(false);
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

  return {
    navigate,
    toggled,
    showSidebar,
    setItem,
    index,
    setIndex,
    showModal,
    signOut,
  };
};

export default Functionality;
