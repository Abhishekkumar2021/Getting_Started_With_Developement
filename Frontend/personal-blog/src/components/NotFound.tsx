import "../styles/NotFound.css";
import { NavLink } from "react-router";

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404! Not Found</h1>
            <NavLink to="/">Go back to Home</NavLink>
        </div>
    )
}