import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: [],
 
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStories (state, action) {
      state.stories = action.payload;
    }
  },
});

export const { setStories } = storySlice.actions;

export default storySlice.reducer;
