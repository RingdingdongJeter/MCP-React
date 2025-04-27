import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function MessageViewer() {
    const [messages, setMessages] = useState(null);
    const [error, setError] = useState(null);
    const sessionId = "test-session"; // 🔧 Replace or make dynamic

    useEffect(() => {
        const fetchMessages = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const token = session?.access_token;

            if (!token) {
                setError("No access token found. Are you logged in?");
                return;
            }

            try {
                const res = await fetch(`http://172.18.0.2:8001/⁠api/sessions/${sessionId}/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
                }

                const json = await res.json();
                setMessages(json);
            } catch (err) {
                setError(err.message);
                alert(err.message);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div style={{ padding: "1rem" }}>
            <h2>🧠 Conversation Messages</h2>
            {error && <p style={{ color: "red" }}>❌ {error}</p>}
            {messages ? (
                <pre style={{ background: "#f4f4f4", padding: "1rem" }}>
                    {JSON.stringify(messages, null, 2)}
                </pre>
            ) : (
                !error && <p>Loading messages...</p>
            )}
        </div>
    );
}
