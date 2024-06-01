import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplier: null,
  b2bLc: null,
  invoiceNo: null,
  masterLc: null,
  paymentTerm: null,
  modeOfLC: null,
  acceptedDate: null,
  maturityDate: null,
  submissionDate: null,
  invoiceValue: "",
  ref: "",
  acceptedAmount: "",
  exchangeRate: "",
  remarks: "",
  //
  editTableData: [],
};

const acceptance = createSlice({
  name: "acceptance",
  initialState,
  reducers: {
    setAcceptance: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetAcceptanceAll: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setAcceptance, resetAcceptanceAll } = acceptance.actions;
export default acceptance.reducer;
