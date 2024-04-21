import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Modal = ({ onClose, children, onClickBackButton = null }) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-filter backdrop-blur-sm">
      {/**Above is the overlay */}
      <div className="relative w-full max-w-lg p-6 bg-white border-2 rounded-lg border-orange md:max-w-xl lg:max-w-2x1 xl:max-w-3x1 2x1:max-w-4xl ">
        {/*This is the popup */}
        {onClickBackButton && (
          <button className="absolute left-2 top-2" onClick={onClickBackButton}>
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="text-orange size-6"
            />
          </button>
        )}
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired, // Function to handle closing the modal
  children: PropTypes.node.isRequired, // Content to be displayed inside the modal
  onClickBackButton: PropTypes.func, // Function to handle clicking the back button, if provided
};

export default Modal;
