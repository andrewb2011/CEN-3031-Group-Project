import DonationList from "../features/donation/DonationList";

function Feed({ user }) {
  return (
    <div className="mx-64 mt-5 font-robotoslab ">
      <div className="flex flex-row">
        <button className="h-10 font-bold text-white rounded w-60 bg-orange">
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
