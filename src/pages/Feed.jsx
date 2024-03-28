import getAllPosts from '../features/authentication/services/donationPostService';
import DonationCard from '../components/ui/DonationCard';
import { useEffect } from 'react';
import { useState } from 'react';

function DonationList(){

    const [postList, setPostListState] = useState([])
    let donationCards = [];

    // Get all donation_post tuples
    useEffect(() => {
            (async () => {setPostListState(await getAllPosts())})();
    }, []);
    
    // Load each Donation Card using attributes from the PostgresSQL database
    for (let i = 0; i < postList.length; i++){
        donationCards.push(<DonationCard title={postList[i]["title"]} description={postList[i]["description"]} />)
    }
    
    return(
        <div>
            {donationCards}
        </div>
    ); 
}

function Feed(user){

    return(
        <div className="mx-64 mt-5 font-robotoslab">
            <div className="flex flex-row">
            <button className="h-10 font-bold text-white rounded w-60 bg-orange">New Post</button>
                <label className="self-end pl-10">
                    <input className="mr-2" type="checkbox"/> 
                    Show My Posts
                </label>
            </div>
        <DonationList />
        </div>
    );  
}

export default Feed;
