import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Conversations from "./pages/Conversations.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Conversation from "./pages/Conversation.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/conversations/:id" element={<Conversation />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
