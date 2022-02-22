import { useState } from "react";

const Functionality = () => {
  const [toggled, setToggled] = useState(false);
  const [index, setIndex] = useState(null);
  const showSidebar = () => {
    setToggled(!toggled);
    setIndex(null);
  };

  const setItem = (i) => setIndex(index == i ? null : i);

  return { toggled, showSidebar, setItem, index };
};

export default Functionality;
