import { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";

/**
 * A custom React hook for managing user authentication state using Supabase.
 * @returns {{
 *   session: import('@supabase/supabase-js').Session | null,
 *   loadingSessionData: boolean,
 *   handleLogout: () => Promise<void>
 * }} An object containing session data, loading state, and a logout function.
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  //important to initialize loadingSessionData to true since the session data is fetched after the component mounts.
  const [loadingSessionData, setLoadingSessionData] = useState(true);

  useEffect(() => {
    //When the App component mounts, it's possible that there is an already existing session. Check with supabase and initalize the React sesion state with result of auth.getSession(). This behavior ensures that the user's authentication status persists across page refreshes and accross browser sessions (e.g. users closes tab or browser and opens it again)
    supabase.auth.getSession().then(function (responseObj) {
      const {
        data: { session },
      } = responseObj;
      setSession(session);

      setLoadingSessionData(false);
    });

    //Sets up an even listener that listens for changes to authentication state. auth.onAuthStateChange will trigger the execution of the callback function whenever supabase detects a change in the user's authentication state. This is a type of user subscription
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      setSession(session);
    });

    // call unsubscribe to make sure authentication event listener doesn't keep running after unmount
    return () => data.subscription.unsubscribe();
  }, []);

  return [session, loadingSessionData];
}
