import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentHolder: null,
    floor: null,
    line: null,
    challanNoText: "",
    rentedDate: null,
    returnDate: null,
    assetCategory: null,
    assetSpatialFeature: null,
    assetStatus: null,
    assetName: null,
    assetNo: "",
    serialNo: "",
    brand: null,
    model: "",
    supplier: null,
    costParDay: "",
    currency: null,
    totalRentedDays: "",
}

const rentedAssetSlice = createSlice({
    name: "rentedAsset",
    initialState,
    reducers: {
        setRentedAsset: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        },
        setRentedAssetReset: (state, action) => {
            state.currentHolder = null,
                state.floor = null,
                state.line = null,
                state.challanNoText = "",
                state.rentedDate = null,
                state.returnDate = null,
                state.assetCategory = null,
                state.assetSpatialFeature = null,
                state.assetStatus = null,
                state.assetName = null,
                state.assetNo = "",
                state.serialNo = "",
                state.brand = null,
                state.model = "",
                state.supplier = null,
                state.costParDay = "",
                state.currency = null,
                state.totalRentedDays = ""
        },
    }
})

export const { setRentedAsset, setRentedAssetReset } = rentedAssetSlice.actions
export default rentedAssetSlice.reducer