import { createSlice } from "@reduxjs/toolkit";

const commercialReport = createSlice({
  name: "commercialReport",
  initialState: {
    company: null,
    masterLcNo: null,
    title: "",
    reportData: null,
    modalOpen: false,
  },
  reducers: {
    setCommercialReport: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setCommercialReport } = commercialReport.actions;
export default commercialReport.reducer;
