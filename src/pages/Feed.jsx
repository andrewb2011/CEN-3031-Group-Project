import { useEffect, useState } from "react";
import DonationList from "../features/donation/components/DonationList";
import DonationPostForm from "../features/donation/components/DonationPostForm";
import {
  getAllPosts,
  subscribeToAllDonationChanges,
} from "../features/donation/services/donationPostService";
import ActiveDetailedCardView from "../features/donation/components/ActiveDetailedCardView";
import Spinner from "../components/ui/Spinner";

function Feed({ user }) {
  const [postsList, setPostListState] = useState([]);
  const [showFormState, setShowFormState] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onSelectPost(postId) {
    setSelectedPost(postsList.find((post) => post.post_id === postId));
  }

  // Get all donation_post tuples after mount
  useEffect(function () {
    (async () => {
      try {
        setIsLoading(true);
        setPostListState(await getAllPosts());
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  //Subscribe to donation_post changes
  useEffect(function () {
    function handleSubscriptionEvent(event) {
      if (event.eventType == "INSERT") {
        setPostListState((state) => [...state, event.new]);
      } else if (event.eventType == "UPDATE" && event.new.claimed_by != null) {
        //When a tuple gets claimed, we're actually removing it from lists of posts that are displayed on the feed
        setPostListState((state) =>
          state.filter((post) => {
            if (post.post_id !== event.new.post_id) return post;
          })
        );
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

  if (isLoading) return <Spinner />;

  return (
    <div className=" mt-5 mb-5 w-[900px] mx-auto font-robotoslab">
      {showFormState && (
        <DonationPostForm
          user={user}
          showForm={() => setShowFormState(!showFormState)}
        />
      )}
      {selectedPost && (
        <ActiveDetailedCardView
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          user={user}
        />
      )}

      {user.user_metadata.role === "donor" && (
        <div className="flex items-center justify-end w-full gap-5">
          <button
            className="h-10 text-white rounded w-36 bg-orange hover:bg-[#E37410] hover:font-bold hover:text-lg"
            onClick={() => {
              setShowFormState(!showFormState);
            }}
          >
            Create a Post
          </button>

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
      <DonationList postsList={filteredPosts} onSelectPost={onSelectPost} />
    </div>
  );
}

export default Feed;
