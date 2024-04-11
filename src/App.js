import AnalyticsChart from "./components/AnalyticsChart";
import Filters from "./components/Filters";

import "./App.css";
import { logout } from "./slices/authSlice";

function App() {
    return (
        <div>
            <Filters />
            <AnalyticsChart />
            <button
                className="border-4 border-solid border-red-500 rounded-md p-1 mx-12"
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default App;
