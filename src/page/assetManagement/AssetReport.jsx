import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomAppBar from '../../components/common/CustomAppBar';
import SelectReport from '../../components/common/SelectReport';
import CustomAutocomplete from '../../components/inputs/CustomAutocomplete';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import ReportButton from './../../components/buttons/ReportButton';
import { useSelector } from 'react-redux';
import { useGetAssetCategoryQuery, useGetAssetStatusQuery, useGetCompanyQuery, useLazyGetFloorQuery, useLazyGetLineQuery } from '../../redux/features/assetManagement/assetMaster/queryAssetMaster';
import { setAssetReport } from '../../redux/features/assetManagement/assetReport/assetReportSlice';
import ReportViewer from '../../components/report/ReportViewer';
import { useLazyGetAssetDetailsMasterReportQuery, useLazyGetAssetDetailsSummaryReportQuery, useLazyGetAssetInformationDetailsReportQuery, useLazyGetAssetManagementReportQuery, useLazyGetAssetRunningRepairReportQuery, useLazyGetAssetSummaryReportQuery, useLazyGetExternalTransferReportQuery, useLazyGetInternalTransferReportQuery, useLazyGetRentedAssetDetailsReportQuery } from '../../redux/features/assetManagement/assetReport/queryAssetReport';
import { errorToast, infoToast } from '../../common/toaster/toaster';

const AssetReport = () => {
    const [reportTitle, setReportTitle] = useState("")
    const [reportView, setReportView] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    console.log(reportTitle)

    const { user } = useSelector(state => state.auth)
    const {
        company,
        fromCom,
        toCom,
        fromDate,
        toDate,
        AssetCategory,
        status,
        floor,
        line
    } = useSelector(state => state.assetReport)

    const { data: companyData, isLoading: isCompanyLoading } = useGetCompanyQuery()
    const { data: assetCategoryData, isLoading: isAssetCategoryLoading } = useGetAssetCategoryQuery()
    const { data: assetStatusData, isLoading: isAssetStatusLoading } = useGetAssetStatusQuery()

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

    // ========== Report Process ==========

    // === Asset Management Report ===
    const [
        passValueForAssetManagementReport,
        {
            data: assetManagementReportData,
            isFetching: managementReportFetching,
            isError: managementReportError,
            isSuccess: managementReportSuccess
        }
    ] = useLazyGetAssetManagementReportQuery()

    useEffect(() => {
        if (managementReportError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (managementReportSuccess && assetManagementReportData) {
            setModalOpen(true)
            setReportView(assetManagementReportData)
        }
    }, [managementReportError, managementReportSuccess, assetManagementReportData])

    // === Asset Information Details Report ===
    const [
        passValueForAssetInformationDetailsReport,
        {
            data: assetInfoDetailsReportData,
            isFetching: assetInfoDetailsReportFetching,
            isError: assetInfoDetailsReportError,
            isSuccess: assetInfoDetailsReportSuccess
        }
    ] = useLazyGetAssetInformationDetailsReportQuery()

    useEffect(() => {
        if (assetInfoDetailsReportError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (assetInfoDetailsReportData && assetInfoDetailsReportSuccess) {
            setModalOpen(true)
            setReportView(assetInfoDetailsReportData)
        }
    }, [assetInfoDetailsReportError, assetInfoDetailsReportSuccess, assetInfoDetailsReportData])

    // === Asset Daily Summary Report ===
    // const [
    //     passValueForAssetDetailsSummary,
    //     {
    //         data: assetDetailsSummaryData,
    //         isFetching: detailsSummaryFetching,
    //         isError: detailsSummaryError,
    //         isSuccess: detailsSummarySuccess
    //     }
    // ] = useLazyGetAssetDetailsSummaryReportQuery()

    // useEffect(() => {
    //     if (detailsSummaryError) {
    //         setModalOpen(false)
    //         errorToast("Something Went Wrong")
    //     }
    //     if (detailsSummarySuccess && assetDetailsSummaryData) {
    //         setModalOpen(true)
    //         setReportView(assetDetailsSummaryData)
    //     }
    // }, [detailsSummaryError, detailsSummarySuccess, assetDetailsSummaryData])
    const [
        passValueForAssetDetailsSummaryReport,
        {
            data: assetDetailsSummaryReportData,
            isFetching: assetDetailsSummaryReportFetching,
            isError: assetDetailsSummaryReportError,
            isSuccess: assetDetailsSummaryReportSuccess
        }
    ] = useLazyGetAssetDetailsSummaryReportQuery()

    useEffect(() => {
        if (assetDetailsSummaryReportError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (assetDetailsSummaryReportData && assetDetailsSummaryReportSuccess) {
            setModalOpen(true)
            setReportView(assetDetailsSummaryReportData)
        }
    }, [assetDetailsSummaryReportError, assetDetailsSummaryReportSuccess, assetDetailsSummaryReportData])

    // === Asset Summary Report ===
    const [
        passValueForAssetSummaryReport,
        {
            data: assetSummaryData,
            isFetching: assetSummaryFetching,
            isError: assetSummaryError,
            isSuccess: assetSummarySuccess
        }
    ] = useLazyGetAssetSummaryReportQuery()
    useEffect(() => {
        if (assetSummaryError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (assetSummarySuccess && assetSummaryData) {
            setModalOpen(true)
            setReportView(assetSummaryData)
        }
    }, [assetSummaryError, assetSummarySuccess, assetSummaryData])

    // === Running Repair Report ===
    const [
        passValueForRunningRepairReport,
        {
            data: assetRunningRepairData,
            isFetching: assetRunningRepairFetching,
            isError: assetRunningRepairError,
            isSuccess: assetRunningRepairSuccess
        }
    ] = useLazyGetAssetRunningRepairReportQuery()

    useEffect(() => {
        if (assetRunningRepairError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (assetRunningRepairSuccess && assetRunningRepairData) {
            setModalOpen(true)
            setReportView(assetRunningRepairData)
        }
    }, [assetRunningRepairError, assetRunningRepairSuccess, assetRunningRepairData])

    // === Internal Fixed Asset Transfer Report ===
    const [
        passValueForInternalTransferReport,
        {
            data: internalTransferData,
            isFetching: internalTransferFetching,
            isError: internalTransferError,
            isSuccess: internalTransferSuccess
        }
    ] = useLazyGetInternalTransferReportQuery()

    useEffect(() => {
        if (internalTransferError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (internalTransferSuccess && internalTransferData) {
            setModalOpen(true)
            setReportView(internalTransferData)
        }
    }, [internalTransferError, internalTransferSuccess, internalTransferData])

    // === External Fixed Asset Transfer Report ===
    const [
        passValueForExternalTransferReport,
        {
            data: externalTransferData,
            isFetching: externalTransferFetching,
            isError: externalTransferError,
            isSuccess: externalTransferSuccess
        }
    ] = useLazyGetExternalTransferReportQuery()

    useEffect(() => {
        if (externalTransferError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (externalTransferSuccess && externalTransferData) {
            setModalOpen(true)
            setReportView(externalTransferData)
        }
    }, [externalTransferError, externalTransferSuccess, externalTransferData])

    // === Rented Asset Details Report ===
    const [
        passValueForRentedAssetDetailsReport,
        {
            data: rentedAssetDetailsData,
            isFetching: rentedAssetDetailsFetching,
            isError: rentedAssetDetailsError,
            isSuccess: rentedAssetDetailsSuccess
        }
    ] = useLazyGetRentedAssetDetailsReportQuery()

    useEffect(() => {
        if (rentedAssetDetailsError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (rentedAssetDetailsSuccess && rentedAssetDetailsData) {
            setModalOpen(true)
            setReportView(rentedAssetDetailsData)
        }
    }, [rentedAssetDetailsError, rentedAssetDetailsSuccess, rentedAssetDetailsData])

    // === Asset Management Detail Master Report ===
    const [
        passValueForAssetManagementDetailMasterReport,
        {
            data: assetManagementDetailMasterData,
            isFetching: assetManagementDetailMasterFetching,
            isError: assetManagementDetailMastersError,
            isSuccess: assetManagementDetailMasterSuccess
        }
    ] = useLazyGetAssetDetailsMasterReportQuery()

    useEffect(() => {
        if (assetManagementDetailMastersError) {
            setModalOpen(false)
            errorToast("Something Went Wrong")
        }
        if (assetManagementDetailMasterSuccess && assetManagementDetailMasterData) {
            setModalOpen(true)
            setReportView(assetManagementDetailMasterData)
        }
    }, [assetManagementDetailMasterData, assetManagementDetailMasterSuccess, assetManagementDetailMastersError])



    // ========== handel button ==========

    const handelSubmit = (e) => {
        e.preventDefault()
        if (reportTitle === "Asset Detail Summary Report") {
            passValueForAssetDetailsSummaryReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        if (reportTitle === "Asset Information Details") {
            passValueForAssetInformationDetailsReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else if (reportTitle === "Asset Management Report") {
            passValueForAssetManagementReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else if (reportTitle === "Asset Summary Report") {
            passValueForAssetSummaryReport({
                comID: company?.nCompanyID,
                userName: user?.userName
            })
        }
        else if (reportTitle === "Running Repair Report") {
            passValueForRunningRepairReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else if (reportTitle === "Internal Fixed Asset Transfer Report") {
            passValueForInternalTransferReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else if (reportTitle === "External Fixed Asset Transfer Report") {
            passValueForExternalTransferReport(
                {
                    fromCom: fromCom?.nCompanyID,
                    toCom: toCom?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else if (reportTitle === "Rented Asset Details Report") {
            passValueForRentedAssetDetailsReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else if (reportTitle === "Asset Management Detail Master Report") {
            passValueForAssetManagementDetailMasterReport(
                {
                    comID: company?.nCompanyID,
                    userName: user?.userName
                }
            )
        }
        else {
            infoToast("Please Select a Report");
        }
    }

    return (
        <form onSubmit={handelSubmit}>
            <Box
                sx={{
                    border: 1,
                    borderColor: "#17a2b8",
                    p: 1,
                    boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
                }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <CustomAppBar title={"REPORT LIST"} />
                        <Box
                            sx={{
                                p: 1,
                                border: "1px dashed grey",
                                borderTop: "none",
                                height: "calc(100% - 40px)",
                            }}
                        >
                            <SelectReport
                                options={[
                                    {
                                        value: "AssetManagementReport",
                                        label: "Asset Management Report",
                                    },
                                    {
                                        value: "AssetInformationDetails",
                                        label: "Asset Information Details",
                                    },
                                    {
                                        value: "AssetDetailSummaryReport",
                                        label: "Asset Detail Summary Report",
                                    },
                                    {
                                        value: "AssetSummaryReport",
                                        label: "Asset Summary Report",
                                    },
                                    {
                                        value: "RunningRepairReport",
                                        label: "Running Repair Report",
                                    },
                                    {
                                        value: "InternalFixedAssetTransferReport",
                                        label: "Internal Fixed Asset Transfer Report",
                                    },
                                    {
                                        value: "ExternalFixedAssetTransferReport",
                                        label: "External Fixed Asset Transfer Report",
                                    },
                                    {
                                        value: "RentedAssetDetailsReport",
                                        label: "Rented Asset Details Report",
                                    },
                                    {
                                        value: "ScheduledMaintenanceReport",
                                        label: "Scheduled Maintenance Report",
                                    },
                                    {
                                        value: "AssetManagementDetailMasterReport",
                                        label: "Asset Management Detail Master Report",
                                    },
                                ]}
                                id="reportName"
                                title="Report Name"
                                setTitle={setReportTitle}
                            />
                        </Box>
                    </Grid>
                    {/* parameter */}
                    <Grid item xs={12} sm={6}>
                        <CustomAppBar title={"REPORT PARAMETER'S"} />
                        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                            <Grid container spacing={1} mt={"5px"}>
                                {
                                    reportTitle === "External Fixed Asset Transfer Report" ?
                                        <>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <CustomAutocomplete
                                                    label={"From Company"}
                                                    name='fromCom'
                                                    optionId={"nCompanyID"}
                                                    options={companyData ?? []}
                                                    optionLabel={"cCmpName"}
                                                    value={fromCom}
                                                    setReduxState={setAssetReport}
                                                    loading={isCompanyLoading}
                                                    required={true}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <CustomAutocomplete
                                                    label={"To Company"}
                                                    name='toCom'
                                                    optionId={"nCompanyID"}
                                                    options={companyData ?? []}
                                                    optionLabel={"cCmpName"}
                                                    value={toCom}
                                                    setReduxState={setAssetReport}
                                                    loading={isCompanyLoading}
                                                    required={true}
                                                />
                                            </Grid>
                                        </>
                                        :
                                        <Grid item xs={12} sm={6} md={12}>
                                            <CustomAutocomplete
                                                label={"company"}
                                                name='company'
                                                optionId={"nCompanyID"}
                                                options={companyData ?? []}
                                                optionLabel={"cCmpName"}
                                                value={company}
                                                setReduxState={setAssetReport}
                                                loading={isCompanyLoading}
                                                required={true}
                                            />
                                        </Grid>

                                }
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomDatePicker
                                        label={"From Date"}
                                        name='fromDate'
                                        value={fromDate}
                                        setReduxState={setAssetReport}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomDatePicker
                                        label={"To Date"}
                                        name='toDate'
                                        value={toDate}
                                        setReduxState={setAssetReport}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Asset Category"}
                                        name='AssetCategory'
                                        optionId={"acat_id"}
                                        options={assetCategoryData ?? []}
                                        optionLabel={"acat_name"}
                                        value={AssetCategory}
                                        setReduxState={setAssetReport}
                                        loading={isAssetCategoryLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Status"}
                                        name='status'
                                        loading={isAssetStatusLoading}
                                        optionId={"statusId"}
                                        options={assetStatusData ?? []}
                                        optionLabel={"statusName"}
                                        value={status}
                                        setReduxState={setAssetReport}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Floor"}
                                        name='floor'
                                        loading={isFloorLoading}
                                        optionId={"nFloor"}
                                        options={company ? floorData ?? [] : []}
                                        optionLabel={"cFloor_Descriptin"}
                                        value={floor}
                                        setReduxState={setAssetReport} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <CustomAutocomplete
                                        label={"Line"}
                                        name='line'
                                        loading={isLineLoading}
                                        optionId={"line_Code"}
                                        options={company && floor ? lineData ?? [] : []}
                                        optionLabel={"line_No"}
                                        value={line}
                                        setReduxState={setAssetReport}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={12}>
                                    {/* <SubmitButton fullWidth title={"Generate Report"} /> */}
                                    <ReportButton
                                        fullWidth
                                        title={"Generate Report"}
                                        type='submit'
                                        loading={
                                            managementReportFetching ||
                                            assetInfoDetailsReportFetching ||
                                            assetDetailsSummaryReportFetching ||
                                            assetSummaryFetching ||
                                            assetRunningRepairFetching ||
                                            internalTransferFetching ||
                                            externalTransferFetching ||
                                            rentedAssetDetailsFetching ||
                                            assetManagementDetailMasterFetching
                                        }
                                        disabled={reportTitle === ""}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid >
            </Box >
            <ReportViewer
                title={reportTitle}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                reportData={reportView}
            />
        </form >
    );
};

export default AssetReport;