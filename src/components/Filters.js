import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useFilterParams } from "../contexts/FilterParamsContext";

function Filters() {
    const {
        age,
        setAge,
        gender,
        setGender,
        setFromDate,
        setToDate,
        setCookie,
        removeCookie,
    } = useFilterParams();
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date("2022-10-4"),
            endDate: new Date("2022-10-29"),
            key: "selection",
        },
    ]);

    const [showDatePicker, setShowDatePicker] = useState(false);

    function handleAgeChange(e) {
        const age = e.target.value;
        if (age !== "select") {
            setAge(age);
            setCookie("age", age);
        } else {
            setAge(undefined);
            removeCookie("age");
        }
    }

    function handleGenderChange(e) {
        const gender = e.target.value;
        if (gender !== "select") {
            setGender(gender);
            setCookie("gender", gender);
        } else {
            setGender(undefined);
            removeCookie("gender");
        }
    }

    function toggleShowDatePicker() {
        setShowDatePicker(!showDatePicker);
    }

    function handleDateRangeChange(item) {
        setDateRange([item.selection]);
    }

    function setDateRangeQueryStrings() {
        setFromDate(dateRange[0].startDate);
        setToDate(dateRange[0].endDate);
        setCookie("fromDate", dateRange[0].startDate);
        setCookie("toDate", dateRange[0].endDate);
        toggleShowDatePicker();
    }

    function cancelDatePicker() {
        toggleShowDatePicker();
    }

    function clearDateRange() {
        toggleShowDatePicker();
        setFromDate(undefined);
        setToDate(undefined);
        removeCookie("fromDate");
        removeCookie("toDate");
    }

    return (
        <div>
            <h2>Filters</h2>
            <div className="flex gap-4">
                <div>
                    <span>Age:</span>
                    <select onChange={handleAgeChange} value={age}>
                        <option value={"select"}>Select</option>
                        <option value={"15-25"}>15-25</option>
                        <option value={">25"}>&gt;25</option>
                    </select>
                </div>
                <div>
                    <span>Gender:</span>
                    <select onChange={handleGenderChange} value={gender}>
                        <option value={"select"}>Select</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col">
                <button onClick={toggleShowDatePicker}>Filter By Dates</button>
                {showDatePicker && (
                    <>
                        <DateRangePicker
                            onChange={handleDateRangeChange}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={dateRange}
                            direction="horizontal"
                            minDate={new Date("2022-10-4")}
                            maxDate={new Date("2022-10-29")}
                        />
                        <div>
                            <button onClick={setDateRangeQueryStrings}>
                                Apply
                            </button>
                            <button onClick={clearDateRange}>
                                Clear Range
                            </button>
                            <button onClick={cancelDatePicker}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Filters;
