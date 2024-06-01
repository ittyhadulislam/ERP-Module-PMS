import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderNumber: null,
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

const editOrderReceiveSlice = createSlice({
  name: "editOrderReceive",
  initialState,
  reducers: {
    setEditOrderReceive: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetEditOrderReceive: (state, action) => {
      return (state = { ...initialState, orderNumber: state.orderNumber });
    },
  },
});

export const { setEditOrderReceive, resetEditOrderReceive } =
  editOrderReceiveSlice.actions;
export default editOrderReceiveSlice.reducer;
