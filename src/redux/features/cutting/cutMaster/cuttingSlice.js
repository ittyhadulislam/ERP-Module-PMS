import { createSlice } from "@reduxjs/toolkit";

const cutMaster = createSlice({
  name: "cutMaster",
  initialState: { company: null, year: null, buyer: null, style: null },
  reducers: {
    setCutMaster: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setCutMaster } = cutMaster.actions;
export default cutMaster.reducer;
