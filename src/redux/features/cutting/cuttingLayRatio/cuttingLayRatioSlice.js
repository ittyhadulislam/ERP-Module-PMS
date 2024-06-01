import { createSlice } from "@reduxjs/toolkit";

const cuttingLayRatio = createSlice({
  name: "cuttingLayRatio",
  initialState: {
    year: null,
    style: null,
    date: null,
    po: null,
    country: null,
    cutNo: "",
    autoLay: "",
    manualLay: "",
    bundleQty: "",
    remarks: "",
  },
  reducers: {
    setCuttingLayRatio: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetState: (state, action) => {
      //state.year = null;
      // state.style = null;
      // state.date = null;
      state.po = null;
      state.country = null;
      state.cutNo = "";
      state.autoLay = "";
      //state.bundleQty = "";
      state.remarks = "";
      // state.manualLay = "";
    },
  },
});

export const { setCuttingLayRatio, resetState } = cuttingLayRatio.actions;
export default cuttingLayRatio.reducer;
