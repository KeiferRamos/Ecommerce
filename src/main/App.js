import React from "react";
import SideBar from "../NavigationLinks/sidebar/sidebar";
import Navbar from "../NavigationLinks/navbar/navbar";
import UserForm from "../UserForm/UserForm";
import "../main/style.css";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import { Routes, Route } from "react-router-dom";
import Foods from "../products/foods/Foods";
import Clothings from "../products/clothings/Clothings";
import Drinks from "../products/Household/HouseHold";
import Profile from "../Profile/Profile";
import Cart from "../Others/Cart/Cart";
import Voucher from "../Others/Voucher/Voucher";
import Home from "../Home/Home";
import HouseHold from "../products/Household/HouseHold";

function App() {
  const { activeUser, width } = UseGlobalContext();
  return (
    <div className="global-container">
      {!activeUser.email ? (
        <UserForm />
      ) : (
        <div className={`${width >= 700 ? "side" : "nav"} links`}>
          {width >= 700 ? <SideBar /> : <Navbar />}
          <div className="routes">
            <Routes>
              <Route path="/Ecommerce" element={<Home />} />
              <Route path="/Ecommerce/Foods" element={<Foods />} />
              <Route path="/Ecommerce/Clothings" element={<Clothings />} />
              <Route path="/Ecommerce/HouseHold" element={<HouseHold />} />
              <Route path="/Ecommerce/Profile" element={<Profile />} />
              <Route path="/Ecommerce/Cart" element={<Cart />} />
              <Route path="/Ecommerce/Voucher" element={<Voucher />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
