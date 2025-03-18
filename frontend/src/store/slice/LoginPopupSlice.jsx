// Here i am using 2 slice because i want to show how to
// use multiple slices otherwise i can write the logic in my
// AuthSlice.jsx

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isopen: false,
}

const loginPopUp = createSlice({
    name:'loginPopup',
    initialState,
    reducers:{
        popup(state){
            state.isopen = !state.isopen
        }
    }
})

export const {popup} = loginPopUp.actions
export default loginPopUp.reducer