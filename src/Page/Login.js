import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "../lib/supabaseClient";
import { Auth } from "../components/Auth";
import { MessageViewer } from "../components/MessageViewer";
import { AgentPrompt } from "../components/AgentPrompt";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user on mount
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user){
        //navigate("/");
        //alert("您已登入!")
      }
    });

    // Subscribe to auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user){
        //navigate("/");
        //alert("恭喜您成功登入!")
      }
    });

    // Cleanup
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error.message);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔐 Supabase OAuth2 Demo</h1>

      {user ? (
        <>
          <p>✅ Logged in as: {user.email}</p>
          <button onClick={logout}>Logout</button>
          <hr />

          <MessageViewer />
          <AgentPrompt />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default Login;