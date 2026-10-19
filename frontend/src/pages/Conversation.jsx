import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ConversationList from "../components/conversation_list";
import MessageList from "../components/message_list";
import ComposeMessage from "../components/compose_message";

export default function Conversation() {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async () => {
    const res = await fetch(`/api/conversation/${id}/message`);
    if (!res.ok) return [];
    const body = await res.json();
    return body.data ?? [];
  }, [id]);

  useEffect(() => {
    let ignore = false;
    setMessages([]);
    setConversation(null);

    fetchMessages()
      .then((list) => { if (!ignore) setMessages(list) })
      .catch(() => {});
    
    fetch(`/api/conversation/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (!ignore) setConversation(data); })
      .catch(() => {});

    return () => { ignore = true; };
  }, [id, fetchMessages]);

  const handleMessageSent = () => fetchMessages().then((list) => setMessages(list));

  return (
    <main className="container-fluid h-100 p-0">
      <div className="row h-100 g-0">
        <div className="d-none d-md-block col-md-5 col-lg-4 col-xl-3 overflow-y-scroll">
          <ConversationList />
        </div>
        <div className="col-12 col-md-7 col-lg-8 col-xl-9 d-flex flex-column border-start">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid justify-content-start">
              <Link to="/conversations" className="d-md-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg>
              </Link>
              <span className="navbar-brand mb-0 h1 ms-2">{conversation?.title}</span>
            </div>
          </nav>
          <MessageList messages={messages} />
          <ComposeMessage id={id} onMessageSent={handleMessageSent} />
        </div>
      </div>
    </main>
  );
}