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
    lastServiceDate: null,
    repairDate: null,
    repairDescription: "",
    itemReplace: "",
    faultReportedTime: "",
    downTime: "",
    AttendedTime: "",
    readyDate: null,
    doneBy: ""
}

const runningRepairSlice = createSlice({
    name: "runningRepair",
    initialState,
    reducers: {
        setRunningRepair: (state, action) => {
            const { key, value } = action.payload
            state[key] = value
        },
        clearFieldRunningRepair: (state, action) => {
            state.assetNo = null,
                state.brand = "",
                state.model = "",
                state.description = "",
                state.currentHolder = "",
                state.floor = "",
                state.line = "",
                state.nextServiceDate = null,
                state.lastServiceDate = null,
                state.repairDate = null,
                state.repairDescription = "",
                state.itemReplace = "",
                state.faultReportedTime = "",
                state.downTime = "",
                state.AttendedTime = "",
                state.readyDate = null,
                state.doneBy = ""
        }
    }
})

export const { setRunningRepair, clearFieldRunningRepair } = runningRepairSlice.actions
export default runningRepairSlice.reducer