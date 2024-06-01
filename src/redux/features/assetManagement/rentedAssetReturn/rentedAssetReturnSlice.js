import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    returnDate: null,
    currentHolder: null,
    supplier: null,
}

const rentedAssetReturnSlice = createSlice({
    name: "rentedAssetReturn",
    initialState,
    reducers: {
        setRentedAssetReturn: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        }
    }
})

export const { setRentedAssetReturn } = rentedAssetReturnSlice.actions
export default rentedAssetReturnSlice.reducer