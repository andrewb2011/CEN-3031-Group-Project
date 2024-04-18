import supabase from "../../../config/supabaseClient";

export async function getUserByUsername(username) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_name", username)
    .single();

  if (error) throw new Error(error.details);

  return data;
}
