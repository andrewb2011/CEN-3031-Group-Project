import supabase from "../../../config/supabaseClient";

async function signIn(userData) {
  return supabase.auth.signInWithPassword({ ...userData });
}

async function signUp(userData) {
  return supabase.auth.signUp({ ...userData });
}

async function signOut() {
  return supabase.auth.signOut();
}

async function getSession() {
  return supabase.auth.getSession();
}

export { signIn, signUp, signOut, getSession };
