import axios from "axios";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { thunkApiConfig } from "./TypedExports";

export type AuthState =
    | {
          isLoggedIn: false;
          userId: null;
          token: null;
      }
    | {
          isLoggedIn: true;
          userId: string;
          token: string;
      };

export const initialState: AuthState = {
    isLoggedIn: false,
    userId: null,
    token: null,
};

export const logInAction = createAsyncThunk<
    AuthState,
    { email: string; password: string },
    thunkApiConfig
>("auth/logIn", async (body, thunkAPI) => {
    try {
        const response = await axios.post(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
            body
        );
        const data = response.data;
        localStorage.setItem(
            "user",
            JSON.stringify({
                userId: data.foundUser._id,
                token: data.encodedToken,
            })
        );
        toast.success("Log In Success");
        return {
            userId: data.foundUser._id,
            token: data.encodedToken,
            isLoggedIn: true,
        };
    } catch (error: any) {
        toast.error(error.response.data.errors[0]);
        return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
});
export const signUpAction = createAsyncThunk<
    Omit<AuthState, "isLoggedIn">,
    { email: string; password: string; name: string },
    thunkApiConfig
>("auth/signup", async (body, thunkAPI) => {
    try {
        const { data } = await axios.post(
            `https://${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
            { ...body }
        );
        toast.success("Sign Up Succes!");
        return { userId: data.createdUser._id, token: data.encodedToken };
    } catch (error: any) {
        toast.error(error.response.data.errors[0]);
        return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
});

export const logOutAction = createAsyncThunk("auth/logOut", async () => {
    localStorage.removeItem("user");
});

const authSlice = createSlice({
    name: "auth",
    initialState: initialState as AuthState,
    reducers: {
        restoreLogin(
            state,
            action: PayloadAction<{ token: string; userId: string }>
        ) {
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
