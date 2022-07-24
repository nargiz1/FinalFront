import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    privateChats: [],
    Chat: {},
    chatExists: false    
}

export const privateChatSlice = createSlice({
    name: 'privateChat',
    initialState,
    reducers: {
        setPrivateChats(state, action){
            state.privateChats = action.payload;
        },
        setPrivateChat(state, action){
            state.Chat = action.payload;
        },
        setChatExists(state, action){
            state.chatExists = action.payload;
        }
    }
});

export const {setPrivateChats, setPrivateChat, setChatExists} = privateChatSlice.actions;

export default privateChatSlice.reducer;