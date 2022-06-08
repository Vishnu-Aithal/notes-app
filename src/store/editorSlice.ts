import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteColors, NotePriority, NoteType } from "types/Note";

export interface EditorState {
    showEditor: boolean;
    editNoteId: string;
    mode: "new" | "edit";
    heading: string;
    body: string;
    tags: string[];
    color: NoteColors;
    pinned: boolean;
    priority: NotePriority;
}

const initialState: EditorState = {
    showEditor: false,
    editNoteId: "",
    mode: "new",
    heading: "",
    body: "",
    tags: [],
    color: "default",
    pinned: false,
    priority: "Low",
};

const editorSlice = createSlice({
    name: "noteDetials",
    initialState,
    reducers: {
        resetEditor() {
            return initialState;
        },
        showEditor(state) {
            state.showEditor = true;
        },
        hideEditor(state) {
            state.showEditor = false;
        },
        toggleEditor(state) {
            state.showEditor = !state.showEditor;
        },
        setEditNoteDetails(
            state,
            action: PayloadAction<Omit<NoteType, "created">>
        ) {
            state.showEditor = true;
            state.mode = "edit";
            state.editNoteId = action.payload._id;
            state.heading = action.payload.heading;
            state.body = action.payload.body;
            state.tags = action.payload.tags;
            state.color = action.payload.color;
            state.pinned = action.payload.pinned;
            state.priority = action.payload.priority;
        },
        setHeading(state, action: PayloadAction<string>) {
            state.heading = action.payload;
        },
        setBody(state, action: PayloadAction<string>) {
            state.body = action.payload;
        },
        setColor(state, action: PayloadAction<NoteColors>) {
            state.color = action.payload;
        },
        setPriority(state, action: PayloadAction<NotePriority>) {
            state.priority = action.payload;
        },
        addTag(state, action: PayloadAction<string>) {
            state.tags = [...state.tags, action.payload];
        },
        removeTag(state, action: PayloadAction<string>) {
            state.tags = state.tags.filter((tag) => tag !== action.payload);
        },
    },
});

export const editorReducer = editorSlice.reducer;
export const {
    resetEditor,
    addTag,
    removeTag,
    setBody,
    setColor,
    setHeading,
    setPriority,
    hideEditor,
    setEditNoteDetails,
    showEditor,
    toggleEditor,
} = editorSlice.actions;
