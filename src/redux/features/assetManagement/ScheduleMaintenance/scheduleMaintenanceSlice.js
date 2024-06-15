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
    serviceType: null,
    doneBy: ""
}

const scheduleMaintenanceSlice = createSlice({
    name: 'scheduleMaintenance',
    initialState,
    reducers: {
        setScheduleMaintenance: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        },
        setResetScheduleMaintenance: (state, action) => {
            state.assetNo = null,
                state.brand = "",
                state.model = "",
                state.description = "",
                state.currentHolder = "",
                state.floor = "",
                state.line = "",
                state.nextServiceDate = null,
                state.LastServiceDate = null,
                state.itemToBeReplace = "",
                state.readyDate = null,
                state.serviceType = null
            state.doneBy = ""
        }
    }
})

export const { setScheduleMaintenance, setResetScheduleMaintenance } = scheduleMaintenanceSlice.actions
export default scheduleMaintenanceSlice.reducer