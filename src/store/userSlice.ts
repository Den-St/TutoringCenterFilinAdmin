import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";

const initialState:UserT = {
    email:'',
    id:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,payload:PayloadAction<UserT>){
            state.email = payload?.payload.email;
            state.id = payload?.payload.id; 
        },
        clearAuthedUser(state){
            state.email = '';
            state.id = ''; 
        },
    }
});

export const {setUser} = userSlice.actions;
export const {clearAuthedUser} = userSlice.actions;
export default userSlice.reducer;