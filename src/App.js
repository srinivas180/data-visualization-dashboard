import { useQueryParam, StringParam, DateParam } from "use-query-params";

import AnalyticsChart from "./components/AnalyticsChart";
import Filters from "./components/Filters";

import "./App.css";

function App() {
    const [age, setAge] = useQueryParam("age", StringParam);
    const [gender, setGender] = useQueryParam("gender", StringParam);
    const [fromDate, setFromDate] = useQueryParam("fromDate", DateParam);
    const [toDate, setToDate] = useQueryParam("toDate", DateParam);

    return (
        <div>
            <Filters
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
            />
            <AnalyticsChart
                age={age}
                gender={gender}
                fromDate={fromDate}
                toDate={toDate}
            />
        </div>
    );
}

export default App;
