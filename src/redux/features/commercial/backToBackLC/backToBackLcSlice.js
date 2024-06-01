import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null,
  lcIssuingBank: null,
  backToBackLC: "",
  contract: null,
  buyer: null,
  beneficiary: null,
  receiveBank: null,
  openingDate: null,
  deliveryDate: null,
  docRecvDate: null,
  expiryDate: null,
  b2bLCValue: "",
  amendmentDate: null,
  paymentTerm: null,
  currency: null,
  lcStatus: null,
  //
  exchangeRate: "",
  udAmendment: "",
  ud: "",
  itemDescription: "",
  remarks: "",
  contractValue: "",
  bblcLimit: "",
  bblcOpened: "",
  balance: "",
  //
  otherCharge: 0,
  selectedRows: [],
  availablePIData: [],
  amendment: false,
  amendmentValue: 0,
  existingAvailablePIData: [],
  existingChargeData: [],
  existingBackToBackFieldsData: [],
  availablePILoading: false,
};

const backToBackLC = createSlice({
  name: "backToBackLC",
  initialState,
  reducers: {
    setBackToBack: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    reSetBackToBack: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setBackToBack, reSetBackToBack } = backToBackLC.actions;
export default backToBackLC.reducer;
