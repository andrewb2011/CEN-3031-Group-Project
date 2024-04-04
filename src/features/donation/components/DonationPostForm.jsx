import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import supabase from "../../../config/supabaseClient";
import { InputField } from "../../../components/ui/InputField";
import { useState } from "react";

async function PostDonation(event, user, title, description){

    const {error} = await supabase.from("donation_post").insert([
        {posted_by: `${user.user_metadata.user_name}`,
        title: `${title.target.value}`,
        description: `${description.target.value}`
    }])
    
}
function DonationPostForm({user, showForm}){
    const [titleState, setTitleState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");

    return(
        <div>
            <Modal onClose={showForm} className="mw-1000">
                <form className="flex flex-col" >
                    <label>Title</label>
                    <InputField onChange={(e) => setTitleState(e)}></InputField>
                    <label>Description </label>
                    <textarea type="text" className="w-100 h-96 border rounded p-1 outline-none border-solid border-[#808080]" 
                    onChange={(e) => setDescriptionState(e)} ></textarea>
                    <button className="font-bold text-white rounded bg-orange hover:bg-[#E37410] mt-5" type="submit" onClick={(e) => {PostDonation(e, user, titleState, descriptionState)}}>
                        Submit
                    </button>   
                </form>
            </Modal>
        </div>
        );
}

export default DonationPostForm;