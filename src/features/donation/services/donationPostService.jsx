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

/**
 *Subscribes users to INSERT and UPDATE events for all entries in the donation_post table. Do not use this function for the Feed page. A new subscription function will need to be made
 * @param {function} eventHandler
 */
export function subscribeToAllDonationChanges(eventHandler) {
  const postSubscription = supabase
    .channel("custom-insert-update-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "donation_post",
      },
      eventHandler
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "donation_post",
      },
      eventHandler
    )
    .subscribe();

  return postSubscription;
}

export function subscribeToClaimedDonationChangesByUsername(username) {
  return null;
}
