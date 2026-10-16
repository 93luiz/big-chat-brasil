import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <div className="d-flex flex-column vh-100">
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3 d">
            <span className="navbar-brand">BCB</span>
            <div className="navbar-nav d-flex flex-fill">
                {user && <NavLink to="/conversations" className="nav-link">Conversations</NavLink>}
                {user && <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-auto">Logout</button>}
            </div>
        </nav>

        <main className="container-fluid p-0 flex-fill">
            <Outlet />
        </main>
        </div>
    );
}