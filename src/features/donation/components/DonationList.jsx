import DonationCard from "./DonationCard";

function DonationList({ postsList, onSelectPost }) {
  // Load each Donation Card using attributes from the PostgresSQL database
  return (
    <div>
      {postsList.map((post) => (
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
