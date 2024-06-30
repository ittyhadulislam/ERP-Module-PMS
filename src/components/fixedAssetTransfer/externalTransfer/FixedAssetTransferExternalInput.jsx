import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CustomAppBar from '../../common/CustomAppBar';
import CustomDatePicker from '../../inputs/CustomDatePicker';
import CustomAutocomplete from '../../inputs/CustomAutocomplete';
import CustomTextInput from '../../inputs/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCompanyForFixedAssetTransferQuery, useLazyGetAssetNoForFixedAssetTransferExternalQuery } from '../../../redux/features/assetManagement/fixedAssetTransfer/queryFixedAssetTransfer';
import { setFixedAssetTransfer, setResetFixedAssetTransferExternal } from '../../../redux/features/assetManagement/fixedAssetTransfer/fixedAssetTransferSlice';
import { useSaveFixedAssetTransferExternalMutation } from '../../../redux/features/assetManagement/fixedAssetTransfer/mutationFixedAssetTransfer';
import SubmitButton from '../../buttons/SubmitButton';
import { successToast } from '../../../common/toaster/toaster';
import CustomMultiAutocomplete from './../../inputs/CustomMultiAutocomplete';
// import MultipleAutoComplete from './../../inputs/CustomMultiAutocomplete';
import ResetButton from './../../buttons/ResetButton';

const FixedAssetTransferExternalInput = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {
        fromCompany,
        toCompany,
        assetNoExternal,
        transferDate,
        remarks,
    } = useSelector(state => state.fixedAssetMaster)

    // console.log(assetNo)

    // ----- company name -----

    const { data: getCompanyData, isLoading: isCompanyLoading } = useGetCompanyForFixedAssetTransferQuery()

    // ----- Asset NO -----

    const [setAssetNo, { data: getAssetNo, isLoading: isAssetNoLoading }] = useLazyGetAssetNoForFixedAssetTransferExternalQuery()

    useEffect(() => {
        if (fromCompany) {
            setAssetNo(fromCompany?.nCompanyID)
        }
    }, [fromCompany, setAssetNo])

    // ========== Post ==========
    const [passExternalData, { isLoading: isFixedAssetTransferLoading }] = useSaveFixedAssetTransferExternalMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = assetNoExternal?.map(singleAssetNo => ({
                date: transferDate,
                comFrom: fromCompany?.nCompanyID,
                comTo: toCompany?.nCompanyID,
                assetNo: singleAssetNo?.mcAsstNo,
                status: "Ex",
                remarks: remarks,
                inputUser: user?.userName,
            }))
            console.log(payload)
            const res = await passExternalData(payload)
            console.log(res)
            if (res) {
                successToast(res?.data?.message)
                // dispatch(setFixedAssetTransfer({ key: "assetNoExternal", value: assetNoExternal }))
                dispatch(setResetFixedAssetTransferExternal())
            }
        } catch (error) {
            console.log(error)
        }
    }

    // ===== Clear Button =====
    const handelReset = () => {
        dispatch(setResetFixedAssetTransferExternal())
    }

    // todo add this in future
    // useEffect(() => {
    //     if (!fromCompany) {
    //         dispatch(setFixedAssetTransfer({ key: "assetNoExternal", value: [] }))
    //         // dispatch(setResetFixedAssetTransferExternal({ key: "assetNoExternal", value: [] }))
    //     }
    // }, [dispatch, fromCompany])

    return (
        <>
            <form onSubmit={handelSubmit}>
                <Grid container spacing={2} marginBottom={2}>
                    <Grid item sx={12} md={6}>
                        <CustomAppBar title={"From"} />
                        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                            <Grid container spacing={1} mt={"1px"}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomDatePicker
                                        label={"Transfer Date"}
                                        name='transferDate'
                                        value={transferDate}
                                        setReduxState={setFixedAssetTransfer}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Company"}
                                        name={"fromCompany"}
                                        options={getCompanyData?.result ?? []}
                                        optionId={"nCompanyID"}
                                        optionLabel={"cCmpName"}
                                        value={fromCompany}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isCompanyLoading}
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={12}>
                                    <CustomMultiAutocomplete
                                        label={"Asset No#"}
                                        name={"assetNoExternal"}
                                        options={getAssetNo?.result ?? []}
                                        optionLabel={"mcAsstNo"}
                                        optionId={"mcAsstNo"}
                                        value={assetNoExternal}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isAssetNoLoading}
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item sx={12} md={6}>
                        <CustomAppBar title={"To"} />
                        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                            <Grid container spacing={1} mt={"1px"}>
                                <Grid item xs={12} sm={6} md={12}>
                                    <CustomAutocomplete
                                        label={"Company"}
                                        name={"toCompany"}
                                        options={getCompanyData?.result ?? []}
                                        optionId={"nCompanyID"}
                                        optionLabel={"cCmpName"}
                                        value={toCompany}
                                        setReduxState={setFixedAssetTransfer}
                                        loading={isCompanyLoading}
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
                                    // required={true}
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
                            loading={isFixedAssetTransferLoading}
                            disabled={assetNoExternal.length > 0 ? false : true}
                        />
                    </Stack>
                </Box>
            </form>
        </>
    );
};

export default FixedAssetTransferExternalInput;