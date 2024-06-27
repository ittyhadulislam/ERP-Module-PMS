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
        },
        setResetReport: (state, action) => {
            state.company = null

            // state.fromDate = null,
            // state.toDate = null,
            // state.AssetCategory = null,
            // state.status = null,
            // state.floor = null,
            // state.line = null
        },
        setResetReportForExternal: (state, action) => {
            state.fromCom = null,
                state.toCom = null
        }
    })
})

export const { setAssetReport, setResetReport, setResetReportForExternal } = assetReportSlice.actions
export default assetReportSlice.reducer