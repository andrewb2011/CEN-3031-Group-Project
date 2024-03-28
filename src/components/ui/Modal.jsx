const Modal = ({ onClose, children }) => {
  return (
    <div className="bg-gray-500 bg-opacity-75 backdrop-blur-lg">
      {" "}
      {/**This is the overlay */}
      <div className="rounded-lg bg-white p-6">
        {" "}
        {/*This is the popup */}
        <button onClick={onClose} className="right-2/ absolute top-2">
          Close
        </button>
        {children} {/*This is the content to display inside the window popup */}
      </div>
    </div>
  );
};

export default Modal;
