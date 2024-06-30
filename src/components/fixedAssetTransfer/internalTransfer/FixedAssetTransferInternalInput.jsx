import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CustomAppBar from '../../common/CustomAppBar';
import CustomDatePicker from '../../inputs/CustomDatePicker';
import CustomAutocomplete from '../../inputs/CustomAutocomplete';
import CustomTextInput from '../../inputs/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import {
    setFixedAssetTransfer,
    setResetFixedAssetTransferInternal
} from '../../../redux/features/assetManagement/fixedAssetTransfer/fixedAssetTransferSlice';
import SubmitButton from '../../buttons/SubmitButton';
import { useSaveFixedAssetTransferInternalMutation } from '../../../redux/features/assetManagement/fixedAssetTransfer/mutationFixedAssetTransfer';
import {
    useGetCompanyForFixedAssetTransferQuery,
    useLazyGetAssetNoForFixedAssetTransferInternalQuery,
    useLazyGetFloorForFixedAssetTransferQuery,
    useLazyGetLineForFixedAssetTransferQuery
} from '../../../redux/features/assetManagement/fixedAssetTransfer/queryFixedAssetTransfer';
import { successToast } from '../../../common/toaster/toaster';
import ResetButton from '../../buttons/ResetButton';



// eslint-disable-next-line react/prop-types
const FixedAssetTransferInternalInput = ({ setRefetchData }) => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    // console.log(user?.userName);

    const {
        companyName,
        fromFloor,
        fromLine,
        assetNoInternal,
        transferDate,
        toFloor,
        toLine,
        remarks,
    } = useSelector(state => state.fixedAssetMaster)


    // ========== Company Name =================
    const { data: getCompanyData, isLoading: isCompanyLoading } = useGetCompanyForFixedAssetTransferQuery()
    // console.log(companyName)

    // ========== Floor Name ===================
    const [setFloorData, { data: floorData, isLoading: isFloorLoading }] = useLazyGetFloorForFixedAssetTransferQuery()

    useEffect(() => {
        if (companyName) {
            setFloorData(companyName?.nCompanyID)
        }
    }, [companyName])

    // console.log(fromFloor)

    // ========== Line Name (From) ===================

    const [setFromLineData, { data: fromLineData, isLoading: isFromLineLoading }] = useLazyGetLineForFixedAssetTransferQuery()

    useEffect(() => {
        if (companyName && fromFloor) {
            setFromLineData({ comID: companyName?.nCompanyID, floorID: fromFloor?.nFloor })
        }
    }, [companyName, fromFloor])

    // ========== Line Name (To) ===================

    const [setToLineData, { data: toLineData, isLoading: isToLineLoading }] = useLazyGetLineForFixedAssetTransferQuery()

    useEffect(() => {
        if (companyName && toFloor) {
            setToLineData({ comID: companyName?.nCompanyID, floorID: toFloor?.nFloor })
        }
    }, [companyName, toFloor])


    // console.log(fromLine)

    // ========== Asset No ===================
    const [setAssetNo, { data: assetNoDate, isLoading: isAssetNoLoading }] = useLazyGetAssetNoForFixedAssetTransferInternalQuery()

    useEffect(() => {
        if (companyName && fromFloor && fromLine) {
            setAssetNo({ comID: companyName?.nCompanyID, floorID: fromFloor?.nFloor, lineID: fromLine?.line_Code })
        }
    }, [companyName, fromFloor, fromLine])

    // console.log(assetNo?.mcAsstNo)

    // ========== Save ==========

    const [passInternalData, { isLoading: isPassInternalDataLoading }] = useSaveFixedAssetTransferInternalMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = [
                {
                    date: transferDate,
                    comFrom: companyName?.nCompanyID,
                    comTo: companyName?.nCompanyID,
                    floorFrom: fromFloor?.nFloor,
                    floorTo: toFloor?.nFloor,
                    lineFrom: fromLine?.line_Code,
                    lineTo: toLine?.line_Code,
                    assetNo: assetNoInternal?.mcAsstNo,
                    status: "IN",
                    remarks: remarks,
                    inputUser: user?.userName
                }
            ]

            console.log(payload)
            const res = await passInternalData(payload)
            console.log(res)
            if (res) {
                successToast(res?.data?.message)
                setRefetchData(prev => prev + 1)
                dispatch(setResetFixedAssetTransferInternal())
            }
        } catch (err) {
            console.log(err)
        }
    }

    // ===== reset =====
    const handelReset = () => {
        dispatch(setResetFixedAssetTransferInternal())
    }

    return (
        <>
            <form onSubmit={handelSubmit}>
                <Grid container spacing={2} marginBottom={2}>
                    <Grid item xs={12} sm={6}>
                        <CustomAppBar title={"From"} />
                        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                            <Grid container spacing={1} mt={"1px"}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomDatePicker
                                        label={"Transfer Date"}
                                        name='transferDate'
                                        value={transferDate}
                                        setReduxState={setFixedAssetTransfer}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomAutocomplete
                                        label={"Company"}
                                        name={"companyName"}
                                        options={getCompanyData?.result ?? []}
                                        optionId={"nCompanyID"}
                                        optionLabel={"cCmpName"}
                                        value={companyName}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isCompanyLoading}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomAutocomplete
                                        label={"Floor"}
                                        name={"fromFloor"}
                                        options={companyName ? floorData?.result ?? [] : []}
                                        optionId={"nFloor"}
                                        optionLabel={"cFloor_Descriptin"}
                                        value={fromFloor}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isFloorLoading}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomAutocomplete
                                        label={"Line"}
                                        name={"fromLine"}
                                        options={companyName && fromFloor ? fromLineData?.result ?? [] : []}
                                        optionId={"line_Code"}
                                        optionLabel={"line_No"}
                                        value={fromLine}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isFromLineLoading}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <CustomAutocomplete
                                        label={"Asset No#"}
                                        name={"assetNoInternal"}
                                        options={companyName && fromFloor && fromLine ? assetNoDate?.result ?? [] : []}
                                        optionId={"mcAsstNo"}
                                        optionLabel={"mcAsstNo"}
                                        value={assetNoInternal}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isAssetNoLoading}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomAppBar title={"To"} />
                        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                            <Grid container spacing={1} mt={"1px"}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Floor"}
                                        name={"toFloor"}
                                        options={companyName ? floorData?.result ?? [] : []}
                                        optionId={"nFloor"}
                                        optionLabel={"cFloor_Descriptin"}
                                        value={toFloor}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isFloorLoading}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Line"}
                                        name={"toLine"}
                                        options={companyName && toFloor ? toLineData?.result ?? [] : []}
                                        optionId={"line_Code"}
                                        optionLabel={"line_No"}
                                        value={toLine}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isToLineLoading}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={12}>
                                    <CustomTextInput
                                        label={"Remarks"}
                                        name='remarks'
                                        value={remarks}
                                        setReduxState={setFixedAssetTransfer}
                                        multiline={true}
                                    />
                                </Grid>
                            </Grid>

                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px", marginBottom: 2 }}>
                    <Stack
                        direction={"row"}
                        p={0.5}
                        spacing={2}
                        justifyContent="end"
                    >
                        <ResetButton
                            title={"Clear"}
                            type='reset'
                            handleClick={handelReset}
                        />
                        <SubmitButton
                            title={"Save"}
                            type='submit'
                            loading={""}
                            disabled={assetNoInternal ? false : true}
                        />
                    </Stack>
                </Box>
            </form>
        </>
    );
};

export default FixedAssetTransferInternalInput;