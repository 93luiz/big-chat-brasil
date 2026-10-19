import { Link } from "react-router-dom";
export default function ConversationListItem({ conversation, active, onConversationSelected }) {
    return (
        <Link 
            key={conversation.id}
            to={`/conversations/${conversation.id}`}
            className={`list-group-item ${active ? 'active' : ''}`}
            onClick={onConversationSelected}
        >
            <div className="d-flex">
                <div>
                    {conversation.title}
                </div>
                <small className="ms-auto text-muted">
                    {new Date(conversation.created_at).toLocaleString()}
                </small>
            </div>
            <p>
                {conversation.lastMessage ? <small>{conversation.lastMessage}</small> : null}
            </p>
        </Link>
    );
}