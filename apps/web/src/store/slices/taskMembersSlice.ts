import type { User } from "@daytask/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TaskMember = Pick<User, 'id' | 'fullName' | 'imageUrl'>

interface InitialStateType{
    members:TaskMember[],
}

const initialState:InitialStateType = {
    members:[],
}

const taskMembersSlice = createSlice({
    name:"tasksMembers",
    initialState:initialState,
    reducers:{
        addMember:(state, action:PayloadAction<TaskMember>)=>{
            const exists = state.members.some(m=>m.id == action.payload.id);
            if(!exists){
                state.members.push(action.payload);
            }
        },
        removeMember: (state, action:PayloadAction<string>)=>{
            state.members = state.members.filter(m => m.id != action.payload)
        },
        clearMembers(state){
            state.members = [];
        }
    }
})


export const { addMember, removeMember, clearMembers } = taskMembersSlice.actions;
export default taskMembersSlice.reducer;