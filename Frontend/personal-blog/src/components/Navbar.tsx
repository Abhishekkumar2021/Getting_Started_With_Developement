import { NavLink } from "react-router";
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="logo" to="/">Personal Blog</NavLink>
            <div className="links">
                <NavLink to="/login">Login</NavLink>
            </div>
        </nav>
    )
}