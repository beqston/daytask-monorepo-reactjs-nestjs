import { createSlice } from "@reduxjs/toolkit";

type ColorTheme = "Dark" | "Light";
interface InitialState{
    theme:ColorTheme
}

const getInitialState = ():ColorTheme=>{
    const saved = localStorage.getItem('theme');
    return saved == "Dark" || saved == "Light"? saved:"Dark";
}
const initialState:InitialState = {
    theme:getInitialState(),
}

const themSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeTheme:(state)=>{
            state.theme = state.theme === "Dark" ? "Light" : "Dark";
            localStorage.setItem('theme', state.theme);
        }
    }
});

export const {changeTheme}= themSlice.actions;
export default themSlice.reducer;