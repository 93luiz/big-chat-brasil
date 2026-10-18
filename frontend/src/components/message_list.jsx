import { useEffect, useState } from "react";
import MessageBubble from "./message_bubble";
import { useAuth } from "../auth/AuthProvider";


export default function MessageList({ id }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
      fetch("/api/conversation/"+id+"/message")
          .then((res) => res.json())
          .then((data) => {
            if (!data || !data.data) return null;
            const indexedMessages = Object.fromEntries(data.data.map((obj) => [obj.id, obj]));
            const messages = Object.values(indexedMessages);
            return setMessages(messages);
          })
          .catch(() => setMessages(null))
          .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!messages || messages.length === 0) return <p>Nenhuma mensagem encontrada</p>;

  return (
    <ul style={{listStyleType: "none", padding: "0 16px"}}>
        {messages.map((message) => <li key={message.id}><MessageBubble message={message} /></li>)}
    </ul>
  );
}