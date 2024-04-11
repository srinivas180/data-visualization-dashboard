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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFilterParams } from "../contexts/FilterParamsContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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

const API_ENDPOINT =
    "https://5ebc17ae-68ec-47c7-a6d7-bb98371e531e-00-2wfysx6t421uu.spock.replit.dev";

let cancelTokenSource;

function AnalyticsChart() {
    const { age, gender, fromDate, toDate } = useFilterParams();
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
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    async function fetchData(queryParams) {
        if (queryParams !== "" && !isLoggedIn) {
            navigate(`/login?${queryParams}`);
        } else {
            if (typeof cancelTokenSource != typeof undefined) {
                cancelTokenSource.cancel(
                    "Operation canceled due to new request."
                );
            }

            cancelTokenSource = axios.CancelToken.source();

            try {
                const response = await axios.get(
                    `${API_ENDPOINT}/totalTimeSpent/${
                        queryParams !== "" ? `?${queryParams}` : ""
                    }`,
                    {
                        cancelToken: cancelTokenSource.token,
                        headers: {
                            "x-auth-token": localStorage.getItem("token"),
                        },
                    }
                );
                setAnalyticsData(response.data);
            } catch (error) {
                // toast.error("Failed to fetch analytics data.", {
                //     position: "bottom-right",
                // });
            }
        }
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

        if (element[0]) {
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
    }

    return (
        <div className="relative flex flex-row flex-wrap h-[500px] w-full md:w-[700px]">
            <Bar
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
