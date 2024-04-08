import { useEffect, useState } from "react";
import { retrieveClaimedDonations } from "../features/donation/services/donationPostService";
import Spinner from "../components/ui/Spinner";
import DonationList from "../features/donation/components/DonationList";
import PastDetailedCardView from "../features/donation/components/PastDetailedCardView";

function PastDonations({ user }) {
  const [pastList, setPastListState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  //console.log(pastList.length);
  //console.log(user);

  function onSelectPost(postId) {
    setSelectedPost(pastList.find((post) => post.post_id === postId));
  }

  // This gets all past_donation tuple related to user after mount
  useEffect(
    function () {
      (async () => {
        try {
          setIsLoading(true);
          setPastListState(await retrieveClaimedDonations(user));
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      })();
    },
    [user]
  );

  if (isLoading) return <Spinner />;

  return (
    <div className=" mt-5 mb-5 w-[900px] mx-auto font-robotoslab">
      {selectedPost && (
        //PastDetailedCardView
        <PastDetailedCardView
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          userRole={user.user_metadata.role}
        />
      )}
      <DonationList postsList={pastList} onSelectPost={onSelectPost} />
    </div>
  );
}

export default PastDonations;
