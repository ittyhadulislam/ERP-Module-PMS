import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null,
  fileJob: "",
  contract: "",
  exportLC: "",
  buyer: null,
  issueBank: null,
  receiveBank: null,
  lienBank: null,
  notifyParty: null,
  bblcLimit: "",
  paymentMode: null,
  openingDate: null,
  amendmentDate: null,
  currency: null,
  partialShipment: null,
  paymentTerm: null,
  expiryDate: null,
  shipmentMode: null,
  insuranceValue: "",
  status: null,
  lastShipmentDate: null,
  freightValue: "",
  UDVersion: "",
  UD: "",
  UDIssueDate: null,
  quantity: "",
  contractValue: "",
  autoCalculate: "",
  other: "",
  totalCommission: "",
  percent: "",
  //---->
  availableSelectedRows: [],
  removeSelectedStyleTableData: [],
  tableDataInRedux: [],
  amendment: false,
  amendmentValue: 0,
  saveCount: 0,
  contractData: null,
  contractFormData: null,
};

const contract = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContract: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setTableData: (state, action) => {
      state.tableDataInRedux = action.payload;
    },
    selectAndDelete: (state, action) => {
      state.tableDataInRedux = state?.tableDataInRedux?.map((e) => {
        if (e.nOID === action.payload.nOID) {
          return { ...e, lcuse: !e.lcuse };
        } else return e;
      });
    },
    resetContract: (state, action) => {
      return (state = {
        ...initialState,
        contract: state.contract,
        company: state.company,
      });
    },
    resetAll: (state, action) => {
      return (state = { ...initialState, company: state.company });
    },
  },
});

export const {
  setContract,
  setTableData,
  selectAndDelete,
  resetContract,
  resetAll,
} = contract.actions;
export default contract.reducer;
