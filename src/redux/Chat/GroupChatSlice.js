import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupChats: [],
    group: {},
    groupMembers: [],
}

export const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState,
    reducers: {
        setGroupChats(state, action){
            state.groupChats = action.payload;
        },
        setGroupChat(state, action){
            state.group = action.payload;
        },
        setGroupChatMembers(state, action){
            state.groupMembers = action.payload;
        }
    }
});

export const {setGroupChats, setGroupChat, setGroupChatMembers} = groupChatSlice.actions;

export default groupChatSlice.reducer;