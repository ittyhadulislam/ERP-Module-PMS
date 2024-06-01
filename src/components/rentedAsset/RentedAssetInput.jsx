/* eslint-disable react/prop-types */


import React, { useEffect } from 'react';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomTextInput from '../inputs/CustomTextInput';
import SubmitButton from '../buttons/SubmitButton';
import { Box, Grid, Stack } from '@mui/material';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import CustomAppBar from '../common/CustomAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAssetCategoryForRentedAssetQuery, useGetAssetNameForRentedAssetQuery, useGetAssetSpacialFeatureQuery, useGetAssetStatusForRentedAssetQuery, useGetBrandForRentedAssetQuery, useGetCurrencyForRentedAssetQuery, useGetCurrentHolderForRentedAssetQuery, useGetSupplierForRentedAssetQuery, useLazyGetFloorForRentedAssetQuery, useLazyGetLineForRentedAssetQuery } from '../../redux/features/assetManagement/rentedAsset/queryRentedAsset';
import { setRentedAsset, setRentedAssetReset } from '../../redux/features/assetManagement/rentedAsset/rentedAssetSlice';
import { useSaveRentedAssetMutation, useUpdateRentedAssetMutation } from '../../redux/features/assetManagement/rentedAsset/mutationRentedAsset';
import { successToast } from '../../common/toaster/toaster';
import UpdateButton from '../buttons/UpdateButton';
import { formateDate } from '../../utils/formateDate';
import ResetButton from '../buttons/ResetButton';


const RentedAssetInput = ({ getDetailsForEdit }) => {
    console.log(getDetailsForEdit)

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const {
        currentHolder,
        floor,
        line,
        challanNo,
        rentedDate,
        returnDate,
        assetCategory,
        assetSpatialFeature,
        assetStatus,
        assetName,
        assetNo,
        serialNo,
        brand,
        model,
        supplier,
        costParDay,
        currency,
        totalRentedDays,
    } = useSelector(state => state.rentedAsset)

    console.log(floor)


    // ========== CurrentHolder ==========
    const { data: currentHolderData, isLoading: isCurrentHolderLoading } = useGetCurrentHolderForRentedAssetQuery()

    // ========== Floor ==========
    const [getFloorData, { data: floorData, isLoading: isFloorLoading }] = useLazyGetFloorForRentedAssetQuery()

    useEffect(() => {
        if (currentHolder) {
            getFloorData(currentHolder?.nCompanyID)
        }
    }, [currentHolder])

    // ========== Line ==========
    const [getLineData, { data: lineData, isLoading: isLineLoading }] = useLazyGetLineForRentedAssetQuery()

    useEffect(() => {
        if (currentHolder && floor) {
            getLineData({ comID: currentHolder?.nCompanyID, floorID: floor?.nFloor })
        }
    }, [currentHolder, floor])

    // ========== Asset Category ==========
    const { data: assetCategoryData, isLoading: isAssetCategoryLoading } = useGetAssetCategoryForRentedAssetQuery()

    // ========== Asset Spacial Feature ==========
    const { data: assetSpacialFeatureData, isLoading: isAssetSpacialFeatureLoading } = useGetAssetSpacialFeatureQuery()

    // ========== Asset Status ==========
    const { data: assetStatusData, isLoading: isAssetStatusLoading } = useGetAssetStatusForRentedAssetQuery()

    // ========== Asset Name ==========
    const { data: assetNameData, isLoading: isAssetNameLoading } = useGetAssetNameForRentedAssetQuery()

    // ========== Brand ==========
    const { data: brandData, isLoading: isBrandDataLoading } = useGetBrandForRentedAssetQuery()

    // ========== Supplier ==========
    const { data: supplierData, isLoading: isSupplierDataLoading } = useGetSupplierForRentedAssetQuery()

    // ========== Currency ==========
    const { data: currencyData, isLoading: isCurrencyDataLoading } = useGetCurrencyForRentedAssetQuery()


    // ==================== Post ====================
    const [saveRentedAssetDate, { isLoading: isSaveRentedAssetLoading }] = useSaveRentedAssetMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload =
                [
                    {
                        currentHolder: currentHolder?.nCompanyID,
                        floorID: floor?.nFloor,
                        lineId: line?.line_Code,
                        challanNo: parseInt(challanNo),
                        rentedDate: new Date(rentedDate).toISOString(),
                        returnDate: new Date(returnDate).toISOString(),
                        assetCate: assetCategory?.acat_id,
                        assetSpFeature: assetSpatialFeature?.asf_id,
                        assetStatus: assetStatus?.statusId,
                        assetName: assetName?.mcCode,
                        assetNo: assetNo,
                        serialNo: serialNo,
                        brand: brand?.nBrand_ID,
                        model: model,
                        supplier: supplier?.cSupCode,
                        assetValue: parseFloat(costParDay),
                        currency: currency?.cCurID,
                        totalDays: parseInt(totalRentedDays),
                        inputUser: user?.userName
                    }
                ]
            console.log(payload)
            const res = await saveRentedAssetDate(payload)
            console.log(res)
            if (res) {
                successToast(res?.data?.message)
                dispatch(setRentedAssetReset())
            }
        } catch (error) {
            console.log(error)
        }
    }

    // ========== Update ==========
    useEffect(() => {
        if (getDetailsForEdit) {
            dispatch(setRentedAsset({ key: "currentHolder", value: { cCmpName: getDetailsForEdit?.cCmpName, nCompanyID: getDetailsForEdit?.nCompanyID } }))
            // dispatch(setAssetMaster({ key: "company", value: { cCmpName: editsble?.cCmpName, nCompanyID: editsble?.mcCompanyID } }))
            dispatch(setRentedAsset({ key: "floor", value: { nFloor: getDetailsForEdit?.nFloor, cFloor_Descriptin: getDetailsForEdit?.cFloor_Descriptin } }))
            dispatch(setRentedAsset({ key: "line", value: { line_No: getDetailsForEdit?.line_No, line_Code: getDetailsForEdit?.line_Code } }))
            dispatch(setRentedAsset({ key: "challanNo", value: getDetailsForEdit?.rentChallan }))
            dispatch(setRentedAsset({ key: "rentedDate", value: formateDate(getDetailsForEdit?.rentDate) }))
            dispatch(setRentedAsset({ key: "returnDate", value: formateDate(getDetailsForEdit?.returnDate) }))
            dispatch(setRentedAsset({ key: "assetCategory", value: { acat_name: getDetailsForEdit?.acat_name, acat_id: getDetailsForEdit?.acat_id } }))
            dispatch(setRentedAsset({ key: "assetSpatialFeature", value: { asf_descrip: getDetailsForEdit?.asf_descrip, asf_id: getDetailsForEdit?.asf_id } }))
            dispatch(setRentedAsset({ key: "assetStatus", value: { statusName: getDetailsForEdit?.statusName, statusId: getDetailsForEdit?.statusId } }))
            dispatch(setRentedAsset({ key: "assetName", value: { mcDesc: getDetailsForEdit?.mcDesc, mcCode: getDetailsForEdit?.mcCode } }))
            dispatch(setRentedAsset({ key: "assetNo", value: getDetailsForEdit?.rentAssetNo }))
            dispatch(setRentedAsset({ key: "serialNo", value: getDetailsForEdit?.rentSerial }))
            dispatch(setRentedAsset({ key: "brand", value: { cBrand_Name: getDetailsForEdit?.cBrand_Name, nBrand_ID: getDetailsForEdit?.nBrand_ID } }))
            dispatch(setRentedAsset({ key: "model", value: getDetailsForEdit?.model }))
            dispatch(setRentedAsset({ key: "supplier", value: { cSupName: getDetailsForEdit?.cSupName, cSupCode: getDetailsForEdit?.cSupCode } }))
            dispatch(setRentedAsset({ key: "costParDay", value: getDetailsForEdit?.costPerDay }))
            dispatch(setRentedAsset({ key: "currency", value: { cCurdes: getDetailsForEdit?.cCurdes, cCurID: getDetailsForEdit?.cCurID } }))
            dispatch(setRentedAsset({ key: "totalRentedDays", value: getDetailsForEdit?.noOfDayUsed }))
        }
    }, [getDetailsForEdit])

    const [updatedData, { isLoading: isRentedAssetUpdateLoading }] = useUpdateRentedAssetMutation()

    const handelUpdate = async (e) => {
        e.preventDefault()
        try {
            const payload = [
                {
                    currentHolder: currentHolder?.nCompanyID,
                    floorID: floor?.nFloor,
                    lineId: line?.line_Code,
                    challanNo: parseInt(challanNo),
                    rentedDate: new Date(rentedDate).toISOString(),
                    returnDate: new Date(returnDate).toISOString(),
                    assetCate: assetCategory?.acat_id,
                    assetSpFeature: assetSpatialFeature?.asf_id,
                    assetStatus: assetStatus?.statusId,
                    assetName: assetName?.mcDesc,
                    assetNo: assetNo,
                    serialNo: serialNo,
                    brand: brand?.nBrand_ID,
                    model: model,
                    supplier: supplier?.cSupCode,
                    assetValue: parseFloat(costParDay),
                    currency: currency?.cCurID,
                    totalDays: parseInt(totalRentedDays),
                    inputUser: user?.userName
                }
            ]

            console.log(payload);
            const response = await updatedData(payload)
            console.log(response)
            if (response) {
                successToast(response?.data?.message)
                dispatch(setRentedAssetReset())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handelClear = () => {
        dispatch(setRentedAssetReset())
    }



    return (
        <>
            <CustomAppBar title={"Add/Edit Rent Asset"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form onSubmit={getDetailsForEdit ? handelUpdate : handelSubmit}>
                    <Grid container spacing={1} mt={"5px"}>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Current Holder"}
                                name='currentHolder'
                                options={currentHolderData ?? []}
                                optionId={"nCompanyID"}
                                optionLabel={"cCmpName"}
                                value={currentHolder}
                                loading={isCurrentHolderLoading}
                                setReduxState={setRentedAsset}
                            // setLocalState={setCurrentHolder}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Floor"}
                                name='floor'
                                options={currentHolder ? floorData ?? [] : []}
                                optionId={"nFloor"}
                                optionLabel={"cFloor_Descriptin"}
                                value={floor}
                                loading={isFloorLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Line"}
                                name='line'
                                options={currentHolder && floor ? lineData ?? [] : []}
                                optionId={"line_Code"}
                                optionLabel={"line_No"}
                                value={line}
                                loading={isLineLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Challan No#"}
                                name='challanNo'
                                value={challanNo}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Rented Date"}
                                name='rentedDate'
                                value={rentedDate}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Return Date"}
                                name='returnDate'
                                value={returnDate}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Category"}
                                name='assetCategory'
                                options={assetCategoryData ?? []}
                                optionId={"acat_id"}
                                optionLabel={"acat_name"}
                                value={assetCategory}
                                loading={isAssetCategoryLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Spacial Feature"}
                                name='assetSpatialFeature'
                                options={assetSpacialFeatureData ?? []}
                                optionId={"asf_id"}
                                optionLabel={"asf_descrip"}
                                value={assetSpatialFeature}
                                loading={isAssetSpacialFeatureLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Status"}
                                name='assetStatus'
                                options={assetStatusData ?? []}
                                optionId={"statusId"}
                                optionLabel={"statusName"}
                                value={assetStatus}
                                loading={isAssetStatusLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Name"}
                                name='assetName'
                                options={assetNameData ?? []}
                                optionId={"mcCode"}
                                optionLabel={"mcDesc"}
                                value={assetName}
                                loading={isAssetNameLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Asset No#"}
                                name='assetNo'
                                value={assetNo}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Serial Number"}
                                name='serialNo'
                                value={serialNo}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Brand"}
                                name='brand'
                                options={brandData ?? []}
                                optionId={"nBrand_ID"}
                                optionLabel={"cBrand_Name"}
                                value={brand}
                                loading={isBrandDataLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Model"}
                                name='model'
                                value={model}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Supplier"}
                                name='supplier'
                                options={supplierData ?? []}
                                optionId={"cSupCode"}
                                optionLabel={"cSupName"}
                                value={supplier}
                                loading={isSupplierDataLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Cost Per Day"}
                                type="Number"
                                name='costParDay'
                                value={costParDay}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Currency"}
                                name='currency'
                                options={currencyData ?? []}
                                optionId={"cCurID"}
                                optionLabel={"cCurdes"}
                                value={currency}
                                loading={isCurrencyDataLoading}
                                setReduxState={setRentedAsset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Total Rented Days"}
                                type="number"
                                name='totalRentedDays'
                                value={totalRentedDays}
                                setReduxState={setRentedAsset}
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
                            <ResetButton
                                title={"Clear"}
                                type='reset'
                                handleClick={handelClear}
                            />
                            {
                                getDetailsForEdit ?
                                    <UpdateButton
                                        title={"Update"}
                                        type='submit'
                                        loading={isRentedAssetUpdateLoading}
                                    /> :
                                    <SubmitButton
                                        title={"Save"}
                                        type='submit'
                                        loading={isSaveRentedAssetLoading}
                                    />
                            }
                        </Stack>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default RentedAssetInput;