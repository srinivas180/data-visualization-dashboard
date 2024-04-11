import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Zoom from "chartjs-plugin-zoom";
import { toast } from "react-toastify";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Zoom
);

export const featureTrendOptions = {
    options: {
        maintainAspectRatio: true,
        scales: {
            xAxes: [
                {
                    type: "time",
                    distribution: "linear",
                },
            ],
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
            text: "Time Spent Vs Days",
        },
        tooltip: {
            enabled: true,
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: "xy",
            },
            pan: {
                enabled: true,
                mode: "xy",
            },
        },
    },
};

function FeatureTrend({ feature, searchParams, API_ENDPOINT }) {
    const [featureTrendData, setFeatureTrendData] = useState([]);

    const dayLabels = featureTrendData.map((feature) => feature.Day);

    const featureTrendDataObjects = featureTrendData.map((featureTrend) => ({
        x: new Date(featureTrend.Day),
        y: featureTrend[feature],
    }));

    const featureTrend = {
        labels: dayLabels,
        datasets: [
            {
                label: "Feature Trend",
                data: featureTrendDataObjects,
                borderColor: "rgba(255, 99, 132, 0.5)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    useEffect(() => {
        async function fetchFeatureTrendData() {
            const queryParams = searchParams.toString();
            try {
                const response = await fetch(
                    `${API_ENDPOINT}/feature-trend/${feature}/${
                        queryParams !== "" ? `?${queryParams}` : ""
                    }`
                );
                const featureTrendData = await response.json();
                setFeatureTrendData(featureTrendData);
            } catch (error) {
                toast.error("Failed to fetch analytics data.", {
                    position: "bottom-right",
                });
            }
        }

        fetchFeatureTrendData();
    }, [searchParams, feature, API_ENDPOINT]);

    return (
        <Line
            width={700}
            height={500}
            options={featureTrendOptions}
            data={featureTrend}
        />
    );
}

export default FeatureTrend;
