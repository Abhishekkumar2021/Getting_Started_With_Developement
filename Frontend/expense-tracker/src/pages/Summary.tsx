import SummaryByCategory from "../components/SummaryByCategory"
import SummaryByMonths from "../components/SummaryByMonths"
import SummaryByYears from "../components/SummaryByYears"
import "../styles/Summary.css"

export default function Summary() {
    return (
        <div className="summary">
            <SummaryByCategory />
            <SummaryByYears />
            <SummaryByMonths />
        </div>
    )
}