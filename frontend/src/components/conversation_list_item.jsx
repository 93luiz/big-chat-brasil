import { Link } from "react-router-dom";
export default function ConversationListItem({ conversation, active }) {
    return (
        <Link 
            key={conversation.id}
            to={`/conversations/${conversation.id}`}
            className={`list-group-item ${active ? 'active' : ''}`}
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
                {conversation.last_message ? <small>{conversation.last_message}</small> : null}
            </p>
        </Link>
    );
}