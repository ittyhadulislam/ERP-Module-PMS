import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  category: null,
  section: null,
  gatePass: null,
  receiveDate: null,
  challanNo: "",
};
const returnGoodsReceive = createSlice({
  name: "returnGoodsReceive",
  initialState,
  reducers: {
    setReturnGoods: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetReturnGoods: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setReturnGoods, resetReturnGoods } = returnGoodsReceive.actions;
export default returnGoodsReceive.reducer;
