import { useEffect, useState } from "react";
import DonationList from "../features/donation/components/DonationList";
import { subscribeToAllDonationChanges } from "../features/donation/services/donationPostService";
import Spinner from "../components/ui/Spinner";
import { Link, Outlet } from "react-router-dom";
import { useSessionContext } from "../contexts/SessionContext";
import { usePostsContext } from "../features/donation/contexts/PostsContext";

function Feed() {
  const {
    session: { user },
  } = useSessionContext();
  const {
    postsList,
    isLoadingPosts,
    fetchActiveDonations,
    insertPost,
    deletePost,
  } = usePostsContext();
  const [showFormState, setShowFormState] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);

  // Get all donation_post tuples after mount
  useEffect(function () {
    fetchActiveDonations();
  }, []);

  //Subscribe to donation_post changes
  useEffect(function () {
    function handleSubscriptionEvent(event) {
      if (event.eventType == "INSERT") {
        insertPost(event.new);
      } else if (event.eventType == "UPDATE" && event.new.claimed_by != null) {
        //When a tuple gets claimed, we're actually removing it from lists of posts that are displayed on the feed
        deletePost(event.new.post_id);
      }
    }

    const postSubscription = subscribeToAllDonationChanges(
      handleSubscriptionEvent
    );

    //When the component unmounts, the user unsubscribed from donation_post updates
    return () => postSubscription.unsubscribe();
  }, []);

  const filteredPosts = showMyPosts
    ? postsList
        .filter((post) => post.posted_by === user.user_metadata.user_name)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : postsList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (isLoadingPosts) return <Spinner />;

  return (
    <div className=" mt-5 mb-5 w-[900px] mx-auto font-robotoslab">
      <Outlet />
      {user.user_metadata.role === "donor" && (
        <div className="flex items-center justify-end w-full gap-5">
          <Link
            to="make-post"
            className=" text-white rounded p-2 bg-orange hover:bg-[#E37410] hover:font-bold hover:text-lg"
          >
            Make a Post
          </Link>
          <div>
            <label className="mr-3">View My Posts</label>
            <input
              type="checkbox"
              value={showMyPosts}
              onChange={() => setShowMyPosts((state) => !state)}
            />
          </div>
        </div>
      )}
      <DonationList postsList={filteredPosts} />
    </div>
  );
}

export default Feed;
