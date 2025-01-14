import { NavLink, useNavigate } from "react-router";
import "../styles/Navbar.css";

export default function Navbar() {
    const token = localStorage.getItem("token");
    const isLogin = token ? true : false;

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <NavLink className="logo" to="/">Personal Blog</NavLink>
            <div className="links">
                {
                    isLogin ? (
                        <>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="login-button">Login</NavLink>
                        </>
                    )
                }
            </div>
        </nav>
    )
}