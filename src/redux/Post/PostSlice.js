import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {},
  userPosts: {},
  isClickedLike: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts (state, action) {
      state.posts = action.payload;
    },
    setUserPosts (state, action) {
      state.userPosts = action.payload;
    },
    setIsClickedLike (state, action) {
      state.isClickedLike = action.payload;
    }
  },
});

export const { setPosts, setUserPosts, setIsClickedLike } = postSlice.actions;

export default postSlice.reducer;
