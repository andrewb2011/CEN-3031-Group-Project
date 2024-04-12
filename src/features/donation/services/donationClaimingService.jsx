import supabase from "../../../config/supabaseClient";

async function ClaimDonation(postId, username) {
        console.log("claimed ", postId, " ", username);

        // Try to update the post with postId with claimed_by == username
        try {
            const { claimError } = await supabase
            .from("donation_post")
            .update(
                {
                    claimed_by: `${username}`,
                    claimed_at: `${(new Date()).toISOString()}`
                }
            )
            .eq("post_id", postId);

            if (claimError) {
                throw new Error(claimError);
            }
        }
        catch (e) {
            console.error(e);
        }

        // Try to insert a new thread after a post has been claimed
        try {
            const { threadError } = await supabase
            .from("threads")
            .insert(
                {
                    post_id: `${postId}`
                }
                );
            if (threadError) {
                throw new Error(threadError);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

export default ClaimDonation;