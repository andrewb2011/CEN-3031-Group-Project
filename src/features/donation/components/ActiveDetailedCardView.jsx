import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import supabase from "../../../config/supabaseClient";

function ActiveDetailedCardView({ selectedPost, setSelectedPost, user }) {
  async function handleClaimDonation(event) {
    event.preventDefault();

    // these are for debugging
    if (user.user_metadata.organization_name)
      console.log(
        `${user.user_metadata.organization_name} is the name of the org`
      );
    else console.log("user organization name in undefined");

    try {
      const { data, error } = await supabase
        .from("donation_post")
        .update({
          claimed_by: `${user.user_metadata.organization_name}`,
          claimed_at: new Date(),
        })
        .eq("post_id", selectedPost.post_id);
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        console.log(data);
      }

      alert("Claimed donation successfully! Congratulations!");
      setSelectedPost(null);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(user);

  return (
    <Modal onClose={() => setSelectedPost(null)}>
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
            onClick={(e) => {
              handleClaimDonation(e);
            }}
          >
            Claim Donation
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default ActiveDetailedCardView;
