import { NavLink } from "react-router"
import "../styles/Home.css"
export default function Home() {
    return (
        <div className="home">
            <h1>Welcome to <span className="logo">Expense Tracker</span></h1>

            <p>
                Take control of your <span className="highlight">finances</span> effortlessly with <span className="highlight">Expense Tracker</span>! Log your <span className="highlight">spending</span>, categorize <span className="highlight">expenses</span>, and visualize your <span className="highlight">financial habits</span> with intuitive charts. Stay <span className="highlight">organized</span>, set <span className="highlight">goals</span>, and make <span className="highlight">informed decisions</span>—all in one app.
            </p>

            <NavLink to="/dashboard">Get Started</NavLink>
        </div>
    )
}