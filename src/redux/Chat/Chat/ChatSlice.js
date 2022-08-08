import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    connection: "",
    messages1: [],
    users: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUsersChat(state, action) {
            state.users = action.payload;
        },
        setConnection(state, action) {
            state.connection = action.payload;
        },
        setMessages1(state, action) {
            state.messages1 = action.payload;
        },
    }
});

export const { setUsersChat, setConnection, setMessages1 } = chatSlice.actions;

export default chatSlice.reducer;