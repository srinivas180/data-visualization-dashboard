import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    indexAxis: "y",
    scales: {
        y: {
            title: {
                display: true,
                align: "center",
                text: "Features",
                color: "black",
                font: {
                    family: "Arial",
                    size: 14,
                },
                padding: {
                    top: 20,
                    bottom: 10,
                },
            },
        },
        x: {
            title: {
                display: true,
                align: "center",
                text: "Total Time Spent",
                color: "black",
                font: {
                    family: "Arial",
                    size: 14,
                },
                padding: {
                    top: 10,
                    bottom: 0,
                },
            },
        },
    },
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Data Visualization",
        },
        tooltip: {
            enabled: true,
        },
    },
};

function AnalyticsChart() {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [totalTimeSpent, setTotalTimeSpent] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState([
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 99, 132, 0.5)",
    ]);
    const chartRef = useRef();

    async function fetchData() {
        const response = await fetch(
            "https://5ebc17ae-68ec-47c7-a6d7-bb98371e531e-00-2wfysx6t421uu.spock.replit.dev/totalTimeSpent"
        );
        const data = await response.json();
        console.log(data);
        setAnalyticsData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setLabels(Object.keys(analyticsData));
        setTotalTimeSpent(
            Object.keys(analyticsData).map((key) => analyticsData[key])
        );
    }, [analyticsData]);

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: totalTimeSpent,
                backgroundColor: backgroundColor,
            },
        ],
    };

    function handleBarElementClick(e) {
        const element = getElementAtEvent(chartRef.current, e);
        setBackgroundColor((backgroundColor) =>
            backgroundColor.map((color, index) => {
                if (index === element[0].index) {
                    return "red";
                }
                return "rgba(255, 99, 132, 0.5)";
            })
        );
        console.log(element[0]);
        backgroundColor[element[0].index] = "red";
    }

    return (
        <Bar
            ref={chartRef}
            options={options}
            data={data}
            onClick={handleBarElementClick}
        />
    );
}

export default AnalyticsChart;
