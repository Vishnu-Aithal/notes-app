import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { TodoType } from "types/Todo";
import { RootState } from "./store";
import { thunkApiConfig } from "./TypedExports";

export type TodosState = TodoType[];

const initialState: TodosState = [];

const getConfig = (thunkApi: { getState: () => RootState }) => {
    const token = thunkApi.getState().auth.token!;
    return { headers: { authorization: token } };
};

export const getAllTodos = createAsyncThunk<
    { todos: TodoType[] },
    undefined,
    thunkApiConfig
>("todos/getAllTodos", async (_arg, thunkApi) => {
    try {
        const config = getConfig(thunkApi);
        const response = await axios.get(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/todos`,
            config
        );
        toast.success("Todos Fetched Successfully");
        return response.data;
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
        return thunkApi.rejectWithValue(error.response);
    }
});

export const addNewTodo = createAsyncThunk<
    { todos: TodoType[] },
    Omit<TodoType, "_id">,
    thunkApiConfig
>("todos/addNewTodo", async (todoDetails, thunkApi) => {
    try {
        const response = await axios.post(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/todos`,
            { todo: todoDetails },
            getConfig(thunkApi)
        );
        toast.success("New Todo Added");
        return response.data;
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
        return thunkApi.rejectWithValue(error.response);
    }
});

export const updateTodo = createAsyncThunk<
    { todos: TodoType[] },
    Partial<TodoType>,
    thunkApiConfig
>("todos/updateTodo", async (todoDetails, thunkApi) => {
    try {
        const response = await axios.post(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoDetails._id}`,
            { todo: todoDetails },
            getConfig(thunkApi)
        );
        toast.success("Todo Updated");
        return response.data;
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
        return thunkApi.rejectWithValue(error.response);
    }
});

export const deleteTodo = createAsyncThunk<
    { todos: TodoType[] },
    TodoType,
    thunkApiConfig
>("todos/deleteTodo", async (todoDetails, thunkApi) => {
    try {
        const response = await axios.delete(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/todos/${todoDetails._id}`,

            getConfig(thunkApi)
        );
        toast.success("Todo Deleted");
        return response.data;
    } catch (error: any) {
        console.log(error);
        toast.error(error.message);
        return thunkApi.rejectWithValue(error.response);
    }
});

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.fulfilled, (_state, action) => {
            return action.payload.todos;
        });
        builder.addCase(addNewTodo.fulfilled, (_state, action) => {
            return action.payload.todos;
        });
        builder.addCase(updateTodo.fulfilled, (_state, action) => {
            return action.payload.todos;
        });
        builder.addCase(deleteTodo.fulfilled, (_state, action) => {
            return action.payload.todos;
        });
    },
});

export const todosReducer = todosSlice.reducer;
