// Card seen in "Feed" and "View Past Donation" lists
function DonationCard(props){
    return(
        <div className="flex flex-col pt-2 pb-5 mt-5 bg-white bg-contain rounded-3xl">
            <div className="pt-5 pl-10"><p className="font-bold text-wrap">{props.title}</p></div>
            <div className="px-10 text-wrap"><p>{props.description}</p></div>
            <button className="self-end w-24 mr-10 font-bold text-white rounded bg-orange">View More</button>
        </div>
    );
}

export default DonationCard;