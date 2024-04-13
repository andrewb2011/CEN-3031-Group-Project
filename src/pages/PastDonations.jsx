import { useEffect } from "react";
import Spinner from "../components/ui/Spinner";
import DonationList from "../features/donation/components/DonationList";
import { Outlet } from "react-router-dom";
import { usePostsContext } from "../features/donation/contexts/PostsContext";

function PastDonations({ user }) {
  const { postsList, fetchPastDonations, isLoadingPosts, onSelectPost } =
    usePostsContext();

  // This gets all past_donation tuple related to user after mount
  useEffect(function () {
    fetchPastDonations(user);
  }, []);

  if (isLoadingPosts) return <Spinner />;

  return (
    <div className=" mt-5 mb-5 w-[900px] mx-auto font-robotoslab">
      <Outlet />
      <DonationList postsList={postsList} onSelectPost={onSelectPost} />
    </div>
  );
}

export default PastDonations;
