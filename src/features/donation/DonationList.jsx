import { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import getAllPosts from "../authentication/services/donationPostService";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

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
      setPostListState(await getAllPosts());
    })();
  }, []);

  // Load each Donation Card using attributes from the PostgresSQL database
  return (
    <div>
      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.description}</p>
          {user.user_metadata.role === "recipient" && <Button>Claim</Button>}
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
