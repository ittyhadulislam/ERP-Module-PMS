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
import ReturnButton from '../../buttons/ReturnButton';
import SubmitButton from '../../buttons/SubmitButton';
import { successToast } from '../../../common/toaster/toaster';
import CustomMultiAutocomplete from '../../inputs/CustomMultiAutocomplete';

const FixedAssetTransferExternalInput = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {
        fromCompany,
        toCompany,
        assetNo,
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
    }, [fromCompany])

    // ========== Post ==========
    const [passExternalData, { isLoading: isFixedAssetTransferLoading }] = useSaveFixedAssetTransferExternalMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            // const payload = [
            //     {
            //         date: transferDate,
            //         comFrom: fromCompany?.nCompanyID,
            //         comTo: toCompany?.nCompanyID,
            //         assetNo: assetNo?.mcAsstNo,
            //         status: "Ex",
            //         remarks: remarks,
            //         inputUser: user?.userName,
            //     }
            // ]
            const payload = assetNo?.map(singleAssetNo => ({
                date: transferDate,
                comFrom: fromCompany?.nCompanyID,
                comTo: toCompany?.nCompanyID,
                // assetNo: assetNo?.mcAsstNo,
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
                dispatch(setResetFixedAssetTransferExternal())
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
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
                                    loading={isAssetNoLoading}
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <CustomMultiAutocomplete
                                    label={"Asset No#"}
                                    name={"assetNo"}
                                    options={fromCompany ? getAssetNo?.result ?? [] : []}
                                    optionLabel={"mcAsstNo"}
                                    optionId={"nCompanyID"}
                                    value={assetNo}
                                    setReduxState={setFixedAssetTransfer}
                                    loading={isCompanyLoading}
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
                                    required={true}
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
                    <ReturnButton
                        title={"Clear"}
                        type='reset'
                        loading={""}
                    />
                    <SubmitButton
                        title={"Save"}
                        type='submit'
                        loading={isFixedAssetTransferLoading}
                        handleClick={handelSubmit}
                    />
                </Stack>
            </Box>
        </>
    );
};

export default FixedAssetTransferExternalInput;