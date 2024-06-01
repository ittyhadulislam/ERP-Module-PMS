/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import { Box, Grid, Stack } from '@mui/material';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomTextInput from '../inputs/CustomTextInput';
import SubmitButton from '../buttons/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAssetNoForRunningRepairQuery, useLazyGetDetailsBasedOnAssetNoForRunningRepairQuery } from '../../redux/features/assetManagement/runningRepair/queryRunningRepair';
import { clearFieldRunningRepair, setRunningRepair } from '../../redux/features/assetManagement/runningRepair/runningRepairSlice';
import { useSaveRunningRepairMutation } from '../../redux/features/assetManagement/runningRepair/mutationRunningRepair';
import { successToast } from '../../common/toaster/toaster';

const RunningRepairInput = ({ setRefetch }) => {


    const { user } = useSelector(state => state.auth)

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
        lastServiceDate,
        repairDate,
        repairDescription,
        itemReplace,
        faultReportedTime,
        downTime,
        AttendedTime,
        readyDate,
        doneBy
    } = useSelector(state => state.runningRepair)

    console.log(assetNo)
    console.log(brand)


    // ===== Asset No =====
    const { data: assetNoData, isLoading: isAssetNoLoading } = useGetAssetNoForRunningRepairQuery()


    // ===== get Data Based on Asset No ======
    const [setDetailsAssetNo, { data: showDetails }] = useLazyGetDetailsBasedOnAssetNoForRunningRepairQuery()

    useEffect(() => {
        setDetailsAssetNo(assetNo?.mcAsstNo)
    }, [assetNo?.mcAsstNo, setDetailsAssetNo])

    console.log(showDetails);

    useEffect(() => {
        if (assetNo && showDetails) {
            // console.log("Hello World")
            dispatch(setRunningRepair({ key: "brand", value: showDetails[0]?.mcMake }))
            dispatch(setRunningRepair({ key: "model", value: showDetails[0]?.mcModel }))
            dispatch(setRunningRepair({ key: "description", value: showDetails[0]?.acat_name }))
            dispatch(setRunningRepair({ key: "currentHolder", value: showDetails[0]?.cCmpName }))
            dispatch(setRunningRepair({ key: "floor", value: showDetails[0]?.cFloor_Descriptin }))
            dispatch(setRunningRepair({ key: "line", value: showDetails[0]?.line_No }))
        }
        else {
            dispatch(setRunningRepair({ key: "brand", value: "" }))
            dispatch(setRunningRepair({ key: "model", value: "" }))
            dispatch(setRunningRepair({ key: "description", value: "" }))
            dispatch(setRunningRepair({ key: "currentHolder", value: "" }))
            dispatch(setRunningRepair({ key: "floor", value: "" }))
            dispatch(setRunningRepair({ key: "line", value: "" }))
        }
    }, [assetNo, showDetails])






    // ----- Post -----

    const [saveData, { isLoading: isSaveDataLoading }] = useSaveRunningRepairMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = [
                {
                    assetno: assetNo?.mcAsstNo,
                    nextservicedate: nextServiceDate,
                    lastservicedate: lastServiceDate,
                    repairdate: repairDate,
                    repairdetails: repairDescription,
                    itemreplace: itemReplace,
                    faultreporttime: parseInt(faultReportedTime),
                    downtime: parseInt(downTime),
                    attendendtime: parseInt(AttendedTime),
                    readydate: readyDate,
                    doneby: doneBy,
                    inputby: user?.userName
                }
            ]
            console.log(payload)
            const response = await saveData(payload)
            console.log(response)

            if (response) {
                successToast(response?.data?.message)
                setRefetch((prev) => prev + 1)
                dispatch(clearFieldRunningRepair())
            }
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(assetNo);

    return (
        <>
            <CustomAppBar title={"RUNNING REPAIR"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form onSubmit={handelSubmit}>
                    <Grid container spacing={1} mt={"5px"}>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset No#"}
                                name='assetNo'
                                options={assetNoData ?? []}
                                optionId={"mcAsstNo"}
                                optionLabel={"mcAsstNo"}
                                value={assetNo}
                                setReduxState={setRunningRepair}
                                loading={isAssetNoLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Brand"}
                                name='brand'
                                value={brand}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Model"}
                                name='model'
                                value={model}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Description"}
                                name='description'
                                value={description}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Current Holder"}
                                name='currentHolder'
                                value={currentHolder}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Floor"}
                                name='floor'
                                value={floor}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Line"}
                                name='line'
                                value={line}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Next Service Date"}
                                name='nextServiceDate'
                                value={nextServiceDate}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Last Service Date"}
                                name='lastServiceDate'
                                value={lastServiceDate}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Repair Date"}
                                name='repairDate'
                                value={repairDate}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Repair Description"}
                                name='repairDescription'
                                value={repairDescription}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Item Replace"}
                                name='itemReplace'
                                value={itemReplace}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Fault Reported Time"}
                                type='number'
                                name='faultReportedTime'
                                value={faultReportedTime}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Down Time"}
                                type='number'
                                name='downTime'
                                value={downTime}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Attended Time"}
                                type='number'
                                name='AttendedTime'
                                value={AttendedTime}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Ready Date"}
                                name='readyDate'
                                value={readyDate}
                                setReduxState={setRunningRepair}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Done By"}
                                name='doneBy'
                                value={doneBy}
                                setReduxState={setRunningRepair}
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
                                loading={isSaveDataLoading}
                            />
                        </Stack>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default RunningRepairInput;