import { createSlice } from "@reduxjs/toolkit";

// 1. Define User & State Types
export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}
interface UserState {
    user: User | null;
    isAuthenticated: boolean
}
const initialState: UserState = {
    user: null,
    isAuthenticated: false
};


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;