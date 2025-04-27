// frontend/src/components/AgentPrompt.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function AgentPrompt() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const sessionId = "test-session"; // static for now, or make it a prop

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        const session = await supabase.auth.getSession();
        const accessToken = session.data.session?.access_token;

        if (!accessToken) {
            console.error("No access token found");
            return;
        }

        try {
            const res = await fetch(`http://172.18.0.2:8001/api/sessions/${sessionId}/agent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    query,
                }),
            });

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error("Error sending prompt:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>💬 Send Agent Prompt</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask something..."
                    style={{ padding: "0.5rem", width: "60%" }}
                />
                <button type="submit" disabled={loading} style={{ marginLeft: "0.5rem" }}>
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>

            {response && (
                <div style={{ marginTop: "1rem" }}>
                    ✅ <strong>Agent response sent successfully.</strong>
                </div>
            )}
        </div>
    );
}
