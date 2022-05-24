import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const getConfig = (thunkApi) => {
    const token = thunkApi.getState().auth.token;
    return { headers: { authorization: token } };
};

export const getAllTodos = createAsyncThunk(
    "todos/getAllTodos",
    async (arg, thunkApi) => {
        try {
            const config = getConfig(thunkApi);
            const response = await axios.get("/api/todos", config);
            toast.success("Todos Fetched Successfully");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async (todoDetails, thunkApi) => {
        try {
            const response = await axios.post(
                "/api/todos",
                { todo: todoDetails },
                getConfig(thunkApi)
            );
            toast.success("New Todo Added");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (todoDetails, thunkApi) => {
        try {
            const response = await axios.post(
                `/api/todos/${todoDetails._id}`,
                { todo: todoDetails },
                getConfig(thunkApi)
            );
            toast.success("Todo Updated");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (todoDetails, thunkApi) => {
        try {
            const response = await axios.delete(
                `/api/todos/${todoDetails._id}`,

                getConfig(thunkApi)
            );
            toast.success("Todo Deleted");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return thunkApi.rejectWithValue(error.response);
        }
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.fulfilled, (state, action) => {
            return action.payload.todos;
        });
        builder.addCase(addNewTodo.fulfilled, (state, action) => {
            return action.payload.todos;
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            return action.payload.todos;
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            return action.payload.todos;
        });
    },
});

export const todosReducer = todosSlice.reducer;
