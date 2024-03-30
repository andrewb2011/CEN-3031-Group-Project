import { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import { getAllPosts } from "../services/donationPostService";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DonationList({ user }) {
  const [postList, setPostListState] = useState([]);
  //The selected post to view in the form of a modal is controlled by this piece of state
  const [selectedPost, setSelectedPost] = useState(null);

  function onSelectPost(postId) {
    setSelectedPost(postList.find((post) => post.post_id === postId));
  }

  // Get all donation_post tuples
  useEffect(() => {
    (async () => {
      try {
        setPostListState(await getAllPosts());
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  console.log(selectedPost);

  // Load each Donation Card using attributes from the PostgresSQL database
  return (
    <div>
      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <h2 className="mb-2 text-lg font-bold">{selectedPost.title}</h2>
          <div className="p-4 mb-4 bg-[#FAC710] bg-opacity-15 border rounded-lg border-orange">
            <p className="mb-4 text-gray-700">{selectedPost.description}</p>
            <div className="flex gap-3">
              <div className="p-2 mb-4 border border-gray-500 rounded-sm">
                <FontAwesomeIcon icon={faCalendar} className="" />{" "}
                {new Date(selectedPost.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="relative flex items-center p-2 mb-4 border border-gray-500 rounded-sm">
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
              <Button className="font-bold text-white rounded bg-orange hover:bg-[#E37410]">
                Claim Donation
              </Button>
            </div>
          )}
        </Modal>
      )}
      {postList.map((post) => (
        <DonationCard
          key={post.post_id}
          postId={post.post_id}
          title={post.title}
          description={post.description}
          onSelectPost={onSelectPost}
        />
      ))}
    </div>
  );
}

export default DonationList;
