import getAllPosts from "../features/authentication/services/donationPostService";
import DonationCard from "../components/ui/DonationCard";
import Modal from "../components/ui/Modal";
import { useEffect } from "react";
import { useState } from "react";

function DonationList({ user }) {
  const [postList, setPostListState] = useState([]);
  let donationCards = [];

  // Get all donation_post tuples
  useEffect(() => {
    (async () => {
      setPostListState(await getAllPosts());
    })();
  }, []);

  // Load each Donation Card using attributes from the PostgresSQL database
  for (let i = 0; i < postList.length; i++) {
    donationCards.push(
      <DonationCard
        title={postList[i]["title"]}
        description={postList[i]["description"]}
        userRole={user.user_metadata.role}
      />,
    );
  }

  return <div>{donationCards}</div>;
}

function Feed({ user }) {
  console.log(user);
  return (
    <div className="mx-64 mt-5 font-robotoslab">
      <div className="flex flex-row">
        <button className="h-10 w-60 rounded bg-orange font-bold text-white">
          New Post
        </button>
        <label className="self-end pl-10">
          <input className="mr-2" type="checkbox" />
          Show My Posts
        </label>
      </div>
      <DonationList user={user} />
    </div>
  );
}

export default Feed;
