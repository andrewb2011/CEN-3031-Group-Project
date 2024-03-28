import supabase from "../../../config/supabaseClient";

// Returns all donation_post tuples from the database
async function getAllPosts(){
    const {data: posts, error: error} = await supabase.from("donation_post").select("*");
    return(posts)
}

export default getAllPosts;