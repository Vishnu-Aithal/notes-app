const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
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
