/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';
import { useGetViewForRunningRepairQuery } from '../../redux/features/assetManagement/runningRepair/queryRunningRepair';
import { RxCross1 } from "react-icons/rx";
import { MdDeleteForever, MdOutlineDelete } from "react-icons/md";
import { useDeleteRunningRepairMutation } from '../../redux/features/assetManagement/runningRepair/mutationRunningRepair';
import { LoadingButton } from '@mui/lab';


const RunningRepairView = ({
    refetchData
}) => {
    // console.log(response)
    const { data: viewData, isLoading: isViewDataLoading, refetch } = useGetViewForRunningRepairQuery()

    useEffect(() => {
        refetch()
    }, [refetchData])

    // ----- Delete -----

    // const [deleteRunningRepair, { data, isLoading }] = useDeleteRunningRepairMutation()

    // const handelDelete = (details) => {
    //     console.log(details)
    //     deleteRunningRepair(details?.mr_asstno)
    // }

    const column = [
        {
            field: "mr_asstno",
            headerName: "AssetNo",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        {
            field: "mr_next_service_date",
            headerName: "Next Service Date",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "mr_last_service_date",
            headerName: "Last Service Date",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "mr_repair_date",
            headerName: "Repair Date",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "mr_repair_details",
            headerName: "Repair Details",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "mr_item_replace",
            headerName: "Item Replace",
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "mr_down_time",
            headerName: "Down Time",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        {
            field: "mr_attended_time",
            headerName: "Attendent Time",
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "mr_ready_date",
            headerName: "Ready Date",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "mr_done_by",
            headerName: "Done By",
            flex: 1,
            minWidth: 160,
            maxWidth: 160,
        },
        {
            field: "mr_input_by",
            headerName: "Created By",
            flex: 1,
            minWidth: 154,
            maxWidth: 154,
        },
        {
            field: "mr_input_date",
            headerName: "Created Date",
            flex: 1,
            minWidth: 160,
            maxWidth: 160,
        },
        {
            field: "Delete",
            headerName: "Delete",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
            headerAlign: "center",
            align: "center",
            renderCell: (row) => {
                return (
                    <>
                        <LoadingButton
                            variant="outlined"
                            size="small"
                            color="error"
                            title="DELETE"
                            sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
                        >
                            {/* <MdDeleteForever color='red' size={18} style={{ marginLeft: "4px", marginTop: "-1px", }} /> */}
                            <MdOutlineDelete size={20} />
                        </LoadingButton>

                    </>
                )
            }

        },
    ]
    // viewData?.map((row, id) => (console.log({ ...row, id })))

    return (
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
            <CustomAppBar title={"Running Repair Details"} />
            <CustomTable
                columns={column}
                rows={viewData?.map((row, id) => ({ ...row, id }))}
                height={viewData?.length ? "auto" : "280px"}
                loading={isViewDataLoading}
            />
        </Box>
    );
};

export default RunningRepairView;