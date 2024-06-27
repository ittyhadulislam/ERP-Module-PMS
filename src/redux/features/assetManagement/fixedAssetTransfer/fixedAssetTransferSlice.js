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
        },
        setResetFixedAssetTransferInternal: (state, action) => {
            state.companyName = null,
                state.fromFloor = null,
                state.fromLine = null,
                state.assetNo = null,
                state.transferDate = null,
                state.toFloor = null,
                state.toLine = null,
                state.fromCompany = null,
                state.toCompany = null,
                state.remarks = ""
        },
        setResetFixedAssetTransferExternal: (state, action) => {
            state.transferDate = null,
                state.fromCompany = null,
                state.toCompany = null,
                state.remarks = ""
        },
    }
})

export const {
    setFixedAssetTransfer,
    setResetFixedAssetTransferInternal,
    setResetFixedAssetTransferExternal,
} = fixedAssetTransferSlice.actions

export default fixedAssetTransferSlice.reducer

// state.companyName = null,
//     state.fromFloor = null,
//     state.fromLine = null,
//     state.assetNo = null,
//     state.transferDate = null,
//     state.toFloor = null,
//     state.toLine = null,
//     state.fromCompany = null,
//     state.toCompany = null,
//     state.remarks = "",