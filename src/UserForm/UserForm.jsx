import { useEffect, useState } from "react";
import { FaArrowLeft, FaUndoAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import { socialMedias } from "../main/API";
import "./UserForm.css";

function useForm() {
  const [hasAccount, setHasAccount] = useState(true);
  const [index, setIndex] = useState(0);
  const [strength, setStrength] = useState("");
  const [label, setLabel] = useState("ShopOnClick");
  const { users, activeUser, setUsers, setActiveUser } = UseGlobalContext();
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
  });

  const clearInputs = () =>
    setAccount({
      email: "",
      username: "",
      password: "",
      confirm: "",
    });

  useEffect(() => {
    if (label !== "ShopOnClick") {
      const timer = setTimeout(() => {
        setLabel("ShopOnClick");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [label]);

  const createAcc = () => {
    const { email, username, password, confirm } = account;
    if (hasAccount) {
      setHasAccount(false);
      clearInputs();
    } else if (email && username && password && confirm) {
      const invalidEmail = users.find((user) => user.email == email);
      if (password !== confirm) {
        setLabel("pass not match");
      } else if (!email.endsWith("@gmail.com")) {
        setLabel("email invalid");
      } else if (password.length < 8) {
        setLabel("short pass");
      } else if (invalidEmail) {
        setLabel("email already in use");
      } else {
        setUsers([...users, account]);
        setStrength("");
        setHasAccount(true);
        clearInputs();
      }
    } else {
      return;
    }
  };

  const checkPass = (e) => {
    setAccount({ ...account, password: e.target.value });
    if (!hasAccount) {
      if (account.password.length < 8) {
        setStrength("weak");
      } else {
        setStrength("good");
      }
    }
  };

  const Login = () => {
    const validEmail = users.find((user) => user.email == account.email);
    if (hasAccount) {
      if (validEmail) {
        if (account.password !== validEmail.password) {
          setLabel("wrong pass");
        } else {
          setActiveUser(validEmail);
          clearInputs();
        }
      } else if (!account.email && !account.password) {
        return;
      } else {
        setLabel("email not recognized");
      }
    } else {
      setHasAccount(true);
      setStrength("");
      clearInputs();
    }
  };

  const SetStrength = () => setStrength("");

  return (
    <div className="form">
      <div className="main-container">
        <div className="logo">
          <img src="https://img.icons8.com/dusk/40/000000/small-business.png" />
          <p>{label}</p>
        </div>
        <UseInputText
          input={account.email}
          setStrength={SetStrength}
          holder="email"
          func={(e) => setAccount({ ...account, email: e.target.value })}
        />
        {!hasAccount && (
          <UseInputText
            input={account.username}
            setStrength={SetStrength}
            holder="username"
            func={(e) => setAccount({ ...account, username: e.target.value })}
          />
        )}
        <UsePassword
          input={account.password}
          setStrength={SetStrength}
          holder="password"
          strength={strength}
          func={(e) => checkPass(e)}
        />
        {!hasAccount && (
          <UsePassword
            input={account.confirm}
            setStrength={SetStrength}
            holder="confirm password"
            func={(e) => setAccount({ ...account, confirm: e.target.value })}
          />
        )}
        <div className="buttons">
          <button className="login btn" onClick={() => Login()}>
            {hasAccount ? "Login" : <FaArrowLeft />}
          </button>
          <button className="register btn" onClick={() => createAcc()}>
            register
          </button>
          <button className="reset btn" onClick={() => clearInputs()}>
            <FaUndoAlt />
          </button>
        </div>
        {hasAccount && <p className="forgot-pass">Forgot password?</p>}
      </div>
      <div className="social-media">
        <p style={{ textAlign: "center" }}>Follow us at:</p>
        {socialMedias.map((socialMedia, i) => {
          return (
            <div
              className="logo"
              style={{ borderBottom: index == i && "1px solid blue" }}
              onClick={() => setIndex(i)}
            >
              {socialMedia.logo}
            </div>
          );
        })}
        <div style={{ textAlign: "center" }}>{socialMedias[index].name}</div>
      </div>
    </div>
  );
}

function UseInputText({ func, input, holder, setStrength }) {
  return (
    <input
      type="text"
      className="input"
      onClick={setStrength}
      placeholder={holder}
      value={input}
      onChange={(e) => func(e)}
    />
  );
}

function UsePassword({ holder, input, func, strength, setStrength }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`${strength} password-form`}>
      <input
        type={show ? "text" : "password"}
        className="input"
        onClick={setStrength}
        placeholder={holder}
        value={input}
        onChange={(e) => func(e)}
      />
      <button onClick={() => setShow(!show)}>
        {show ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}

export default useForm;
