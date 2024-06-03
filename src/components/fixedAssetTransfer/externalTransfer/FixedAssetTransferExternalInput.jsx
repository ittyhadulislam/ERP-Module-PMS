import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CustomAppBar from '../../common/CustomAppBar';
import CustomDatePicker from '../../inputs/CustomDatePicker';
import CustomAutocomplete from '../../inputs/CustomAutocomplete';
import CustomTextInput from '../../inputs/CustomTextInput';
import { useSelector } from 'react-redux';
import { useGetCompanyForFixedAssetTransferQuery, useLazyGetAssetNoForFixedAssetTransferExternalQuery } from '../../../redux/features/assetManagement/fixedAssetTransfer/queryFixedAssetTransfer';
import { setFixedAssetTransfer } from '../../../redux/features/assetManagement/fixedAssetTransfer/fixedAssetTransferSlice';
import { useSaveFixedAssetTransferExternalMutation } from '../../../redux/features/assetManagement/fixedAssetTransfer/mutationFixedAssetTransfer';
import ReturnButton from '../../buttons/ReturnButton';
import SubmitButton from '../../buttons/SubmitButton';
import { successToast } from '../../../common/toaster/toaster';

const FixedAssetTransferExternalInput = () => {
    const { user } = useSelector(state => state.auth)

    const {
        fromCompany,
        toCompany,
        assetNo,
        transferDate,
        remarks,
    } = useSelector(state => state.fixedAssetMaster)

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
            const payload = [
                {
                    date: transferDate,
                    comFrom: fromCompany?.nCompanyID,
                    comTo: toCompany?.nCompanyID,
                    // floorFrom: 56,
                    // floorTo: 90,
                    // lineFrom: 98,
                    // lineTo: 79,
                    assetNo: assetNo?.mcAsstNo,
                    status: "Ex",
                    remarks: remarks,
                    inputUser: user?.userName,
                }
            ]
            // console.log(payload)
            const res = await passExternalData(payload)
            console.log(res)
            if (res) {
                successToast(res?.data?.message)
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
                            <Grid item xs={12} sm={6} md={4}>
                                <CustomDatePicker
                                    label={"Transfer Date"}
                                    name='transferDate'
                                    value={transferDate}
                                    setReduxState={setFixedAssetTransfer}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CustomAutocomplete
                                    label={"Company"}
                                    name={"fromCompany"}
                                    options={getCompanyData?.result ?? []}
                                    optionId={"nCompanyID"}
                                    optionLabel={"cCmpName"}
                                    value={fromCompany}
                                    setReduxState={setFixedAssetTransfer}
                                    loading={isAssetNoLoading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <CustomAutocomplete
                                    label={"Asset No#"}
                                    name={"assetNo"}
                                    options={fromCompany ? getAssetNo?.result ?? [] : []}
                                    // optionId={"nCompanyID"}
                                    optionLabel={"mcAsstNo"}
                                    value={assetNo}
                                    setReduxState={setFixedAssetTransfer}
                                    loading={isCompanyLoading}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item sx={12} md={6}>
                    <CustomAppBar title={"To"} />
                    <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                        <Grid container spacing={1} mt={"1px"}>
                            <Grid item xs={12} sm={6} md={6}>
                                <CustomAutocomplete
                                    label={"Company"}
                                    name={"toCompany"}
                                    options={getCompanyData?.result ?? []}
                                    optionId={"nCompanyID"}
                                    optionLabel={"cCmpName"}
                                    value={toCompany}
                                    setReduxState={setFixedAssetTransfer}
                                    loading={isCompanyLoading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
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