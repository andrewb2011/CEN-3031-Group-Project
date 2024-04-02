import supabase from "../../../config/supabaseClient";

// Returns all donation_post tuples from the database
export async function getAllPosts() {
  const { data: posts, error } = await supabase
    .from("donation_post")
    .select("*,profiles:posted_by (organization_name)");

  if (error) {
    throw new Error(
      "Unable to fetch information information about donation posts"
    );
  } else {
    return posts;
  }
}
