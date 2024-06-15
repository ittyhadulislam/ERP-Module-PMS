import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    company: null,
    department: null,
    section: null,
    floor: null,
    line: null,
    purchaseDate: null,
    assetCategory: null,
    assetSpacialFeature: null,
    assetStatus: "",
    assetName: "",
    assetNo: "",
    serialNumber: "",
    brand: null,
    model: "",
    supplier: null,
    assetValue: "",
    currency: null,
    depreciatedValue: "",
    depreciatedPeriod: "",
    billNo: "",
    billInputDate: null,
    lcNo: "",
    lcDate: null,
    commercialInvoiceNo: "",
    commercialInvoiceDate: null,
    warrantyExpireDate: null,
    currentHolder: null,
    commencingDate: null,
    inhouseDate: null,
    remarks: "",
}

const assetMasterSlice = createSlice({
    name: "assetMaster",
    initialState,
    reducers: {
        setAssetMaster: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        },

        resetAssetMaster: (state, action) => {
            state.company = null,
                state.department = null,
                state.section = null,
                state.floor = null,
                state.line = null,
                state.purchaseDate = null,
                state.assetCategory = null,
                state.assetSpacialFeature = null,
                state.assetStatus = null,
                state.assetName = null,
                state.assetNo = "",
                state.serialNumber = "",
                state.brand = null,
                state.model = "",
                state.supplier = "",
                state.assetValue = "",
                state.currency = null,
                state.depreciatedValue = "",
                state.depreciatedPeriod = "",
                state.billNo = "",
                state.billInputDate = null,
                state.lcNo = "",
                state.lcDate = null,
                state.commercialInvoiceNo = "",
                state.commercialInvoiceDate = null,
                state.warrantyExpireDate = null,
                state.currentHolder = null,
                state.commencingDate = null,
                state.inhouseDate = null,
                state.remarks = ""
        }
    }
})

export const { setAssetMaster, resetAssetMaster } = assetMasterSlice.actions
export default assetMasterSlice.reducer