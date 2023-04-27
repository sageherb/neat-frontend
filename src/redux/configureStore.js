import { configureStore } from "@reduxjs/toolkit";

import memo from "./memoSlice";

const store = configureStore({
  reducer: {
    memo,
  },
});

export default store;
