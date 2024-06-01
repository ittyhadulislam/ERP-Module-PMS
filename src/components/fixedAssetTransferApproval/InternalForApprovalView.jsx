import React from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';

const InternalForApprovalView = () => {
    const column = [
        {
            field: "RefNo",
            headerName: "Ref No",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "TransferType",
            headerName: "Transfer Type",
            flex: 1,
            minWidth: 230,
            maxWidth: 230,
        },
        {
            field: "FromCompany",
            headerName: "From Company",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "ToCompany",
            headerName: "To Company",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "TransferDate",
            headerName: "Transfer Date",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "CreatedBy",
            headerName: "Created By",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "CreatedDate",
            headerName: "Created Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "ApprovedBy",
            headerName: "Approved By",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "ApprovedDate",
            headerName: "Approved Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
    ]
    return (
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
            <CustomAppBar title={"Rented Asset Return Details"} />
            <CustomTable
                columns={column}
                rows={[]}
            />
        </Box>
    );
};

export default InternalForApprovalView;