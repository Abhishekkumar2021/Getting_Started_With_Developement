import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import PieData from '../types/pie.type';
import "../styles/Summary.css"

const BASE_URL = "http://localhost:8080";

export default function Summary() {
    const [summaryData, setSummaryData] = useState<PieData[]>([])

    useEffect(() => {
        async function fetchCategorySummary() {
            try {
                const response = await fetch(`${BASE_URL}/summary/categories`, {
                    method: "GET",
                });

                const { message, data } = await response.json();

                console.log(message, data);

                const series: PieData[] = []
                let idx = 0;
                for (const key in data) {
                    series.push({
                        id: idx,
                        value: data[key],
                        label: key
                    })
                    idx++;
                }

                setSummaryData(series);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategorySummary()
    }, [])
    return (
        <div className="summary">
            <PieChart
                colors={["pink", "lightgreen"]}
                series={[
                    {
                        data: summaryData
                    },
                ]}
                width={600}
                height={300}
            />
        </div>
    )
}