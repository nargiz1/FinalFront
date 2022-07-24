import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action){
            state.messages = action.payload;
        }
    }
});

export const {setMessage} = messageSlice.actions;

export default messageSlice.reducer;