import { formatChatDate } from "../functions/formatChatDate";
import MessageBubble from "./message_bubble";


export default function MessageList({ messages }) {
  if (!messages || messages.length === 0) return <div className="bg-body-secondary m-0 px-4 py-2 flex-fill"><p>Nenhuma mensagem encontrada</p></div>;
  
  const dateOnly = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });

  let byDate = {};
  for (const message of messages) {
    console.log(message);
    const date = formatChatDate(message.created_at);
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(message);
  }

  return (
    <ul style={{listStyleType: "none"}} className="bg-body-secondary m-0 px-4 py-2 flex-fill">
        {Object.entries(byDate).map(([date, messages]) => <>
          <li key={date} className="text-center mb-3"><span class="badge text-bg-secondary">{date}</span></li>
          {messages.map((message) => <li key={message.id}><MessageBubble message={message} /></li>)}
        </>)}
    </ul>
  );
}