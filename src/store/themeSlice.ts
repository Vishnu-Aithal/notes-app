import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
    darkTheme: boolean;
}
const initialState: ThemeState = {
    darkTheme: false,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleDarkTheme(state) {
            state.darkTheme = !state.darkTheme;
        },
    },
});

export const themeReducer = themeSlice.reducer;

export const { toggleDarkTheme } = themeSlice.actions;
