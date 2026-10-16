export default function ConversationListItem({ conversation }) {
    return (
        <li key={conversation.id} className="list-group-item">
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
        </li>
    );
}