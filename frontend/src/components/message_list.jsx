import MessageBubble from "./message_bubble";


export default function MessageList({ messages }) {
  if (!messages || messages.length === 0) return <div className="bg-body-secondary m-0 px-4 py-2 flex-fill"><p>Nenhuma mensagem encontrada</p></div>;

  console.log(messages);

  return (
    <ul style={{listStyleType: "none"}} className="bg-body-secondary m-0 px-4 py-2 flex-fill">
        {messages.map((message) => <li key={message.id}><MessageBubble message={message} /></li>)}
    </ul>
  );
}