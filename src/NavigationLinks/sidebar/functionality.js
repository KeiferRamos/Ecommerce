import { useState, useEffect } from "react";
import { UseGlobalContext } from "../../GlobalContext/GlobalContext";

const Functionality = () => {
  const [toggled, setToggled] = useState(false);
  const [index, setIndex] = useState(null);
  const { width } = UseGlobalContext();

  const showSidebar = () => {
    setToggled(!toggled);
    setIndex(null);
  };

  useEffect(() => {
    if (width < 700) {
      setToggled(false);
      setIndex(null);
    }
  }, [width]);

  const setItem = (i) => setIndex(index == i ? null : i);

  return { setToggled, toggled, showSidebar, setItem, index, setIndex };
};

export default Functionality;
