import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./src/pages/Home";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import { useState, useEffect } from "react";
import supabase from "./src/config/supabaseClient";

function App() {
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
      setSession(session);
    });

    // call unsubscribe to make sure authentication event listener doesn't keep running after unmount
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    //do we want to navigate users directly to the login screen after logging out or another page?
    //navigate("<insert page route here>")
  }

  return (
    <div>
      <nav>{session && <button onClick={handleLogout}>Logout</button>}</nav>
      <BrowserRouter>
        <Routes>
          {/* Redirect users to login if they do not specify any routes */}
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protect the routes below */}
          <Route
            path="/home"
            element={
              loadingSessionData ? (
                <p>Loading Spinner goes here</p>
              ) : session !== null ? (
                <Home />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
