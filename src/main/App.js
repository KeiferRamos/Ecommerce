import React from "react";
import SideBar from "../NavigationLinks/sidebar/sidebar";
import Navbar from "../NavigationLinks/navbar/navbar";
import UserForm from "../UserForm/UserForm";
import "../main/style.css";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";

function App() {
  const { activeUser } = UseGlobalContext();
  return (
    <div className="global-container">
      {!activeUser.email ? (
        <UserForm />
      ) : (
        <div className="links">
          <Navbar />
          <SideBar />
        </div>
      )}
    </div>
  );
}

export default App;
