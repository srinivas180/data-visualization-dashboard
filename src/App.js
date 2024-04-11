import AnalyticsChart from "./components/AnalyticsChart";
import Filters from "./components/Filters";

import "./App.css";
import { logout } from "./slices/authSlice";
import { useFilterParams } from "./contexts/FilterParamsContext";
import { useDispatch } from "react-redux";

function App() {
    const { setAge, setGender, setFromDate, setToDate, removeCookie } =
        useFilterParams();
    const dispatch = useDispatch();

    return (
        <div>
            <Filters />
            <AnalyticsChart />
            <button
                className="border-4 border-solid border-red-500 rounded-md p-1 mx-12"
                onClick={() => {
                    dispatch(logout());

                    // reset filters
                    setAge(undefined);
                    setGender(undefined);
                    setFromDate(undefined);
                    setToDate(undefined);

                    // remove cookies
                    removeCookie("age");
                    removeCookie("gender");
                    removeCookie("fromDate");
                    removeCookie("toDate");
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default App;
