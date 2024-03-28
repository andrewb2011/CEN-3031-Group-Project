import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

// Card seen in "Feed" and "View Past Donation" lists
function DonationCard({ postId, title, description, onSelectPost }) {
  return (
    <div className="flex flex-col pt-2 pb-5 mt-5 bg-white bg-contain rounded-3xl">
      <div className="pt-5 pl-10">
        <p className="font-bold text-wrap">{title}</p>
      </div>
      <div className="px-10 text-wrap">
        <p>{description}</p>
      </div>
      <button
        className="self-end w-24 mr-10 font-bold text-white rounded bg-orange"
        onClick={() => onSelectPost(postId)}
      >
        View More
      </button>
    </div>
  );
}

export default DonationCard;
