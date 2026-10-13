import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="d-flex flex-column vh-100">
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <span className="navbar-brand">BCB</span>
        <div className="navbar-nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
        </div>
      </nav>

      <main className="container flex-fill">
        <Outlet />
      </main>
    </div>
  );
}