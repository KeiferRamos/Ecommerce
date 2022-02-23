import React, { useEffect, useState } from "react";
import SideBar from "../NavigationLinks/sidebar/sidebar";
import Navbar from "../NavigationLinks/navbar/navbar";
import "../main/style.css";

function App() {
  const [width, setWidth] = useState(null);
  const getWidth = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [width]);

  return (
    <div>
      <Navbar />
      <SideBar />
    </div>
  );
}

export default App;
