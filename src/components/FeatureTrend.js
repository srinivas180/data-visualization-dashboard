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

function FeatureTrend({ featureTrendData, feature }) {
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

    return <Line options={featureTrendOptions} data={featureTrend} />;
}

export default FeatureTrend;
