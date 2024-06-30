/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import { Box, Grid, Stack } from '@mui/material';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomTextInput from '../inputs/CustomTextInput';
import SubmitButton from '../buttons/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAssetNoScheduleMaintenanceQuery, useLazyGetDetailsBasedOnAssetNoForScheduleMaintenanceQuery } from '../../redux/features/assetManagement/ScheduleMaintenance/queryScheduleMaintenance';
import { setResetScheduleMaintenance, setScheduleMaintenance } from '../../redux/features/assetManagement/ScheduleMaintenance/scheduleMaintenanceSlice';
import { useScheduleMaintenanceSaveMutation } from '../../redux/features/assetManagement/ScheduleMaintenance/mutationScheduleMaintenance';
import { errorToast, successToast } from '../../common/toaster/toaster';

const ScheduleMaintenanceInput = ({ getServiceType, setIsSuccess = () => { } }) => {
    // console.log(getServiceType)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

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

    // console.log(getData)

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

    // === Post ===

    const [passPayloadOverApi] = useScheduleMaintenanceSaveMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = {
                scheduleMaintenanceModels: [
                    {
                        assetno: assetNo?.mcAsstNo,
                        nextservicedate: nextServiceDate,
                        itemreplace: itemToBeReplace,
                        readydate: readyDate,
                        doneby: doneBy,
                        inputUser: user?.userName
                    }
                ],
                smServiceTypeSaveModels: getServiceType?.map((item) => (
                    {
                        assetno: assetNo?.mcAsstNo,
                        serviceID: item?.id,
                        readyDate: readyDate,
                        inputUser: user?.userName
                    }
                )),
            }

            console.log(payload)
            const res = await passPayloadOverApi(payload)
            if (res) {
                successToast(res?.data?.message)
                dispatch(setResetScheduleMaintenance())
                setIsSuccess(true)
            }
            else {
                errorToast("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <CustomAppBar title={"SCHEDULE MAINTENANCE"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form onSubmit={handelSubmit}>
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
                                required={true}
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
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Last Service Date"}
                                name='LastServiceDate'
                                value={LastServiceDate}
                                setReduxState={setScheduleMaintenance}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Items to be Replaced"}
                                name='itemToBeReplace'
                                value={itemToBeReplace}
                                setReduxState={setScheduleMaintenance}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Ready Date"}
                                name='readyDate'
                                value={readyDate}
                                setReduxState={setScheduleMaintenance}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Done By"}
                                name='doneBy'
                                value={doneBy}
                                setReduxState={setScheduleMaintenance}
                                required={true}
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