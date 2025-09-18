import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state while checking session

  // Check if user is already logged in when app starts
  useEffect(() => {
    // Get the current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Done checking session
    });

    // Listen for authentication changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Cleanup subscription when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  // Show loading while checking session
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* If user has session, redirect to home. If not, show signup */}
      <Route
        path="/sign-up"
        element={session ? <Navigate to="/" replace /> : <SignUp />}
      />

      {/* If user has session, redirect to home. If not, show login */}
      <Route
        path="/login"
        element={
          session ? (
            <Navigate to="/" replace />
          ) : (
            <Login setSession={setSession} />
          )
        }
      />
      {/* Protected Home route - only accessible if user has session */}
      <Route
        index
        element={
          session ? (
            <Home session={session} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
