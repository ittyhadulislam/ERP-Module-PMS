import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    company: null,
    fromCom: null,
    toCom: null,
    fromDate: null,
    toDate: null,
    AssetCategory: null,
    status: null,
    floor: null,
    line: null
}

const assetReportSlice = createSlice({
    name: "assetReport",
    initialState,
    reducers: ({
        setAssetReport: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        }
    })
})

export const { setAssetReport } = assetReportSlice.actions
export default assetReportSlice.reducer