import axios from "axios";
import { toast } from "react-toastify";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const initialState = {
    isLoggedIn: false,
    userId: null,
    token: null,
};

export const logInAction = createAsyncThunk(
    "auth/logIn",
    async (body, thunkAPI) => {
        try {
            const response = await axios.post("/api/auth/login", { ...body });
            const data = response.data;
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: data.foundUser._id,
                    token: data.encodedToken,
                })
            );
            toast.success("Log In Success");
            return { userId: data.foundUser._id, token: data.encodedToken };
        } catch (error) {
            toast.error(error.response.data.errors[0]);
            return thunkAPI.rejectWithValue({
                errors: error.response.data.errors,
                status: error.response.status,
            });
        }
    }
);
export const signUpAction = createAsyncThunk(
    "auth/signup",
    async (body, thunkAPI) => {
        console.log(body);
        const { data } = await axios.post("/api/auth/signup", { ...body });
        console.log(data);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: data.createdUser._id,
                token: data.encodedToken,
            })
        );
        toast.success("Sign Up Succes!");
        return { userId: data.createdUser._id, token: data.encodedToken };
    }
);

export const logOutAction = createAsyncThunk("auth/logOut", async () => {
    localStorage.removeItem("userData");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        restoreLogin(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logInAction.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        });
        builder.addCase(logInAction.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
        });
        builder.addCase(logOutAction.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
        });
        builder.addCase(signUpAction.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        });
    },
});

export const authReducer = authSlice.reducer;
export const { restoreLogin } = authSlice.actions;
