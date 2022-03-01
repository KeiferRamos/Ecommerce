import React from "react";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import "./Profile.css";

function Profile() {
  const { isDark } = UseGlobalContext();
  return (
    <div className="Profile" style={{ color: `${isDark ? "#fff" : "#000"}` }}>
      <div className="container">
        <div className="fillup-form">
          <p>user info:</p>
          <input type="text" placeholder="first name" />
          <input type="text" placeholder="last name" />
          <input type="text" placeholder="contact no." />
          <input type="text" placeholder="city" />
          <input type="text" placeholder="province" />
          <input type="text" placeholder="zip" />
        </div>
        <div className="additional-form">
          <p>add delivery instruction(optional)</p>
          <div className="instruction">
            <p>do we need additional instruction to find this address?</p>
            <textarea placeholder="type here..."></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
