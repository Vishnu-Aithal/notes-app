import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotePriority, NoteType } from "types/Note";
import { thunkApiConfig } from "./TypedExports";

export interface FilterNotesState {
    unFilteredNotes: NoteType[];
    filteredNotes: NoteType[];
    filter: {
        tags: string[];
        newestFirst: boolean;
        priorities: string[];
        searchTerm: string;
    };
}

const initialState: FilterNotesState = {
    unFilteredNotes: [],
    filteredNotes: [],
    filter: {
        tags: [],
        newestFirst: true,
        priorities: [],
        searchTerm: "",
    },
};

export const processFilter = createAsyncThunk<
    NoteType[],
    undefined,
    thunkApiConfig
>("filteredNotes/processFilter", (_, thunkApi) => {
    const { filter, unFilteredNotes } = thunkApi.getState().filteredNotes;
    let newFilteredNotes = [...unFilteredNotes];
    //SearchTerm
    if (filter.searchTerm) {
        const searchTermsArray = filter.searchTerm
            .split(" ")
            .filter((_) => _ !== "");

        newFilteredNotes = newFilteredNotes.filter(({ heading }) => {
            const headingWithoutSpaces = heading
                .replaceAll(" ", "")
                .toLowerCase();

            for (const word of searchTermsArray) {
                if (!headingWithoutSpaces.includes(word)) return false;
            }
            return true;
        });
    }
    //Tags
    if (filter.tags.length) {
        newFilteredNotes = newFilteredNotes.filter((note) => {
            for (const tag of note.tags) {
                if (filter.tags.includes(tag)) return true;
            }
            return false;
        });
    }
    //Priorities
    if (filter.priorities.length) {
        newFilteredNotes = newFilteredNotes.filter((note) =>
            filter.priorities.includes(note.priority)
        );
    }
    //Order
    if (filter.newestFirst) {
        newFilteredNotes.sort((a, b) => {
            return Date.parse(b.created) - Date.parse(a.created);
        });
    }
    return newFilteredNotes;
});

const filteredNotesSlice = createSlice({
    name: "filteredNotes",
    initialState,
    reducers: {
        addTagToFilter(state, action: PayloadAction<string>) {
            state.filter.tags = [...state.filter.tags, action.payload];
        },
        removeTagFromFilter(state, action: PayloadAction<string>) {
            state.filter.tags = state.filter.tags.filter(
                (tag) => tag !== action.payload
            );
        },
        setNewestFirstFilter(state) {
            state.filter.newestFirst = true;
        },
        setOldestFirstFilter(state) {
            state.filter.newestFirst = false;
        },
        addPriorityToFilter(state, action: PayloadAction<NotePriority>) {
            state.filter.priorities = [
                ...state.filter.priorities,
                action.payload,
            ];
        },
        removePriorityFromFilter(state, action: PayloadAction<NotePriority>) {
            state.filter.priorities = state.filter.priorities.filter(
                (priority) => priority !== action.payload
            );
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.filter.searchTerm = action.payload;
        },
        setUnFilteredNotes(state, action: PayloadAction<NoteType[]>) {
            state.unFilteredNotes = action.payload;
        },
        resetFilters(state) {
            return { ...initialState, unFilteredNotes: state.unFilteredNotes };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(processFilter.fulfilled, (state, action) => {
            state.filteredNotes = action.payload;
        });
    },
});

export const filteredNotesReducer = filteredNotesSlice.reducer;

export const {
    addTagToFilter,
    removeTagFromFilter,
    resetFilters,
    setNewestFirstFilter,
    setOldestFirstFilter,
    setSearchTerm,
    addPriorityToFilter,
    removePriorityFromFilter,
    setUnFilteredNotes,
} = filteredNotesSlice.actions;
