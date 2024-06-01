import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplier: null,
  b2bLc: null,
  ref: "",
  invoice: "",
  date: null,
  adjustments: "",
  //
  grnList: [],
  grnLoading: false,
  addGrnList: [],
  addGrnLoading: false,
  //
  submissionDate: null,
  piDetails: [],
  lcDetails: {},
  localNextLoading: false,
  invoiceValue: "",
  invoiceQty: "",
  unit: null,
  agent: "",
  docsDate: null,
  MVesselName: "",
  originalDate: null,
  shipmentMode: null,
  MVesselETD: null,
  originalToCF: null,
  awbNo: "",
  FVesselName: "",
  goodsInHouse: null,
  blDate: null,
  FVesselETD: null,
  billOfEntry: null,
  containerNo: "",
  carrierName: "",
  landingPort: "",
  billOfEntryNo: "",
  passBookPageNo: "",
  FVesselETA: null,
};

const localInvoice = createSlice({
  name: "localInvoice",
  initialState,
  reducers: {
    setLocalInvoice: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetLocalInvoiceAll: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setLocalInvoice, resetLocalInvoiceAll } = localInvoice.actions;
export default localInvoice.reducer;
