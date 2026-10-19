import { Fragment } from "react/jsx-runtime";
import { formatChatDate } from "../functions/formatChatDate";
import MessageBubble from "./message_bubble";


export default function MessageList({ messages }) {
  if (!messages || messages.length === 0) return <div className="bg-body-secondary m-0 px-4 py-2 flex-fill"><p>Nenhuma mensagem encontrada</p></div>;

  let byDate = {};
  for (const message of messages) {
    const date = formatChatDate(message.created_at);
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(message);
  }

  return (
    <div className="bg-body-secondary m-0 px-4 py-2 flex-fill">
        {Object.entries(byDate).map(([date, messages]) => <Fragment key={date}>
          <div key={date} className="text-center mb-3"><span className="badge text-bg-secondary">{date}</span></div>
          {messages.map((message) => <div key={message.id}><MessageBubble message={message} /></div>)}
        </Fragment>)}
    </div>
  );
}