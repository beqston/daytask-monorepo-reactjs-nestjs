import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType{
    members:string[],
}

const initialState:InitialStateType = {
    members:[],
}

const taskMembersSlice = createSlice({
    name:"tasksMembers",
    initialState:initialState,
    reducers:{
        addMember:(state, action:PayloadAction<string>)=>{
            if(!state.members.includes(action.payload)){
                state.members.push(action.payload);
            }
        }
    }
})


export const {addMember} = taskMembersSlice.actions;
export default taskMembersSlice.reducer;