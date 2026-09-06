import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import conversationReducer from "./conversationSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        conversations: conversationReducer
    }
})

// this step is only for typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Use types hooks througout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;