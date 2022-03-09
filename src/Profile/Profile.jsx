import React, { useState } from "react";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import "./Profile.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const { isDark, users, activeUser } = UseGlobalContext();
  const user = users.find((user) => user.email == activeUser.email);
  const { name, contact, address } = user.infos;
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: name,
    contact: contact,
    address: address,
  });

  function setInfo(info, e) {
    setUserInfo({ ...userInfo, [info]: e.target.value });
  }

  function clearInput() {
    setUserInfo({
      name: "",
      contact: "",
      address: "",
    });
  }

  return (
    <div className="Profile" style={{ color: `${isDark ? "#fff" : "#000"}` }}>
      <div className="container">
        <div className="information">
          {user.infos.address ? (
            <UserInfo />
          ) : (
            <FillupForm
              userInfo={userInfo}
              setUserInfo={setInfo}
              clearInput={clearInput}
            />
          )}
          <UserAccount />
        </div>
      </div>
    </div>
  );
}

function UseAccForm({ user, text }) {
  const { users, activeUser, setUsers, setActiveUser } = UseGlobalContext();
  const { username, password, email } = activeUser;
  const [isEditing, setIsEditing] = useState(false);
  const [hasShow, setHasShow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [editedUser, SetEditedUser] = useState({
    email,
    username,
    password,
  });
  const EditUserInfo = () => {
    const currUser = users.find((user) => user.email == activeUser.email);

    if (isEditing) {
      if (!editedUser[text] || editedUser[text].length < 8) {
        setWarning(true);
        return;
      } else {
        setWarning(false);
      }
      if (text == "email" && !editedUser[text].endsWith("@gmail.com")) {
        editedUser[text] += "@gmail.com";
      }
      const editedInfo = users.map((user) => {
        if (currUser == user) {
          return { ...user, [text]: editedUser[text] };
        } else {
          return user;
        }
      });
      setActiveUser({ ...activeUser, [text]: editedUser[text] });
      setUsers(editedInfo);
      setIsEditing(false);
      setHasShow(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="infos">
      {isEditing ? (
        <div className="inputs">
          <input
            type={
              text == "password" ? (!hasShow ? "password" : "text") : "text"
            }
            className={`${warning && "red"} edit-acc`}
            placeholder={text}
            value={editedUser[text]}
            onChange={(e) =>
              SetEditedUser({ ...editedUser, [text]: e.target.value })
            }
          />
          {text == "password" && (
            <div className="show" onClick={() => setHasShow(!hasShow)}>
              {hasShow ? <FaEye /> : <FaEyeSlash />}
            </div>
          )}
        </div>
      ) : (
        <p>
          {text}: {user}
        </p>
      )}
      <div className="edit" onClick={() => EditUserInfo()}>
        {isEditing ? (
          <img src="https://img.icons8.com/dusk/25/000000/checkmark--v1.png" />
        ) : (
          <img src="https://img.icons8.com/dusk/25/000000/edit--v1.png" />
        )}
      </div>
    </div>
  );
}

function UserAccount() {
  const { users, activeUser } = UseGlobalContext();
  const user = users.find((user) => user.email == activeUser.email);

  return (
    <div className="user-acc">
      <UseAccForm user={user.email} text={"email"} />
      <UseAccForm user={user.username} text={"username"} />
      <UseAccForm user={"*".repeat(user.password.length)} text={"password"} />
    </div>
  );
}

function FillupForm({ userInfo, setUserInfo, clearInput }) {
  const { setUsers, users, activeUser } = UseGlobalContext();
  const currUser = users.find((user) => user.email == activeUser.email);

  const submitInfo = (e) => {
    e.preventDefault();
    const addUserInfo = users.map((user) => {
      if (user == currUser) {
        return { ...user, infos: { ...userInfo } };
      }
      return user;
    });
    setUsers(addUserInfo);
  };
  return (
    <form className="fillup-form" onSubmit={(e) => submitInfo(e)}>
      <p>user info:</p>
      <input
        type="text"
        value={userInfo.name}
        onChange={(e) => setUserInfo("name", e)}
        placeholder="name"
      />
      <input
        type="text"
        value={userInfo.contact}
        onChange={(e) => setUserInfo("contact", e)}
        placeholder="contact"
      />
      <input
        type="text"
        value={userInfo.address}
        onChange={(e) => setUserInfo("address", e)}
        placeholder="address"
      />
      <button type="submit">submit</button>
      <button type="reset" onClick={() => clearInput()}>
        reset
      </button>
    </form>
  );
}

function UserInfo() {
  const { activeUser, users, setUsers } = UseGlobalContext();
  const currUser = users.find((user) => user.email == activeUser.email);
  const { name, contact, address } = currUser.infos;

  const editInfo = () => {
    const editedInfo = users.map((user) => {
      return user == currUser
        ? { ...user, infos: { name: "", address: "", contact: "" } }
        : user;
    });
    setUsers(editedInfo);
  };

  return (
    <div className="user-info">
      <p>name: {name}</p>
      <p>contact: {contact}</p>
      <p>address: {address}</p>
      <button onClick={() => editInfo()}>edit information</button>
    </div>
  );
}

export default Profile;
