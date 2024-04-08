import supabase from "../../../config/supabaseClient";

// Returns all donation_post tuples from the database
export async function getAllPosts() {
  const { data: posts, error } = await supabase
    .from("donation_post")
    .select("*,profiles:posted_by (organization_name)")
    .is("claimed_by", null);

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

// This retrieves all the past donations in relations to the user.
export async function retrieveClaimedDonations(user) {
  let claimedDonationList;
  let errorMessage;

  // if the user is a donor, then do a specific query, other user is a recipient, then a specific query.
  if (user.user_metadata.role === "donor") {
    const { data, error } = await supabase
      .from("donation_post")
      .select("*,profiles:posted_by (organization_name)")
      .eq("posted_by", `${user.user_metadata.user_name}`)
      .neq("claimed_by", null);
    claimedDonationList = data;
    errorMessage = error;
  } else {
    const { data, error } = await supabase
      .from("donation_post")
      .select("*,profiles:posted_by (organization_name)")
      .eq("claimed_by", `${user.user_metadata.user_name}`);
    claimedDonationList = data;
    errorMessage = error;
  }
  if (errorMessage) {
    throw new Error("Unable to retrieve Claimed Donations from database");
  } else return claimedDonationList;
}
