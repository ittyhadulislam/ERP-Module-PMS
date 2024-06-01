import { Box, Grid } from '@mui/material';
import React from 'react';
import CustomAppBar from '../../components/common/CustomAppBar';
import SelectReport from '../../components/common/SelectReport';

const AssetReport = () => {
    return (
        <form>
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
                            // setTitle={setTitle}
                            />
                        </Box>
                    </Grid>
                    {/* parameter */}
                    <Grid item xs={12} sm={6}>
                        <CustomAppBar title={"REPORT PARAMETER'S"} />

                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default AssetReport;