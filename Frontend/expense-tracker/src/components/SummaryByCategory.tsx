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
import "../styles/SummaryBycategory.css"

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
            text: 'Summary By Categories',
        },
    },
};

export default function SummaryByCategory() {
    const [summary, setSummary] = useState({})
    const [monthsSummary, setMonthsSummary] = useState({})
    const [yearsSummary, setYearsSummary] = useState({})

    useEffect(() => {
        async function getSummary() {
            const response = await fetch(`${BASE_URL}/summary/categories`)
            const { data } = await response.json();
            console.log(data)
            setSummary(data)
        }
        async function getMonthsSummary() {
            const response = await fetch(`${BASE_URL}/summary/months`)
            const { data } = await response.json();
            console.log(data)
            setMonthsSummary(data)
        }

        async function getYearsSummary() {
            const response = await fetch(`${BASE_URL}/summary/years`)
            const { data } = await response.json();
            console.log(data)
            setYearsSummary(data)
        }

        getSummary()
        getMonthsSummary()
        getYearsSummary()
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
        "12": "Dec",
    }))
    return (
        <div>
            <section className="category-summary">
                <Bar options={options} data={{
                    labels: Object.keys(summary),
                    datasets: [
                        {
                            label: "Category wise summary",
                            data: Object.values(summary),
                            backgroundColor: "#19dd4f"
                        }
                    ]
                }} />
            </section>
            <section className="month-summary">
                <Bar options={options} data={{
                    labels: Object.keys(monthsSummary).map((key) => myMap.get(key)),
                    datasets: [
                        {
                            label: "Months wise summary",
                            data: Object.values(monthsSummary),
                            backgroundColor: "#19dd4f"
                        }
                    ]
                }} />
            </section>
            <section className="year-summary">
                <Bar options={options} data={{
                    labels: Object.keys(yearsSummary),
                    datasets: [
                        {
                            label: "Years wise summary",
                            data: Object.values(yearsSummary),
                            backgroundColor: "#19dd4f"
                        }
                    ]
                }} />
            </section>
        </div>
    )
}
