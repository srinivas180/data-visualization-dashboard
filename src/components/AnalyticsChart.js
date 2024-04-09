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
import FeatureTrend from "./FeatureTrend";
import { useSearchParams } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    maintainAspectRatio: false,
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
    responsive: false,
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

const API_ENDPOINT =
    "https://5ebc17ae-68ec-47c7-a6d7-bb98371e531e-00-2wfysx6t421uu.spock.replit.dev";

function AnalyticsChart({ age, gender, fromDate, toDate }) {
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
    const [feature, setFeature] = useState();
    const [showLineChart, setShowLineChart] = useState(false);
    const [activeElement, setActiveElement] = useState(-1);
    const chartRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();

    async function fetchData(queryParams) {
        const response = await fetch(
            `${API_ENDPOINT}/totalTimeSpent/${
                queryParams !== "" ? `?${queryParams}` : ""
            }`
        );
        const data = await response.json();
        setAnalyticsData(data);
    }

    useEffect(() => {
        fetchData(searchParams.toString());
    }, [searchParams, age, gender, fromDate, toDate]);

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

    async function handleBarElementClick(e) {
        const element = getElementAtEvent(chartRef.current, e);

        if (element[0].index === activeElement) {
            setBackgroundColor((backgroundColor) =>
                backgroundColor.map((color) => "rgba(255, 99, 132, 0.5)")
            );
            setActiveElement(-1);
            setShowLineChart(false);
        } else {
            setShowLineChart(true);
            setActiveElement(element[0].index);
            setBackgroundColor((backgroundColor) =>
                backgroundColor.map((color, index) => {
                    if (index === element[0].index) {
                        return "red";
                    }
                    return "rgba(255, 99, 132, 0.5)";
                })
            );
            backgroundColor[element[0].index] = "red";

            setFeature(labels[element[0].index]);
        }
    }

    return (
        <div className="flex flex-wrap">
            <Bar
                width={700}
                height={500}
                ref={chartRef}
                options={options}
                data={data}
                onClick={handleBarElementClick}
            />
            {showLineChart && (
                <FeatureTrend
                    searchParams={searchParams}
                    feature={feature}
                    API_ENDPOINT={API_ENDPOINT}
                />
            )}
        </div>
    );
}

export default AnalyticsChart;
