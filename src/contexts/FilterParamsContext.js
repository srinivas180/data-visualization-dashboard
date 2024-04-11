import { createContext, useContext, useEffect } from "react";
import { useQueryParam, StringParam, DateParam } from "use-query-params";
import { useCookies } from "react-cookie";

const FilterParamsContext = createContext();

function FilterParamsProvider({ children }) {
    const [age, setAge] = useQueryParam("age", StringParam);
    const [gender, setGender] = useQueryParam("gender", StringParam);
    const [fromDate, setFromDate] = useQueryParam("fromDate", DateParam);
    const [toDate, setToDate] = useQueryParam("toDate", DateParam);
    const [cookies, setCookie, removeCookie] = useCookies([
        "age",
        "gender",
        "fromDate",
        "toDate",
    ]);

    useEffect(() => {
        if (cookies.age) setAge(cookies.age);

        if (cookies.gender) setGender(cookies.gender);

        if (cookies.fromDate) setFromDate(new Date(cookies.fromDate));

        if (cookies.toDate) setToDate(new Date(cookies.toDate));
    }, []);

    return (
        <FilterParamsContext.Provider
            value={{
                age,
                setAge,
                gender,
                setGender,
                fromDate,
                setFromDate,
                toDate,
                setToDate,
                setCookie,
                removeCookie,
            }}
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
