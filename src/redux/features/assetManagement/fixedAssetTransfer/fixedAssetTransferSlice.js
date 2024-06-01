import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companyName: null,
    fromFloor: null,
    fromLine: null,
    assetNo: null,
    transferDate: null,
    toFloor: null,
    toLine: null,
    fromCompany: null,
    toCompany: null,
    remarks: "",
    user: ""
}

const fixedAssetTransferSlice = createSlice({
    name: "fixedAssetMaster",
    initialState,
    reducers: {
        setFixedAssetTransfer: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        }
    }
})

export const { setFixedAssetTransfer } = fixedAssetTransferSlice.actions
export default fixedAssetTransferSlice.reducer