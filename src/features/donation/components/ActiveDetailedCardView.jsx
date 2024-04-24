import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { claimDonation } from "../services/donationClaimingService";
import { usePostsContext } from "../contexts/PostsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../../../components/ui/Spinner";
import { useSessionContext } from "../../../contexts/SessionContext";

function ActiveDetailedCardView() {
  const { selectedPost, fetchPost, isLoadingSinglePost, onClosePost } =
    usePostsContext();
  const {
    session: { user },
  } = useSessionContext();
  const { id } = useParams();
  const navigate = useNavigate();

  //Every time the component mounts, fetch the post
  useEffect(
    function () {
      if (id) {
        fetchPost(id);
      }
    },
    [id]
  );

  async function onClaimDonation() {
    try {
      await claimDonation(selectedPost.post_id, user.user_metadata.user_name);
      onClosePost();
      navigate(`/past-donations/${selectedPost.post_id}/messages`);
    } catch (error) {
      console.error(error.message);
    }
  }

  if (isLoadingSinglePost || !selectedPost) {
    return <Spinner />;
  }
  return (
    <Modal
      onClose={() => {
        navigate("/feed");
        onClosePost();
      }}
    >
      <h2 className="mb-2 text-lg font-bold">{selectedPost.title}</h2>
      <div className="p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange">
        <p className="mb-4 text-gray-700">{selectedPost.description}</p>
        <div className="flex gap-3">
          <div className="p-2 mb-4 border border-gray-500 rounded-sm">
            <h3 className="text-sm">Posted on:</h3>
            <FontAwesomeIcon icon={faCalendar} className="" />{" "}
            <span>
              {new Date(selectedPost.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <div className="relative flex items-center p-2 mb-4 border border-gray-500 rounded-sm">
            <h3 className="text-sm">Posted by: </h3>
            {selectedPost.profiles.organization_name}
          </div>
          <div className="flex items-center p-2 mb-4 border border-gray-500 rounded-sm">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
            <div>Available</div>
          </div>
        </div>
      </div>

      {user.user_metadata.role === "recipient" && (
        <div className="flex justify-center">
          <Button
            className="font-bold text-white rounded bg-orange hover:bg-[#E37410]"
            onClick={onClaimDonation}
          >
            Claim Donation
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default ActiveDetailedCardView;
