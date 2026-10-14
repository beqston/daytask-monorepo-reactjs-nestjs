import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType{
    members:string[],
}

const initialState:InitialStateType = {
    members:[],
}
export const taskMembersSlice = createSlice({
    name:"tasksMembers",
    initialState:initialState,
    reducers:{
        addMember:(state, action)=>{
            state.members.push(action.payload);
        }
    }
})


export const {addMember} = taskMembersSlice.actions;
export default taskMembersSlice.reducer;