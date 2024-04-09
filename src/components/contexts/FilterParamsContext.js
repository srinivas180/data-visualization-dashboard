import { useQueryParam, StringParam, DateParam } from "use-query-params";

import { createContext, useContext } from "react";

const FilterParamsContext = createContext();

function FilterParamsProvider({ children }) {
    const [age, setAge] = useQueryParam("age", StringParam);
    const [gender, setGender] = useQueryParam("gender", StringParam);
    const [fromDate, setFromDate] = useQueryParam("fromDate", DateParam);
    const [toDate, setToDate] = useQueryParam("toDate", DateParam);
    return (
        <FilterParamsContext.Provider
            value={
                (age,
                setAge,
                gender,
                setGender,
                fromDate,
                setFromDate,
                toDate,
                setToDate)
            }
        >
            {children}
        </FilterParamsContext.Provider>
    );
}

function useFilterParams() {
    const context = useContext(FilterParamsContext);
    if (!context) {
        throw new Error(
            "Params Context was used outside of the Params Provider"
        );
    }
    return context;
}

export { FilterParamsProvider, useFilterParams };
