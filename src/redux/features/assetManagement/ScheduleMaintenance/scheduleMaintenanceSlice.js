import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assetNo: null,
    brand: "",
    model: "",
    description: "",
    currentHolder: "",
    floor: "",
    line: "",
    nextServiceDate: null,
    LastServiceDate: null,
    itemToBeReplace: "",
    readyDate: null,
    doneBy: ""
}

const scheduleMaintenanceSlice = createSlice({
    name: 'scheduleMaintenance',
    initialState,
    reducers: {
        setScheduleMaintenance: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        }
    }
})

export const { setScheduleMaintenance } = scheduleMaintenanceSlice.actions
export default scheduleMaintenanceSlice.reducer