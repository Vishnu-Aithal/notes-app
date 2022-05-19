import axios from "axios";
import { toast } from "react-toastify";
import { resetEditor } from "./editorSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
    notes: [],
    archives: [],
    trash: [],
};

const getConfig = (thunkApi) => {
    const token = thunkApi.getState().auth.token;
    return { headers: { authorization: token } };
};

export const getAllNotes = createAsyncThunk(
    "allNotes/getAllNotes",
    async (arg, thunkApi) => {
        try {
            const config = getConfig(thunkApi);
            const {
                data: { notes },
            } = await axios.get("/api/notes", config);
            const {
                data: { archives },
            } = await axios.get("/api/archives", config);
            const {
                data: { trash },
            } = await axios.get("/api/trash", config);
            notes.length
                ? toast.success("Notes Fetched Successfully")
                : toast.info("No Notes");
            return { notes, archives, trash };
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const addNewNote = createAsyncThunk(
    "allNotes/addNewNote",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.post(
                "/api/notes",
                { note: noteDetails },
                getConfig(thunkApi)
            );
            toast.success("New Note Added");
            thunkApi.dispatch(resetEditor());
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const updateNote = createAsyncThunk(
    "allNotes/updateNote",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.post(
                `/api/notes/${noteDetails._id}`,
                { note: noteDetails },
                getConfig(thunkApi)
            );
            toast.success("Note Edited");
            thunkApi.dispatch(resetEditor());
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const addToArchives = createAsyncThunk(
    "allNotes/addToArchives",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.post(
                `/api/notes/archives/${noteDetails._id}`,
                { note: noteDetails },
                getConfig(thunkApi)
            );
            toast.success("Note Archived");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const restoreFromArchive = createAsyncThunk(
    "allNotes/restoreFromArchive",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.post(
                `/api/archives/restore/${noteDetails._id}`,
                { note: noteDetails },
                getConfig(thunkApi)
            );
            toast.success("Note Unarchived");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const deleteFromArchive = createAsyncThunk(
    "allNotes/deleteFromArchive",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.delete(
                `/api/archives/delete/${noteDetails._id}`,

                getConfig(thunkApi)
            );
            toast.success("Note Deleted");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const addToTrash = createAsyncThunk(
    "allNotes/addToTrash",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.post(
                `/api/notes/trash/${noteDetails._id}`,
                { note: noteDetails },
                getConfig(thunkApi)
            );
            toast.success("Moved To Trash!");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const restoreFromTrash = createAsyncThunk(
    "allNotes/restoreFromTrash",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.post(
                `/api/trash/restore/${noteDetails._id}`,
                { note: noteDetails },
                getConfig(thunkApi)
            );
            toast.success("Note Restored!");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const deleteFromTrash = createAsyncThunk(
    "allNotes/deleteFromTrash",
    async (noteDetails, thunkApi) => {
        try {
            const response = await axios.delete(
                `/api/trash/delete/${noteDetails._id}`,

                getConfig(thunkApi)
            );
            toast.success("Note Deleted");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

const allNotesSlice = createSlice({
    name: "allNotes",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addNewNote.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
        });
        builder.addCase(getAllNotes.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.archives = action.payload.archives;
            state.trash = action.payload.trash;
        });
        builder.addCase(updateNote.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
        });
        builder.addCase(addToArchives.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.archives = action.payload.archives;
        });
        builder.addCase(restoreFromArchive.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.archives = action.payload.archives;
        });
        builder.addCase(deleteFromArchive.fulfilled, (state, action) => {
            state.archives = action.payload.archives;
        });
        builder.addCase(addToTrash.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.trash = action.payload.trash;
        });
        builder.addCase(restoreFromTrash.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
            state.trash = action.payload.trash;
        });
        builder.addCase(deleteFromTrash.fulfilled, (state, action) => {
            state.trash = action.payload.trash;
        });
    },
});

export const allNotesReducer = allNotesSlice.reducer;
