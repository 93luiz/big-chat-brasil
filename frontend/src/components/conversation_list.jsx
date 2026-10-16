import { useEffect, useState } from "react";
import ConversationListItem from "./conversation_list_item";

export default function ConversationList() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/conversation")
            .then((res) => res.json())
            .then((data) => setConversations(data.data))
            .catch(() => setConversations(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (conversations.length === 0) return <p>No conversations found.</p>;

    return (
        <ul className="list-group">
            {conversations.map((conversation) => (
                <ConversationListItem key={conversation.id} conversation={conversation} />
            ))}
        </ul>
    );
}