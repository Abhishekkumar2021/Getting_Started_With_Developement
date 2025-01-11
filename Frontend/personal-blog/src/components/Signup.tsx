import { MouseEvent, useRef, useState } from "react";
import "../styles/Signup.css";
import { NavLink } from "react-router";

export default function Signup() {
    // References for each input field
    const usernameRef = useRef<HTMLInputElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // State for error message
    const [error, setError] = useState<string | null>(null);

    function clearError() {
        setTimeout(() => {
            setError(null);
        }, 3000);
    }

    async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const username = usernameRef.current?.value;
        const name = fullNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!username || !name || !email || !password || !confirmPassword) {
            setError("All fields are required!");
            clearError();
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            clearError();
            return;
        }

        const jsonString = JSON.stringify({
            username,
            name,
            email,
            password
        });

        // Send a POST request to the server
        try {
            const BASE_URL = "http://localhost:8080";
            await fetch(`${BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonString
            })

            // Navigate to Dashboard
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again later.");
            clearError();
        }
    }

    return (
        <div className="signup">
            <div className="container">
                <h1>Sign Up</h1>
                {
                    error && <p className="error">{error}</p>
                }
                <form>
                    <input type="text" placeholder="Username" ref={usernameRef} required />
                    <input type="text" placeholder="Full Name" ref={fullNameRef} required />
                    <input type="email" placeholder="Email" ref={emailRef} required />
                    <input type="password" placeholder="Password" ref={passwordRef} required />
                    <input type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </form>

                <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
            </div>
        </div>
    )
}