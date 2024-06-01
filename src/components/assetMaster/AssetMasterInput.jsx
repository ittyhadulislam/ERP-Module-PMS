/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import CustomAppBar from './../common/CustomAppBar';
import { Box, Grid } from '@mui/material';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomTextInput from '../inputs/CustomTextInput';
import SubmitButton from '../buttons/SubmitButton';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetAssetMaster, setAssetMaster } from '../../redux/features/assetManagement/assetMaster/assetMasterSlice';
import { useSaveAssetMasterDetailsMutation, useUpdateAssetMasterDetailsMutation } from '../../redux/features/assetManagement/assetMaster/mutationAssetMaster';
import { formateDate } from '../../utils/formateDate';
import UpdateButton from './../buttons/UpdateButton';
import { successToast } from '../../common/toaster/toaster';
import {
    useGetAssetCategoryQuery,
    useGetAssetSpecialFeatureQuery,
    useGetAssetStatusQuery,
    useGetBrandQuery,
    useGetCompanyQuery,
    useGetCurrencyQuery,
    useGetCurrentHolderQuery,
    useGetMachineNameQuery,
    useGetSupplierNameQuery,
    useLazyGetDepartmentsQuery,
    useLazyGetFloorQuery,
    useLazyGetLineQuery,
    useLazyGetSectionsQuery
} from '../../redux/features/assetManagement/assetMaster/queryAssetMaster';
import ResetButton from '../buttons/ResetButton';


const AssetMasterInput = ({ editsble, setAssetNumber = () => { }, setEditable = () => { } }) => {
    console.log("Table Payload :", editsble);
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const {
        company,
        department,
        section,
        floor,
        line,
        purchaseDate,
        assetCategory,
        assetSpacialFeature,
        assetStatus,
        assetName,
        assetNo,
        serialNumber,
        brand,
        model,
        supplier,
        assetValue,
        currency,
        depreciatedValue,
        depreciatedPeriod,
        billNo,
        billInputDate,
        lcNo,
        lcDate,
        commercialInvoiceNo,
        commercialInvoiceDate,
        warrantyExpireDate,
        currentHolder,
        commencingDate,
        inhouseDate,
        remarks } = useSelector(state => state.assetMaster)

    // ----- Company -----
    const { data: companyData, isLoading: isCompanyLoading } = useGetCompanyQuery()

    // ----- Department -----
    const [setInDepartmentData, { data: departmentData, isLoading: isDepartmentLoading }] = useLazyGetDepartmentsQuery()

    useEffect(() => {
        if (company) {
            setInDepartmentData(company?.nCompanyID)
        }
    }, [company])

    // ----- section -----
    const [setSectionData, { data: sectionData, isLoading: isSectionLoading }] = useLazyGetSectionsQuery()

    useEffect(() => {
        if (company && department) {
            setSectionData({ comID: company?.nCompanyID, DeptID: department?.nUserDept })
        }
    }, [company, department])

    // ----- floor -----
    const [setFloorData, { data: floorData, isLoading: isFloorLoading }] = useLazyGetFloorQuery()

    useEffect(() => {
        if (company) {
            setFloorData(company?.nCompanyID)
        }
    }, [company])

    // ----- Line -----
    const [setLineData, { data: lineData, isLoading: isLineLoading }] = useLazyGetLineQuery()

    useEffect(() => {
        if (company && floor) {
            setLineData({ comID: company?.nCompanyID, floorID: floor?.nFloor })
        }
    }, [company, floor])

    // ----- Asset Category -----
    const { data: assetCategoryData, isLoading: isAssetCategoryLoading } = useGetAssetCategoryQuery()

    // ----- Asset Spatial Features -----
    const { data: assetSpacialFeatureData, isLoading: isAssetSpacialFeatureLoading } = useGetAssetSpecialFeatureQuery()

    // ----- Asset Status -----
    const { data: assetStatusData, isLoading: isAssetStatusLoading } = useGetAssetStatusQuery()

    // ----- Machine Name -----
    const { data: machineNameData, isLoading: isMachineNameLoading } = useGetMachineNameQuery()

    // ----- Brand -----
    const { data: brandData, isLoading: isBrandLoading } = useGetBrandQuery()

    // ----- Supplier Name -----
    const { data: supplierData, isLoading: isSupplierLoading } = useGetSupplierNameQuery()

    // ----- Currency Name -----
    const { data: currencyData, isLoading: isCurrencyLoading } = useGetCurrencyQuery()

    // ----- Current Holder -----
    const { data: currentHolderData, isLoading: isCurrentHolderLoading } = useGetCurrentHolderQuery()


    // ========== Post Data ==========

    const [saveAssetMasterData, { isLoading: isSaveAssetMasterLoading }] = useSaveAssetMasterDetailsMutation()

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = [
                {
                    comId: company?.nCompanyID,
                    dept: department?.nUserDept,
                    sectionId: section?.nSectionID,
                    floorId: floor?.nFloor,
                    lineId: line?.line_Code,
                    purchaseDate: new Date(purchaseDate)?.toISOString(),
                    asstCateId: assetCategory?.acat_id.toString(),
                    asstSpId: assetSpacialFeature?.asf_id.toString(),
                    asstStatusId: parseInt(assetStatus?.statusId),
                    asstNameId: assetName?.mcCode.toString(),
                    asstNo: assetNo,
                    serialNo: serialNumber,
                    brandID: brand?.nBrand_ID.toString(),
                    model: model,
                    supplierId: supplier?.cSupCode,
                    asstValue: parseFloat(assetValue),
                    curency: currency?.cCurdes,
                    depValue: parseFloat(depreciatedValue),
                    depPeriod: parseInt(depreciatedPeriod),
                    billNo: billNo,
                    billInputDate: new Date(billInputDate)?.toISOString(),
                    lcNo: lcNo,
                    lcDate: new Date(lcDate)?.toISOString(),
                    comInvoiceNo: commercialInvoiceNo,
                    comInvoiceDate: new Date(commercialInvoiceDate)?.toISOString(),
                    warrantyExpDate: new Date(warrantyExpireDate)?.toISOString(),
                    currenHolder: currentHolder?.nCompanyID,
                    commencingDate: new Date(commencingDate)?.toISOString(),
                    inhouseDate: new Date(inhouseDate)?.toISOString(),
                    remarks: remarks ?? "",
                    userName: user?.userName,
                }
            ]
            const res = await saveAssetMasterData(payload)
            console.log(res);
            if (res?.data) {
                successToast(res?.data?.message);
                dispatch(resetAssetMaster())
            }
        } catch (error) {
            console.log(error);
        }
    }


    // ========== Update Data ==========
    const [updateData, { isLoading: isUpdateLoading }] = useUpdateAssetMasterDetailsMutation()
    useEffect(() => {
        if (editsble) {
            dispatch(setAssetMaster({ key: "company", value: { cCmpName: editsble?.cCmpName, nCompanyID: editsble?.mcCompanyID } }))
            dispatch(setAssetMaster({ key: "department", value: { cDeptname: editsble?.cDeptname, nUserDept: editsble?.nUserDept } }))
            dispatch(setAssetMaster({ key: "section", value: { cSection_Description: editsble?.cSection_Description, nSectionID: editsble?.nSectionID } }))
            dispatch(setAssetMaster({ key: "floor", value: { cFloor_Descriptin: editsble?.cFloor_Descriptin, nFloor: editsble?.nFloor } }))
            dispatch(setAssetMaster({ key: "line", value: { line_No: editsble?.line_No, line_Code: editsble?.line_Code } }))
            dispatch(setAssetMaster({ key: "purchaseDate", value: formateDate(editsble?.mcPurDate) }))
            dispatch(setAssetMaster({ key: "assetCategory", value: { acat_name: editsble?.acat_name, acat_id: editsble?.acat_id } }))
            dispatch(setAssetMaster({ key: "assetSpacialFeature", value: { asf_descrip: editsble?.asf_descrip, asf_id: editsble?.asf_id } }))
            dispatch(setAssetMaster({ key: "assetStatus", value: { statusName: editsble?.statusName, statusId: editsble?.statusId } }))
            dispatch(setAssetMaster({ key: "assetName", value: { mcDesc: editsble?.mcDesc, mcCode: editsble?.mcCode } }))
            dispatch(setAssetMaster({ key: "serialNumber", value: editsble?.mcSerial }))
            dispatch(setAssetMaster({ key: "model", value: editsble?.mcModel }))
            dispatch(setAssetMaster({ key: "supplier", value: { cSupName: editsble?.cSupName, cSupCode: editsble?.cSupCode } }))
            dispatch(setAssetMaster({ key: "assetValue", value: editsble?.mcAssetValue }))
            dispatch(setAssetMaster({ key: "currency", value: { cCurdes: editsble?.cCurdes, cCurID: editsble?.cCurID } }))
            dispatch(setAssetMaster({ key: "depreciatedValue", value: editsble?.depValue }))
            dispatch(setAssetMaster({ key: "depreciatedPeriod", value: editsble?.depPeriod }))
            dispatch(setAssetMaster({ key: "billNo", value: editsble?.mcBillOfEntryNo }))
            dispatch(setAssetMaster({ key: "billInputDate", value: formateDate(editsble?.mcBillOfEnDate) }))
            dispatch(setAssetMaster({ key: "lcNo", value: editsble?.mcLcNo }))
            dispatch(setAssetMaster({ key: "lcDate", value: formateDate(editsble?.mcLcDate) }))
            dispatch(setAssetMaster({ key: "commercialInvoiceNo", value: editsble?.mcComInvoiceNo }))
            dispatch(setAssetMaster({ key: "commercialInvoiceDate", value: formateDate(editsble?.mcComDate) }))
            dispatch(setAssetMaster({ key: "warrantyExpireDate", value: formateDate(editsble?.warrantyExpireDate) }))
            dispatch(setAssetMaster({ key: "currentHolder", value: { cCmpName: editsble?.cCmpName, nCompanyID: editsble?.mcCompanyID } }))
            dispatch(setAssetMaster({ key: "commencingDate", value: formateDate(editsble?.warrantyExpireDate) }))
            dispatch(setAssetMaster({ key: "inhouseDate", value: formateDate(editsble?.mcGoodsInhousDate) }))
            dispatch(setAssetMaster({ key: "remarks", value: editsble?.mcRemarks }))
        }
    }, [editsble])


    const handelUpdate = async (e) => {
        e.preventDefault()
        try {
            const payload = [
                {
                    comId: company?.nCompanyID,
                    dept: department?.nUserDept,
                    sectionId: section?.nSectionID,
                    floorId: floor?.nFloor,
                    lineId: line?.line_Code,
                    purchaseDate: purchaseDate ? purchaseDate : "",
                    asstCateId: assetCategory ? assetCategory?.acat_id.toString() : "",
                    asstSpId: assetSpacialFeature ? assetSpacialFeature?.asf_id.toString() : "",
                    asstStatusId: assetStatus ? Number(assetStatus?.statusId) : "",
                    asstNameId: assetName ? assetName?.mcCode.toString() : "",
                    asstNo: assetNo,
                    serialNo: serialNumber ? serialNumber : "",
                    brandID: brand?.nBrand_ID,
                    model: model ? model : "",
                    supplierId: supplier?.cSupCode,
                    asstValue: assetValue ? parseFloat(assetValue) : null,
                    curency: currency?.cCurdes,
                    depValue: depreciatedValue ? parseFloat(depreciatedValue) : null,
                    depPeriod: depreciatedPeriod ? parseInt(depreciatedPeriod) : null,
                    billNo: billNo ? billNo : "",
                    billInputDate: billInputDate ? billInputDate : null,
                    lcNo: lcNo ? lcNo : "",
                    lcDate: lcDate ? lcDate : null,
                    comInvoiceNo: commercialInvoiceNo ? commercialInvoiceNo : "",
                    comInvoiceDate: commercialInvoiceDate ? commercialInvoiceDate : "",
                    warrantyExpDate: warrantyExpireDate ? warrantyExpireDate : null,
                    currenHolder: company?.nCompanyID,
                    commencingDate: commencingDate ? commencingDate : null,
                    inhouseDate: inhouseDate ? inhouseDate : null,
                    remarks: remarks ?? "",
                    userName: user?.userName
                }
            ]
            console.log(payload)

            const response = await updateData(payload)
            console.log(response)
            if (response) {
                successToast(response?.data?.message)
                setEditable(null)
                dispatch(resetAssetMaster())
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handelClear = () => {
        dispatch(resetAssetMaster())
    }




    return (
        <>
            <CustomAppBar title={"Add/Edit asset"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form onSubmit={editsble ? handelUpdate : handelSubmit}>
                    <Grid container spacing={1} mt={"5px"}>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Company"}
                                name='company'
                                loading={isCompanyLoading}
                                optionId={"nCompanyID"}
                                options={companyData ?? []}
                                optionLabel={"cCmpName"}
                                value={company}
                                setReduxState={setAssetMaster}
                                // setSelectedValue={setCompany}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Department"}
                                name='department'
                                loading={isDepartmentLoading}
                                optionId={"nUserDept"}
                                options={company ? departmentData ?? [] : []}
                                optionLabel={"cDeptname"}
                                value={department}
                                setReduxState={setAssetMaster}
                                // setSelectedValue={setDepartment}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Section"}
                                name='section'
                                loading={isSectionLoading}
                                optionId={"nSectionID"}
                                options={company && department ? sectionData ?? [] : []}
                                optionLabel={"cSection_Description"}
                                value={section}
                                setReduxState={setAssetMaster}
                                // setSelectedValue={setSection}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Floor"}
                                name='floor'
                                loading={isFloorLoading}
                                optionId={"nFloor"}
                                options={company ? floorData ?? [] : []}
                                optionLabel={"cFloor_Descriptin"}
                                value={floor}
                                setReduxState={setAssetMaster}
                                // setSelectedValue={setFloor}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Line"}
                                name='line'
                                loading={isLineLoading}
                                optionId={"line_Code"}
                                options={company && floor ? lineData ?? [] : []}
                                optionLabel={"line_No"}
                                value={line}
                                setReduxState={setAssetMaster}
                                // setSelectedValue={setLine}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Purchase Date"}
                                name='purchaseDate'
                                // disableFuture={true}
                                value={purchaseDate}
                                setReduxState={setAssetMaster}
                            // setData={setPurchaseDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Category"}
                                name='assetCategory'
                                loading={isAssetCategoryLoading}
                                optionId={"acat_id"}
                                options={assetCategoryData ?? []}
                                optionLabel={"acat_name"}
                                value={assetCategory}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setAssetCategory}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Spacial Feature"}
                                name='assetSpacialFeature'
                                loading={isAssetSpacialFeatureLoading}
                                optionId={"asf_id"}
                                options={assetSpacialFeatureData ?? []}
                                optionLabel={"asf_descrip"}
                                value={assetSpacialFeature}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setAssetSpacialFeature}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Status"}
                                name='assetStatus'
                                loading={isAssetStatusLoading}
                                optionId={"statusId"}
                                options={assetStatusData ?? []}
                                optionLabel={"statusName"}
                                value={assetStatus}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setAssetStatus}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Asset Name"}
                                name='assetName'
                                loading={isMachineNameLoading}
                                optionId={"mcCode"}
                                options={machineNameData ?? []}
                                optionLabel={"mcDesc"}
                                value={assetName}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setAssetName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Asset No#"}
                                name='assetNo'
                                // isNumber={true}
                                value={assetNo}
                                setReduxState={setAssetMaster}
                                // setStateValue={setAssetNo}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Serial Number"}
                                name='serialNumber'
                                value={serialNumber}
                                setReduxState={setAssetMaster}
                            // setStateValue={setSerialNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                <CustomAutocomplete
                                    label={"Brand"}
                                    name='brand'
                                    loading={isBrandLoading}
                                    optionId={"nBrand_ID"}
                                    options={brandData ?? []}
                                    optionLabel={"cBrand_Name"}
                                    value={brand}
                                    setReduxState={setAssetMaster}
                                // setSelectedValue={setBrand}
                                />
                                <p>{editsble?.mcMake}</p>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Model"}
                                name='model'
                                value={model}
                                setReduxState={setAssetMaster}
                            // setStateValue={setModel}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Supplier"}
                                name='supplier'
                                loading={isSupplierLoading}
                                optionId={"cSupCode"}
                                options={supplierData ?? []}
                                optionLabel={"cSupName"}
                                value={supplier}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setSupplier}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Asset Value"}
                                name='assetValue'
                                value={assetValue}
                                setReduxState={setAssetMaster}
                                type='number'
                            // setStateValue={setAssetValue}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Currency"}
                                name='currency'
                                loading={isCurrencyLoading}
                                optionId={"cCurID"}
                                options={currencyData ?? []}
                                optionLabel={"cCurdes"}
                                value={currency}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setCurrency}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Depreciated Value"}
                                name='depreciatedValue'
                                value={depreciatedValue}
                                setReduxState={setAssetMaster}
                                type='number'
                            // setStateValue={setDepreciatedValue}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Depreciated Period (Days)"}
                                name='depreciatedPeriod'
                                value={depreciatedPeriod}
                                setReduxState={setAssetMaster}
                                type='number'
                            // setStateValue={setDepreciatedPeriod}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Bill No"}
                                name='billNo'
                                value={billNo}
                                setReduxState={setAssetMaster}
                            // setStateValue={setBillNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Bill Input Date"}
                                name='billInputDate'
                                // disableFuture={true}
                                value={billInputDate}
                                setReduxState={setAssetMaster}
                            // setData={setBillInputDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"LC No"}
                                name='lcNo'
                                value={lcNo}
                                setReduxState={setAssetMaster}
                            // setStateValue={setLcNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"LC Date"}
                                name='lcDate'
                                // disableFuture={true}
                                value={lcDate}
                                setReduxState={setAssetMaster}
                            // setData={setLcDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Commercial Invoice No"}
                                name='commercialInvoiceNo'
                                value={commercialInvoiceNo}
                                setReduxState={setAssetMaster}
                            // setStateValue={setCommercialInvoiceNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Commercial Invoice Date"}
                                name='commercialInvoiceDate'
                                // disableFuture={true}
                                value={commercialInvoiceDate}
                                setReduxState={setAssetMaster}
                            // setData={setCommercialInvoiceDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Warranty Expire Date"}
                                name='warrantyExpireDate'
                                // disableFuture={true}
                                value={formateDate(warrantyExpireDate)}
                                setReduxState={setAssetMaster}
                            // setData={setWarrantyExpireDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomAutocomplete
                                label={"Current Holder"}
                                name='currentHolder'
                                loading={isCurrentHolderLoading}
                                optionId={"nCompanyID"}
                                options={currentHolderData ?? []}
                                optionLabel={"cCmpName"}
                                value={currentHolder}
                                setReduxState={setAssetMaster}
                            // setSelectedValue={setCurrenHolder}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"Commencing Date"}
                                name='commencingDate'
                                // disableFuture={true}
                                value={commencingDate}
                                setReduxState={setAssetMaster}
                            // setData={setCommencingDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomDatePicker
                                label={"In-House Date"}
                                name='inhouseDate'
                                // disableFuture={true}
                                value={inhouseDate}
                                setReduxState={setAssetMaster}
                            // setData={setInhouseDate}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <CustomTextInput
                                label={"Remarks"}
                                name='remarks'
                                multiline
                                value={remarks}
                                setReduxState={setAssetMaster}
                            // setStateValue={setRemarks}
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
                                editsble ?
                                    <UpdateButton
                                        title={"Update"}
                                        type='submit'
                                        loading={isUpdateLoading}
                                    />
                                    :
                                    <SubmitButton
                                        title={"Save"}
                                        type='submit'
                                        loading={isSaveAssetMasterLoading}
                                    />
                            }
                        </Stack>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default AssetMasterInput;


// ===============Remove Dependencies ==========================
// useEffect(() => {
//     dispatch(setAssetMaster({
//         key: "department",
//         value: null
//     }))
// }, [company])