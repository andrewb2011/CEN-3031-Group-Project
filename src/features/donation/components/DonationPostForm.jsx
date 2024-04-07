import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import supabase from "../../../config/supabaseClient";
import { useState } from "react";

function DonationPostForm({ user, showForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function PostDonation(event) {
    event.preventDefault();
    try {
      const { error } = await supabase.from("donation_post").insert([
        {
          posted_by: `${user.user_metadata.user_name}`,
          title,
          description,
        },
      ]);

      if (error) {
        throw new Error(error);
      }

      alert("Donation Posted successfully!");
      showForm();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Modal onClose={showForm} className="mw-1000">
        <h1 className="text-4xl text-center">Make a Post</h1>
        <form className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            className="border-b-2 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            type="text"
            className="w-100 h-96 border rounded p-1 outline-none border-solid border-[#808080]"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <Button
            className="font-bold text-white rounded bg-orange hover:bg-[#E37410] mt-5"
            type="submit"
            onClick={(e) => {
              PostDonation(e);
            }}
          >
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default DonationPostForm;
