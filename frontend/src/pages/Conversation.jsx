import { useParams } from "react-router-dom";
import ConversationList from "../components/conversation_list";
import MessageList from "../components/message_list";

export default function Conversation() {
  const { id } = useParams();

  return (
    <main className="container-fluid h-100">
      <div className="row h-100 ">
        <div className="d-none d-md-block col-md-5 col-lg-4 col-xl-3 overflow-y-scroll">
          <ConversationList />
        </div>
        <div className="col-12 col-md-7 col-lg-8 col-xl-9 bg-body-secondary d-flex flex-column justify-content-end">
          <MessageList id={id} />
        </div>
      </div>
    </main>
  );
}