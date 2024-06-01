import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null,
  invoice: "",
  invoiceDate: null,
  invoiceValue: "",
  exchangeRate: "",
  invoicePCSQty: "",
  itemDescription: "",
  exp: "",
  date: null,
  contract: null,
  issuingBank: "",
  notifyParty: "",
  bl: "",
  blDate: null,
  factory: null,
  consignee: null,
  shippingBill: "",
  shippingBillDate: null,
  shipMode: null,
  portOfLanding: null,
  finalDestination: null,
  carrierBy: "",
  paymentTerm: null,
  passBookPage: "",
};

const exportInvoice = createSlice({
  name: "exportInvoice",
  initialState,
  reducers: {
    setExportInvoice: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetExportInvoiceAll: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { setExportInvoice, resetExportInvoiceAll } =
  exportInvoice.actions;
export default exportInvoice.reducer;
