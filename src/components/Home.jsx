import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";

const Home = ({ session }) => {
  useEffect(() => {
    console.log(session);
  }, []);
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 mt-8">
        <h1>
          Hello, {session.user.user_metadata?.name || session.user.email}!
        </h1>
        <p>
          Created Date:{" "}
          <span className="font-bold">
            {session.user.created_at.split("T")[0]}
          </span>
        </p>
        <p>
          User Email: <span className="font-bold">{session.user.email}</span>
        </p>
        <button
          onClick={handleSignOut}
          className="bg-purple-500  cursor-pointer text-white p-2 rounded hover:bg-purple-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
