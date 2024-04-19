import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import supabase from "../../../config/supabaseClient";
import { useState } from "react";
import { useSessionContext } from "../../../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

function DonationPostForm() {
  const {
    session: { user },
  } = useSessionContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  async function PostDonation(event) {
    event.preventDefault();

    if (!title || !description) {
      alert("You must fill in both fields before submission.");
      return;
    }

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
      navigate("/feed");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div>
      <Modal onClose={() => navigate("/feed")} className="mw-1000">
        <h1 className="text-4xl text-center">Make a Post</h1>
        <form className="flex flex-col">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title here"
            className="border rounded p-1 outline-none border-solid border-[#808080]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            type="text"
            placeholder="Enter description here"
            className="w-100 h-80 border rounded p-1 outline-none border-solid border-[#808080]"
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
