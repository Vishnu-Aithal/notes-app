import { configureStore } from "@reduxjs/toolkit";
import { allNotesReducer } from "./allNotesSlice";
import { authReducer } from "./authSlice";
import { editorReducer } from "./editorSlice";
import { themeReducer } from "./themeSlice";
import { filteredNotesReducer } from "./filteredNotesSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        editor: editorReducer,
        allNotes: allNotesReducer,
        filteredNotes: filteredNotesReducer,
    },
});
