import { useEffect, useState } from "react";
import ConversationList from "../components/conversation_list";

export default function Conversations() {
  return (
    <main className="container-fluid h-100">
      <div className="row h-100 ">
        <div className="col-12 col-md-5 col-lg-4 col-xl-3 overflow-y-scroll">
          <ConversationList />
        </div>
        <div className="d-none d-md-block col-md-7 col-lg-8 col-xl-9 bg-body-secondary d-flex flex-column border-start">
          <p className="text-center">Selecione uma conversa ao lado</p>
        </div>
      </div>
    </main>
  );
}