import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../components/ui/Modal";
import TextMessage from "./TextMessage";

function MessagesView() {
  const navigate = useNavigate();
  const { id } = useParams(); //This is the post-id of the selected post. Use this to get the thread from supabase

  return (
    <Modal
      onClose={() => navigate("/past-donations")}
      onClickBackButton={() => navigate(`/past-donations/${id}`)}
    >
      <h2 className="ml-4">Other Individual&apos; username</h2>
      <h3 className="ml-6">Other Individual&apos; organization name</h3>
      <div className="p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange max-h-[300px] overflow-y-auto">
        {Array.from({ length: 10 }, (_, index) => (
          <TextMessage key={index} />
        ))}
      </div>
      <div>
        <textarea
          type="text"
          placeholder="Enter message here"
          className="w-full p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange"
        ></textarea>
      </div>
    </Modal>
  );
}

export default MessagesView;
