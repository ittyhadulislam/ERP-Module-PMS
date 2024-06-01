import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderType: null,
  customer: null,
  buyer: null,
  color: null,
  fabricType: null,
  fabricComposition: null,
  fabricConstruction: null,
  fabricColor: null,
  gsm: null,
  design: null,
  dia: null,
  unit: null,
  //--text
  orderNo: "",
  gmtName: "",
  gmtQty: "",
  fabricConsumption: "",
  fabricQty: "",
  orderReceiveDate: null,
  deliveryDate: null,
  remarks: "",
  //-- other state
  selectedTableRow: null,
};

const orderReceiveSlice = createSlice({
  name: "orderReceive",
  initialState,
  reducers: {
    setOrderReceive: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetOrderReceive: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setOrderReceive, resetOrderReceive } = orderReceiveSlice.actions;
export default orderReceiveSlice.reducer;
