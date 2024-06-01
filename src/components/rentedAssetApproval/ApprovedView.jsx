import React from 'react';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';
import CustomAppBar from '../common/CustomAppBar';

const ApprovedView = () => {
    const column = [
        {
            field: "AssetNo",
            headerName: "AssetNo",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "MachineName",
            headerName: "Machine Name",
            flex: 1,
            minWidth: 230,
            maxWidth: 230,
        },
        {
            field: "CompanyName",
            headerName: "Company Name",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "Floor",
            headerName: "Floor",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "Line",
            headerName: "Line",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "RentDate",
            headerName: "Rent Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "ReturnDate",
            headerName: "Return Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "InputUser",
            headerName: "Created By",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "InputDate",
            headerName: "Created Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "InputUser1",
            headerName: "Approved By",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "InputDate1",
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

export default ApprovedView;