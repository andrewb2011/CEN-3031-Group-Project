const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 bg-opacity-75 l backdrop-blur-sm">
      {/**This is the overlay */}
      <div className="p-6 bg-white rounded-lg">
        {" "}
        {/*This is the popup */}
        <button onClick={onClose} className="absolute right-2/ top-2">
          Close
        </button>
        {children} {/*This is the content to display inside the window popup */}
      </div>
    </div>
  );
};

export default Modal;
