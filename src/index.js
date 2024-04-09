import React from "react";
import ReactDOM from "react-dom/client";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FilterParamsProvider } from "./components/contexts/FilterParamsContext";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <FilterParamsProvider>
                    <Routes>
                        <Route path="/" element={<App />} />
                    </Routes>
                </FilterParamsProvider>
            </QueryParamProvider>
        </BrowserRouter>
    </React.StrictMode>
);
