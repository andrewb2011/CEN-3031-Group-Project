import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

// Card seen in "Feed" and "View Past Donation" lists
function DonationCard({ title, description, userRole }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isModalOpen) {
    return (
      <Modal onClose={closeModal}>
        <h2>{title}</h2>
        <p>{description}</p>
        {userRole === "recipient" && <Button>Claim Donation</Button>}
      </Modal>
    );
  }
  console.log(userRole);
  return (
    <div className="mt-5 flex flex-col rounded-3xl bg-white bg-contain pb-5 pt-2">
      <div className="pl-10 pt-5">
        <p className="text-wrap font-bold">{title}</p>
      </div>
      <div className="text-wrap px-10">
        <p>{description}</p>
      </div>
      <button
        className="mr-10 w-24 self-end rounded bg-orange font-bold text-white"
        onClick={openModal}
      >
        View More
      </button>
      {/*<Modal isOpen={isModalOpen} onClose={closeModal} title={props.title} description={props.description}>*/}
    </div>
  );
}

export default DonationCard;
