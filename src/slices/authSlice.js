import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    user: { email: "", password: "" },
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
};

const API_ENDPOINT =
    "https://5ebc17ae-68ec-47c7-a6d7-bb98371e531e-00-2wfysx6t421uu.spock.replit.dev";

export const login = createAsyncThunk("auth/login", async (userCredentials) => {
    console.log("userCreddss", userCredentials);
    try {
        const response = await fetch(`${API_ENDPOINT}/auth`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials),
        });

        if (response.status === 200) {
            const data = await response.json();

            return {
                token: data.token,
                isLoggedIn: true,
            };
        }
    } catch (error) {
        toast.error("Some error occurred while logging in.", {
            position: "bottom-right",
        });
        console.error(error);
    }
});

export const signup = createAsyncThunk("auth/signup", async (userDetails) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });

        if (response.status === 200) {
            const data = await response.json();
            return {
                _id: data._id,
                email: data.email,
                token: data.token,
                isLoggedIn: true,
            };
        }
    } catch (error) {
        toast.error("Some error occurred while signing up.", {
            position: "bottom-right",
        });
        console.error(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.setItem("token", null);

            state.isLoggedIn = false;
            state.token = null;
            state.user = {};
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(signup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "success";
                state.token = action.payload.token;
                state.isLoggedIn = action.payload.isLoggedIn;

                localStorage.setItem("token", action.payload.token);

                toast.success("successfully signed in.", {
                    position: "bottom-right",
                });
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = "success";
                    state.token = action.payload.token;
                    state.isLoggedIn = action.payload.isLoggedIn;

                    localStorage.setItem("token", action.payload.token);

                    toast.success("successfully logged in.", {
                        position: "bottom-right",
                    });
                }
            }),
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
