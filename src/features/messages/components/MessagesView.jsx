import { useNavigate } from "react-router-dom";
import Modal from "../../../components/ui/Modal";

function MessagesView() {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate("/past-donations")}>
      <h2>Other Individual&apos; username</h2>
      <h3>Other Individual&apos; organization name</h3>
      <div className="p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange"></div>
    </Modal>
  );
}

export default MessagesView;
