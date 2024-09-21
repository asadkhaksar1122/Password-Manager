import "./Modal.css";

const Modal = ({
  show,
  handleClose,
  handlesubmit,
  secretKey,
  setSecretKey,
}) => {
  const handleInputChange = (e) => {
    setSecretKey(e.target.value);
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Enter Secret Key</h2>
        <input
          type="text"
          value={secretKey}
          onChange={handleInputChange}
          placeholder="Secret Key"
        />
        <button onClick={handlesubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
