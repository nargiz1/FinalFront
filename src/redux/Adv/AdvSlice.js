import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adv: {},
  
};

export const advSlice = createSlice({
  name: "adv",
  initialState,
  reducers: {
    setAdvs (state, action) {
      state.adv = action.payload;
    },
  
  },
});

export const { setAdvs } = advSlice.actions;

export default advSlice.reducer;
