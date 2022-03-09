import "./UseCartModal.css";

function UseCartModal({ func, text }) {
  return (
    <div className="cart-modal">
      <div>
        <p>{text}</p>
        <button onClick={() => func()}>ok</button>
      </div>
    </div>
  );
}

export default UseCartModal;
