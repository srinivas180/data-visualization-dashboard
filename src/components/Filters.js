import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";

function Filters({ age, setAge, gender, setGender, setFromDate, setToDate }) {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [showDatePicker, setShowDatePicker] = useState(false);

    function handleAgeChange(e) {
        const age = e.target.value;
        if (age !== "select") setAge(age);
        else setAge(undefined);
    }

    function handleGenderChange(e) {
        const gender = e.target.value;
        if (gender !== "select") setGender(e.target.value);
        else setGender(undefined);
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
        toggleShowDatePicker();
    }

    function cancelDatePicker() {
        toggleShowDatePicker();
        setFromDate(undefined);
        setToDate(undefined);
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
                        />
                        <div>
                            <button onClick={setDateRangeQueryStrings}>
                                Apply
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