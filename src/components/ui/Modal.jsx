import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-filter backdrop-blur-sm">
      {/**This is the overlay */}
      <div className="relative p-6 bg-white border-2 rounded-lg border-orange ">
        {/*This is the popup */}
        <button onClick={onClose} className="absolute right-2 top-2">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-orange size-6"
          />
        </button>
        {children} {/*This is the content to display inside the window popup */}
      </div>
    </div>
  );
};

export default Modal;
