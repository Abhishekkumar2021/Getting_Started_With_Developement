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

    const myMap = new Map(Object.entries({
        "1": "Jan",
        "2": "Feb",
        "3": "Mar",
        "4": "Apr",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "Aug",
        "9": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    }))

    return (
        <section className="months-summary">
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
