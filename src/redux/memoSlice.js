import { createSlice } from "@reduxjs/toolkit";

const memoSlice = createSlice({
  name: "memo",
  initialState: {
    memos: [],
  },
  reducers: {
    setMemos: (state, action) => {
      state.memos = action.payload;
    },
    appendMemos: (state, action) => {
      state.memos = [...state.memos, ...action.payload];
    },
    addMemo: (state, action) => {
      state.memos.unshift(action.payload);
    },
    updateMemo: (state, action) => {
      const index = state.memos.findIndex(
        (memo) => memo._id === action.payload._id
      );

      if (index !== -1) {
        state.memos[index] = action.payload;
      }
    },
  },
});

export const { setMemos, appendMemos, addMemo, updateMemo } = memoSlice.actions;
export default memoSlice.reducer;
