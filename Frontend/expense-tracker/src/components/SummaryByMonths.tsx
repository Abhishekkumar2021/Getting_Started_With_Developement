import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { BASE_URL } from '../constants/constants';
import "../styles/SummaryByMonth.css"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Summary By Months',
        },
    },
};

export default function SummaryByMonths() {
    const [summary, setSummary] = useState({})

    useEffect(() => {
        async function getSummary() {
            const response = await fetch(`${BASE_URL}/summary/months`)
            const { data } = await response.json();
            console.log(data)
            setSummary(data)
        }
        getSummary()
    }, [])

    const myMap = new Map();
    myMap.set("1", "Jan")
    myMap.set("2", "Feb")
    myMap.set("3", "Mar")
    myMap.set("4", "Apr")
    myMap.set("5", "May")
    myMap.set("6", "June")
    myMap.set("7", "July")
    myMap.set("8", "Aug")
    myMap.set("9", "Sep")
    myMap.set("10", "Oct")
    myMap.set("11", "Nov")
    myMap.set("12", "Dec")


    return (
        <section className="Months-summary">
            <Bar options={options} data={{
                labels: Object.keys(summary).map((key) => myMap.get(key)),
                datasets: [
                    {
                        label: "Month wise summary",
                        data: Object.values(summary),
                        backgroundColor: "#19dd4f"
                    }
                ]
            }} />
        </section>
    )
}
