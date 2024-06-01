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
  foreignNextLoading: false,
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

const foreignInvoice = createSlice({
  name: "foreignInvoice",
  initialState,
  reducers: {
    setForeignInvoice: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetForeignInvoiceAll: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setForeignInvoice, resetForeignInvoiceAll } =
  foreignInvoice.actions;
export default foreignInvoice.reducer;
