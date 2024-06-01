import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gatePassType: null,
  company: null,
  department: null,
  section: null,
  deliverTo: "",
  store: null,
  description: "",
  qty: "",
  unit: null,
  purpose: "",
  currierBy: "",
  mobileNo: "",
  deliveryAddress: "",
  orderBy: "",
  status: null,
  remarks: "",
  addTableData: [],
};

const createGatePass = createSlice({
  name: "createGatePass",
  initialState,
  reducers: {
    setGeneralGatePass: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setGeneralGatePass } = createGatePass.actions;
export default createGatePass.reducer;
