import { FaArrowLeft, FaUndoAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import { socialMedias } from "../main/API";
import Functionality from "./Functionality";
import "./UserForm.css";

function useForm() {
  const {
    Login,
    createAcc,
    SetIndex,
    index,
    label,
    setAccount,
    hasAccount,
    account,
    clearInputs,
  } = Functionality();

  return (
    <div className="form">
      <div className="main-container">
        <div className="logo">
          <img src="https://img.icons8.com/dusk/40/000000/small-business.png" />
          <p>{label}</p>
        </div>
        <UseInputText
          input={account.email}
          holder="email"
          func={(e) => setAccount({ ...account, email: e.target.value })}
        />
        {!hasAccount && (
          <UseInputText
            input={account.username}
            holder="username"
            func={(e) => setAccount({ ...account, username: e.target.value })}
          />
        )}
        <UsePassword
          input={account.password}
          holder="password"
          func={(e) => setAccount({ ...account, password: e.target.value })}
        />
        {!hasAccount && (
          <UsePassword
            input={account.confirm}
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
              onClick={() => SetIndex(i)}
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

function UseInputText({ func, input, holder }) {
  return (
    <input
      type="text"
      className="input"
      placeholder={holder}
      value={input}
      onChange={(e) => func(e)}
    />
  );
}

function UsePassword({ holder, input, func }) {
  const { show, hidePass } = Functionality();
  return (
    <div className="password-form">
      <input
        type={show ? "text" : "password"}
        className="input"
        placeholder={holder}
        value={input}
        onChange={(e) => func(e)}
      />
      <button onClick={() => hidePass()}>
        {show ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}

export default useForm;
