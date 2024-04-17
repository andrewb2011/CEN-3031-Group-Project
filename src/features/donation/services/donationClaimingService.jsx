import supabase from "../../../config/supabaseClient";

export async function claimDonation(postId, username) {
  // Try to update the post with postId with claimed_by == username

  const { error: claimError } = await supabase
    .from("donation_post")
    .update({
      claimed_by: `${username}`,
      claimed_at: `${new Date().toISOString()}`,
    })
    .eq("post_id", postId);

  if (claimError) {
    throw new Error(claimError.details);
  }

  // Try to insert a new thread after a post has been claimed
  const { error: threadError } = await supabase.from("threads").insert({
    post_id: `${postId}`,
  });
  if (threadError) {
    throw new Error(threadError.details);
  }
}
