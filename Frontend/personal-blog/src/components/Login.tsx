import { MouseEvent, useRef, useState } from "react";
import "../styles/Login.css";
import { NavLink, useNavigate } from "react-router";

export default function Login() {
    // References for each input field
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // State for error message
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    function clearError() {
        setTimeout(() => {
            setError(null);
        }, 3000);
    }

    async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username ||  !password) {
            setError("All fields are required!");
            clearError();
            return;
        }


        const jsonString = JSON.stringify({
            username,
            password
        });

        // Send a POST request to the server
        try {
            const BASE_URL = "http://localhost:8080";
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonString
            })

            const {message, data} = await response.json();

            if (response.status === 401) {
                setError(message);
                clearError();
                return;
            }
            
            // Save the token somewhere so that we can access it whenever we want
            localStorage.setItem("token", data);

            // Navigate to Dashboard
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again later.");
            clearError();
        }
    }

    return (
        <div className="login">
            <div className="container">
                <h1>Login</h1>
                {
                    error && <p className="error">{error}</p>
                }
                <form>
                    <input type="text" placeholder="Username" ref={usernameRef} required />
                    <input type="password" placeholder="Password" ref={passwordRef} required />
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>

                <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
            </div>
        </div>
    )
}