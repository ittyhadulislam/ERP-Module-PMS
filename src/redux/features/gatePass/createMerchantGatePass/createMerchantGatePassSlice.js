import { createSlice } from "@reduxjs/toolkit";

const merchantGatePass = createSlice({
  name: "merchantGatePass",
  initialState: {
    company: null,
    buyer: null,
    itemType: null,
    deliverTo: null,
    department: null,
    style: null,
    section: null,
    status: null,
    returnableDate: null,
    unit: null,

    itemDescription: "",
    deliveryAddress: "",
    garmentsType: "",
    qty: "",
    attention: "",
    orderBy: "",
    attMobileNo: "",
    ordMobileNo: "",
    currierBy: "",
    mobileNo: "",
    remarks: "",
    addTableData: [],
  },
  reducers: {
    setMerchantGatePass: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setMerchantGatePass } = merchantGatePass.actions;
export default merchantGatePass.reducer;
