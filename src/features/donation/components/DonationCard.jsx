// Card seen in "Feed" and "View Past Donation" lists
function DonationCard({ postId, title, description, onSelectPost }) {
  return (
    <div className="flex flex-col pt-2 pb-5 mt-5 bg-white rounded-3xl">
      <p className="pt-5 pl-10 font-bold ">{title}</p>
      <div className="px-10 text-wrap">
        <p>{description}</p>
      </div>
      <button
        className="self-end w-24 p-1 mr-10 text-white rounded bg-orange hover:font-bold"
        onClick={() => onSelectPost(postId)}
      >
        View More
      </button>
    </div>
  );
}

export default DonationCard;
