import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userType {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    image: string | null;
    password: string;
    updateAt: string;
    accessToken: string;
    refreshToken: string;
    isGroup?: boolean;
    name: string;
}

interface AuthState {
    user: userType | null;
    isLogedIn: boolean;
    isNotconfirmPIN: boolean;
    error: string;
}

const initialState: AuthState = {
    user: null,
    isLogedIn: false,
    isNotconfirmPIN: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<any>) {
            state.isLogedIn = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLogedIn = false;
            state.isNotconfirmPIN = true;
            state.user = null;
        },
        isLogin(state) {
            state.isNotconfirmPIN = false;
        }
    }
});

export const { login, logout, isLogin } = authSlice.actions;

export default authSlice.reducer;
