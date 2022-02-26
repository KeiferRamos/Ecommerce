import { UseGlobalContext } from "../GlobalContext/GlobalContext";
import "./UseModal.css";

function UseModal({ func }) {
  const { setActiveUser } = UseGlobalContext();
  return (
    <div className="sign-out">
      <div>
        <p>Are you sure you want to sign out ?</p>
        <button onClick={() => setActiveUser({})}>yes</button>
        <button onClick={() => func()}>no</button>
      </div>
    </div>
  );
}

export default UseModal;
