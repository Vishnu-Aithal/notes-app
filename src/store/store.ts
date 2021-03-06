import { configureStore } from "@reduxjs/toolkit";
import { allNotesReducer } from "./allNotesSlice";
import { authReducer } from "./authSlice";
import { editorReducer } from "./editorSlice";
import { themeReducer } from "./themeSlice";
import { filteredNotesReducer } from "./filteredNotesSlice";
import { todosReducer } from "./todosSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        editor: editorReducer,
        allNotes: allNotesReducer,
        filteredNotes: filteredNotesReducer,
        todos: todosReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
