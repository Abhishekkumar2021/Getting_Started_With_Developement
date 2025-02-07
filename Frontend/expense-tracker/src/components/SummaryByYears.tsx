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
import "../styles/SummaryByYear.css"

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
            text: 'Summary By Years',
        },
    },
};

export default function SummaryByYears() {
    const [summary, setSummary] = useState({})

    useEffect(() => {
        async function getSummary() {
            const response = await fetch(`${BASE_URL}/summary/years`)
            const { data } = await response.json();
            console.log(data)
            setSummary(data)
        }

        getSummary()
    }, [])
    return (
        <section className="years-summary">
            <Bar options={options} data={{
                labels: Object.keys(summary),
                datasets: [
                    {
                        label: "Year wise summary",
                        data: Object.values(summary),
                        backgroundColor: "#19dd4f"
                    }
                ]
            }} />
        </section>
    )
}
