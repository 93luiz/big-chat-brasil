import { useEffect, useState } from "react";
import ConversationListItem from "./conversation_list_item";
import { useParams } from "react-router-dom";

export default function ConversationList() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch("/api/conversation")
            .then((res) => res.json())
            .then((data) => setConversations(data.data))
            .catch(() => setConversations(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (conversations.length === 0) return <p>Nenhuma conversa encontrada</p>;

    return (
        <div className="list-group">
            {conversations.map((conversation) => (
                <ConversationListItem key={conversation.id} conversation={conversation} active={id == conversation.id} />
            ))}
        </div>
    );
}