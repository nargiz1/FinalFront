import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/AuthSlice';
import postReducer from './Post/PostSlice';
import followReducer from './Follow/FollowSlice';
import userReducer from './User/UserSlice';
import advReducer from './Adv/AdvSlice';
import storyReducer from './Story/StorySlice';
import messageReducer from './Message/MessageSlice';
import privateChatReducer from './Chat/PrivateChatSlice';
import groupChatReducer from './Chat/GroupChatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    follow: followReducer,
    user: userReducer,
    adv: advReducer,
    story:storyReducer,
    message: messageReducer,
    privateChat: privateChatReducer,
    groupChat: groupChatReducer,
  },
});

export default store;



