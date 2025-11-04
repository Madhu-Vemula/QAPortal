import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "../types/User/user";
import { authApi } from "../services/authService";
import Cookies from "js-cookie";
interface AuthState {
    token: string | null;
    user: UserData | null;
    isAuthenticated: boolean;
    showLoader: boolean;
}

const initialState: AuthState = {
    token: Cookies.get("token")?.valueOf() || null,
    user: null,
    isAuthenticated: !!Cookies.get("token"),
    showLoader: true,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            Cookies.set("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("token");
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getCurrentUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.data;
                state.isAuthenticated = true;
                state.showLoader = false;
            }
        );
        builder.addMatcher(
            authApi.endpoints.getCurrentUser.matchRejected,
            (state) => {
               state.user = null;
               state.isAuthenticated = false;
               state.showLoader = false;
            }
        );
    }
    });
export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer