import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: [],
  isChange: false
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStories (state, action) {
      state.stories = action.payload;
      state.isChange = true;
    }
  },
});

export const { setStories } = storySlice.actions;

export default storySlice.reducer;
