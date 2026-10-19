import { useEffect, useState } from "react";
import ConversationListItem from "./conversation_list_item";
import { useParams } from "react-router-dom";

export default function ConversationList({ onConversationSelected }) {
    const [conversations, setConversations] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch("/api/conversation")
            .then((res) => res.json())
            .then((data) => setConversations(data.data))
            .catch(() => setConversations(null))
    }, []);

    if (conversations.length === 0) return <p>Nenhuma conversa encontrada</p>;

    return (
        <div className="list-group px-2 pt-2">
            {conversations.map((conversation) => (
                <ConversationListItem 
                    key={conversation.id}
                    conversation={conversation}
                    active={id == conversation.id}
                    onConversationSelected={onConversationSelected}
                />
            ))}
        </div>
    );
}