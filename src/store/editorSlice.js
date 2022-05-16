const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    showEditor: false,
    editNoteId: "",
    mode: "new",
    heading: "",
    body: "",
    tags: [],
    color: "default",
    pinned: false,
    priority: "low",
};

const editorSlice = createSlice({
    name: "noteDetials",
    initialState,
    reducers: {
        resetEditor(state) {
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
        setEditNoteDetails(state, action) {
            state.mode = "edit";
            state.editNoteId = action.payload._id;
            state.heading = action.payload.heading;
            state.body = action.payload.body;
            state.tags = action.payload.tags;
            state.color = action.payload.color;
            state.pinned = action.payload.pinned;
            state.priority = action.payload.priority;
        },
        setHeading(state, action) {
            state.heading = action.payload;
        },
        setBody(state, action) {
            state.body = action.payload;
        },
        setColor(state, action) {
            state.color = action.payload;
        },
        setPriority(state, action) {
            state.priority = action.payload;
        },
        addTag(state, action) {
            state.tags = [...state.tags, action.payload];
        },
        removeTag(state, action) {
            state.tags = state.tags.filter((tag) => tag !== action.payload);
        },
    },
});

export const editorReducer = editorSlice.reducer;
export const {
    resetEditor,
    addTag,
    editNote,
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
