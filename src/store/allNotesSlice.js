import axios from "axios";
import { toast } from "react-toastify";
import { resetEditor } from "./editorSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    notes: [],
    archives: [],
    trash: [],
};

export const addNewNote = createAsyncThunk(
    "allNotes/addNewNote",
    async (noteDetails, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.token;
            const response = await axios.post(
                "/api/notes",
                { note: noteDetails },
                {
                    headers: { authorization: token },
                }
            );
            toast.success("New Note Added");
            thunkApi.dispatch(resetEditor());
            return response.data.notes;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response.data.errors[0]);
        }
    }
);

export const getAllNotes = createAsyncThunk(
    "allNotes/getNotes",
    async (arg, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.token;
            const {
                data: { notes },
            } = await axios.get("/api/notes", {
                headers: { authorization: token },
            });
            const {
                data: { archives },
            } = await axios.get("/api/archives", {
                headers: { authorization: token },
            });
            const {
                data: { trash },
            } = await axios.get("/api/trash", {
                headers: { authorization: token },
            });
            notes.length
                ? toast.success("Notes Fetched Successfully")
                : toast.info("No Notes");
            console.log({ notes, archives, trash });
            return { notes, archives, trash };
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response.data.errors[0]);
        }
    }
);

const allNotesSlice = createSlice({
    name: "allNotes",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewNote.fulfilled, (state, action) => {
            state.notes = action.payload;
        });
        builder.addCase(getAllNotes.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.archives = action.payload.archives;
            state.trash = action.payload.trash;
        });
    },
});

export const allNotesReducer = allNotesSlice.reducer;
