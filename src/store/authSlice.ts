import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserData } from "../types/User/user";
import { authApi } from "../services/authService";

interface AuthState {
    token: string | null;
    user: UserData | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.getCurrentUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.data,
                    state.isAuthenticated = true
            }
        ),
            builder.addMatcher(
                authApi.endpoints.getCurrentUser.matchRejected,
                (state) => {
                    state.user = null,
                        state.isAuthenticated = false
                }
            )
    }
})
export const {setToken,logout}=authSlice.actions;
export default authSlice.reducer