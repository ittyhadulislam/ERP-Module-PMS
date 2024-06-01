import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderNo: null,
  orderInfo: null,
  exchangeRate: "",
  fillingLength: "",
  greigeWith: "",
  bwGSM: "",
  coverFactor: "",
  totalEnds: "",
  processAllowance: "",
  //
  warpYarnRate: 0,
  weftYarnRate: 0,
  //
  consumpstionWarpkgyds: 0,
  consumpstionWeftkgyds: 0,
  warpYarnCostYds: 0,
  weftYarnCostYds: 0,
  //
  YarnInfoTable: null,
  manufactureInfoTable: null,
  costingInfoTable: null,
};

const costingSlice = createSlice({
  name: "costing",
  initialState,
  reducers: {
    setCostingState: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    reSetCostingState: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setCostingState, reSetCostingState } = costingSlice.actions;
export default costingSlice.reducer;
