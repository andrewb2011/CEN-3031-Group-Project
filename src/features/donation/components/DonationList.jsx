import DonationCard from "./DonationCard";
import PropTypes from "prop-types";

function DonationList({ postsList }) {
  // Load each Donation Card using attributes from the PostgresSQL database
  return (
    <div>
      {postsList.map((post) => (
        <DonationCard
          key={post.post_id}
          postId={post.post_id}
          title={post.title}
          description={post.description}
        />
      ))}
    </div>
  );
}

export default DonationList;

DonationList.propTypes = {
  postsList: PropTypes.arrayOf(
    PropTypes.shape({
      post_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
