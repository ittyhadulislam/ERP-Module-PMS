import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  style: null,
  currency: null,
  bookingDate: null,
  sewingStartDate: null,
  buyer: "",
  garmentsType: "",
  season: "",
  styleType: "",
  orderType: "",
  totalGmtQty: "",
  masterCategory: null,
  mainCategory: null,
  subCategory: null,
  constriction: null,
  dimension: null,
  finish: null,
  color: null,
  lastSeasonPrice: "",
  targetPrice: "",
  gmtQty: "",
  itemOrderQty: "",
  unit: null,
  supplier: null,
  paymentType: null,
  priceTerm: null,
  shipMode: null,
  testCost: null,
  qualityStatus: null,
  priceValidity: null,

  initialPrice: "",
  finalPrice: "",
  productionLeadTime: "",
  moq: "",
  upCharge: "",
  isDisabled: false,
  csNo: null,
  selectedTableRow: null,
};
const priceComparison = createSlice({
  name: "priceComparison",
  initialState,
  reducers: {
    setPriceComparison: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetSupplierPriceDetails: (state, action) => {
      state.supplier = null;
      state.paymentType = null;
      state.priceTerm = null;
      state.shipMode = null;
      state.testCost = null;
      state.qualityStatus = null;
      state.priceValidity = null;
      state.initialPrice = "";
      state.finalPrice = "";
      state.moq = "";
      state.productionLeadTime = "";
      state.priceValidity = null;
      state.upCharge = "";
    },
    resetAllFields: (state, action) => {
      const { key, value } = action.payload || {};
      return (state = { ...initialState, [key]: value });
    },
  },
});

export const { setPriceComparison, resetSupplierPriceDetails, resetAllFields } =
  priceComparison.actions;
export default priceComparison.reducer;
