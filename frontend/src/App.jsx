import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Conversations from "./pages/Conversations.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

export default function App() {
  const [message, setMessage] = useState("Loading...");

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/conversations" element={<Conversations />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
