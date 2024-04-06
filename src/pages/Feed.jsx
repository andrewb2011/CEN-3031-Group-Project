import { useEffect, useState } from "react";
import DonationList from "../features/donation/components/DonationList";
import DonationPostForm from "../features/donation/components/DonationPostForm";

function Feed({ user }) {
  
  const [showFormState, setShowFormState] = useState(false)

  return (
    <div className="mx-64 mt-5 mb-5 font-robotoslab ">

      {showFormState && (<DonationPostForm user={user} showForm={() => setShowFormState(!showFormState)}/>)}
      
      <div className="flex flex-row">
        {user.user_metadata.role === "donor" ? (
          <button className="h-10 text-white rounded w-60 bg-orange hover:bg-[#E37410] hover:font-bold hover:text-lg" 
          onClick={() => {setShowFormState(!showFormState)}}>
            New Post
          </button>
        ) : (
          ""
        )}
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
