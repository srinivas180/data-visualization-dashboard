import AnalyticsChart from "./components/AnalyticsChart";
import Filters from "./components/Filters";

import "./App.css";
import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header />
            <Filters />
            <AnalyticsChart />
        </div>
    );
}

export default App;
