import { createSlice } from "@reduxjs/toolkit";

const rentedAssetApprovalSlice = createSlice({
    name: "rentedAssetApproval",
    initialState: {
        data: ""
    },
    reducers: {
        setRentedAssetApproval: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        }
    }
})

export const { setRentedAssetApproval } = rentedAssetApprovalSlice.actions
export default rentedAssetApprovalSlice.reducer