import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import { Box, Grid, Stack } from '@mui/material';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomTextInput from '../inputs/CustomTextInput';
import SubmitButton from '../buttons/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAssetNoScheduleMaintenanceQuery, useLazyGetDetailsBasedOnAssetNoForScheduleMaintenanceQuery } from '../../redux/features/assetManagement/ScheduleMaintenance/queryScheduleMaintenance';
import { setScheduleMaintenance } from '../../redux/features/assetManagement/ScheduleMaintenance/scheduleMaintenanceSlice';

const ScheduleMaintenanceInput = () => {
    const dispatch = useDispatch()

    const {
        assetNo,
        brand,
        model,
        description,
        currentHolder,
        floor,
        line,
        nextServiceDate,
        LastServiceDate,
        itemToBeReplace,
        readyDate,
        doneBy
    } = useSelector(state => state.scheduleMaintenance)

    // ----- Asset No -----
    const { data: getAssetNo, isLoading: isAssetNoLoading } = useGetAssetNoScheduleMaintenanceQuery()

    // ----- Get Details Based No Asset No -----
    const [setDataInState, { data: getData }] = useLazyGetDetailsBasedOnAssetNoForScheduleMaintenanceQuery()

    useEffect(() => {
        setDataInState(assetNo?.mcAsstNo)
    }, [assetNo?.mcAsstNo, setDataInState])

    console.log(getData)

    useEffect(() => {
        if (assetNo && getData) {
            dispatch(setScheduleMaintenance({ key: "brand", value: getData[0]?.mcMake }))
            dispatch(setScheduleMaintenance({ key: "model", value: getData[0]?.mcModel }))
            dispatch(setScheduleMaintenance({ key: "description", value: getData[0]?.acat_name }))
            dispatch(setScheduleMaintenance({ key: "currentHolder", value: getData[0]?.cCmpName }))
            dispatch(setScheduleMaintenance({ key: "floor", value: getData[0]?.cFloor_Descriptin }))
            dispatch(setScheduleMaintenance({ key: "line", value: getData[0]?.line_No }))
        }
        else {
            dispatch(setScheduleMaintenance({ key: "brand", value: "" }))
            dispatch(setScheduleMaintenance({ key: "model", value: "" }))
            dispatch(setScheduleMaintenance({ key: "description", value: "" }))
            dispatch(setScheduleMaintenance({ key: "currentHolder", value: "" }))
            dispatch(setScheduleMaintenance({ key: "floor", value: "" }))
            dispatch(setScheduleMaintenance({ key: "line", value: "" }))
        }
    }, [assetNo && getData])


    return (
        <>
            <CustomAppBar title={"SCHEDULE MAINTENANCE"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form>
                    <Grid container spacing={1} mt={"5px"}>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset No#"}
                                name="assetNo"
                                options={getAssetNo ?? []}
                                optionId={"mcAsstNo"}
                                optionLabel={"mcAsstNo"}
                                value={assetNo}
                                loading={isAssetNoLoading}
                                setReduxState={setScheduleMaintenance}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Brand"}
                                name='brand'
                                value={brand}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Model"}
                                name='model'
                                value={model}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Description"}
                                name='description'
                                value={description}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Current Holder"}
                                name='currentHolder'
                                value={currentHolder}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Floor"}
                                name='floor'
                                value={floor}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Line"}
                                name='line'
                                value={line}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Next Service Date"}
                                name='nextServiceDate'
                                value={nextServiceDate}
                                setReduxState={setScheduleMaintenance}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Last Service Date"}
                                name='LastServiceDate'
                                value={LastServiceDate}
                                setReduxState={setScheduleMaintenance}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Items to be Replaced"}
                                name='itemToBeReplace'
                                value={itemToBeReplace}
                                setReduxState={setScheduleMaintenance}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Ready Date"}
                                name='readyDate'
                                value={readyDate}
                                setReduxState={setScheduleMaintenance}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Done By"}
                                name='doneBy'
                                value={doneBy}
                                setReduxState={setScheduleMaintenance}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
                        <Stack
                            direction={"row"}
                            p={0.5}
                            spacing={2}
                            justifyContent="end"
                        >
                            <SubmitButton
                                title={"Save"}
                                type='submit'
                            />
                        </Stack>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default ScheduleMaintenanceInput;