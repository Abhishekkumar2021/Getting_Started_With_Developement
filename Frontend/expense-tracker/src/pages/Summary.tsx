import SummaryByCategory from "../components/SummaryByCategory"
import "../styles/Summary.css"

export default function Summary() {
    return (
        <div className="summary">
            <SummaryByCategory />
            <SummaryByCategory />
            <SummaryByCategory />
            <SummaryByCategory />
            <SummaryByCategory />
        </div>
    )
}