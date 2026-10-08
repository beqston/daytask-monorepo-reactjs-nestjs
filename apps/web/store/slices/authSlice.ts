import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from '../../../../packages/types';
import api from "../../api/api";
import axios from "axios";

interface AuthState{
    user: User | null,
    isAuth:boolean,
    loading:boolean,
    error:string | null
}

// auth/me request for check user
export const getAuthMe = createAsyncThunk<User, void, {rejectValue:string}>(
    "authh/checkout", 
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
export const logoutUser = createAsyncThunk('auth/logout', async()=>{
    try {
        await api.post('/auth/logout');
    } catch (err) {
        console.log("Logout error:", err)
    }
})

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
        .addCase(getAuthMe.rejected, (state, acttion)=>{
            state.isAuth=false;
            state.loading=false;
            state.user = null;
            state.error = acttion.payload || "Unauthorized"
        })
        .addCase(logoutUser.fulfilled, (state)=>{
            state.user = null;
            state.isAuth = false;
            state.loading =false;
        })
    },
})

export const { logout } =authSlice.actions;
export default authSlice.reducer;