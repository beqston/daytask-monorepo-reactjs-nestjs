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
export const logoutUser = createAsyncThunk('/auth/logout', async()=>{
    try {
        await api.post('/auth/logout');
    } catch (err) {
        console.log("Logout error:", err)
    }
})

// login user
export const loginUser = createAsyncThunk<User, LoginCredentials, {rejectValue:string}>(
    "auth/login", 
    async(credentials, {rejectWithValue})=>{
        try {
            const { data } = await api.post("/auth/login", credentials);
            return data;
        } catch (err) {
            if(axios.isAxiosError(err)){
                return rejectWithValue(err.response?.data?.message || "Invalid credentials");
            }
            return rejectWithValue("Uknown error");
        }
    }
)

const initialState:AuthState = {
    isAuth:false,
    loading:true,
    error:null,
    user:null
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state, action)=>{
            state.loading =false;
            state.isAuth = true;
            state.user = action.payload;
            state.error = null;
        },
        logout(state){
            state.error=null;
            state.isAuth=false;
            state.user=null;
            state.loading=false;
        }
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
            state.error = action.payload || "Unauthorized"
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
        .addCase(loginUser.rejected, (state)=>{
            state.error="Login failed";
            state.loading=false;
            state.user=null;
            state.isAuth=false;
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
        
    },
})

export const { logout, login } =authSlice.actions;
export default authSlice.reducer;