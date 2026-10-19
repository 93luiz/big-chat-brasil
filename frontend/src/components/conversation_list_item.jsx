import { Link } from "react-router-dom";
import { formatRelative } from "../functions/formatRelative";
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
                    {formatRelative(new Date(conversation.updated_at))}
                </small>
            </div>
            <p>
                {conversation.last_message ? <small>{conversation.last_message}</small> : null}
            </p>
        </Link>
    );
}