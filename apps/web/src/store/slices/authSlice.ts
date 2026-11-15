import axios from "axios";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from '../../../../../packages/types';
import api from "../../api/api";
import type { AuthState, LoginCredentials } from "../../types/auth-store";

// auth/me request for check user
export const getAuthMe = createAsyncThunk<User, void, {rejectValue:string}>(
    "auth/checkout", 
    async(_, {rejectWithValue})=>{
        try {
            const { data } = await api.get("/auth/me");
            return data;
        } catch (err) {
            if(axios.isAxiosError(err)){
                return rejectWithValue(err.response?.data?.message || "Unauthorized");
            }
            return rejectWithValue("Uknown error");
        }
    }
)

// Logout for remove cookie
export const logoutUser = createAsyncThunk<void, void, {rejectValue:string}>('/auth/logout', async(_, {rejectWithValue})=>{
    try {
        await api.post('/auth/logout');
    } catch (err) {
        if(axios.isAxiosError(err)){
            const message = err.response?.data?.message;
            const errorMessage =Array.isArray(message)? message[0]:message;
            return rejectWithValue(errorMessage);
        }

        return rejectWithValue("Unknown error");
    }
})

// login user
export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      return data.user;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        return rejectWithValue(
          (Array.isArray(message) ? message[0] : message) || "Invalid credentials"
        );
      }
      return rejectWithValue("Unknown error");
    }
  }
);

 //delete user
export const deleteUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/delete",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/users/delete-account");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        return rejectWithValue(
          (Array.isArray(message) ? message[0] : message) ||
            "Failed to delete account"
        );
      }
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState:AuthState = {
    isAuth:false,
    loading:!!localStorage.getItem("isLoggedIn"),
    error:null,
    user:null
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action:PayloadAction<User>)=>{
            state.user = action.payload;
            state.isAuth = true;
            state.error = null;
            state.loading = false;

        },
        logout(state){
            state.error=null;
            state.isAuth=false;
            state.user=null;
            state.loading=false;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(getAuthMe.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAuthMe.fulfilled, (state, action: PayloadAction<User>)=>{
            state.isAuth = true;
            state.user = action.payload;
            state.loading= false;
        })
        .addCase(getAuthMe.rejected, (state, action)=>{
            state.isAuth=false;
            state.loading=false;
            state.user = null;
            state.error = action.payload || "Unauthorized";
            localStorage.removeItem("isLoggedIn");
        })
        .addCase(loginUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>)=>{
            state.isAuth = true;
            state.user = action.payload;
            state.loading= false;
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.error = action.payload ?? "Login failed";
            state.loading = false;
            state.user = null;
            state.isAuth = false;
        })
        .addCase(logoutUser.pending, (state)=>{
            state.error=null;
            state.loading=true;
            state.user = null;
        })
        .addCase(logoutUser.fulfilled, (state)=>{
            state.user = null;
            state.isAuth = false;
            state.loading =false;
        })
        .addCase(logoutUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.user = null;
            state.isAuth = false;
            state.loading = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? "Failed to delete account";
        })
        
    },
})

export const { logout, setUser} =authSlice.actions;
export default authSlice.reducer;