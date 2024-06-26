import React from "react";
import ReactDOM from "react-dom/client";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FilterParamsProvider } from "./contexts/FilterParamsContext";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import App from "./App";
import { store } from "./app/store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <Provider store={store}>
                    <FilterParamsProvider>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </FilterParamsProvider>
                </Provider>
            </QueryParamProvider>
            <ToastContainer />
        </BrowserRouter>
    </React.StrictMode>
);
