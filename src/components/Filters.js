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

    function clearPreferences() {
        setAge(undefined);
        setGender(undefined);
        setFromDate(undefined);
        setToDate(undefined);

        removeCookie("age");
        removeCookie("gender");
        removeCookie("fromDate");
        removeCookie("toDate");
    }

    return (
        <div className="mx-10">
            <h2 className="my-4">Filters</h2>
            <div className="flex flex-col items-start gap-4">
                <div className="flex gap-4">
                    <div className="border-4 border-solid border-[#81cdb4] rounded-md p-1">
                        <span>Age:</span>
                        <select
                            onChange={handleAgeChange}
                            value={age === undefined ? "select" : age}
                        >
                            <option value={"select"}>Select</option>
                            <option value={"15-25"}>15-25</option>
                            <option value={">25"}>&gt;25</option>
                        </select>
                    </div>
                    <div className="border-4 border-solid border-[#81cdb4] rounded-md p-1">
                        <span>Gender:</span>
                        <select
                            onChange={handleGenderChange}
                            value={gender === undefined ? "select" : gender}
                        >
                            <option value={"select"}>Select</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={toggleShowDatePicker}
                        className="border-4 border-solid border-[#81cdb4] rounded-md mb-4 p-1"
                    >
                        Filter By Dates
                    </button>
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
                            <div className="flex gap-2">
                                <button
                                    className="border-4 border-solid border-[#81cdb4] rounded-md p-1"
                                    onClick={setDateRangeQueryStrings}
                                >
                                    Apply
                                </button>
                                <button
                                    className="border-4 border-solid border-[#81cdb4] rounded-md p-1"
                                    onClick={clearDateRange}
                                >
                                    Clear Range
                                </button>
                                <button
                                    className="border-4 border-solid border-[#81cdb4] rounded-md p-1"
                                    onClick={cancelDatePicker}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <button
                        className="border-4 border-solid border-[#81cdb4] rounded-md mb-4 p-1"
                        onClick={clearPreferences}
                    >
                        Clear All Filters/Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filters;
