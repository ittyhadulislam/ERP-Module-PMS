import React from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';

const ServiceDescriptionView2 = () => {

    const column = [
        {
            field: "AssetNo",
            headerName: "AssetNo",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        {
            field: "NextServiceDate",
            headerName: "Next Service Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "ItemReplaced",
            headerName: "Item Replaced",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "ReadyDate",
            headerName: "Ready Date",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "DoneBy",
            headerName: "Done By",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "CreatedDate",
            headerName: "Created Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "CreatedBy",
            headerName: "Created By",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
    ]
    return (
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
            <CustomAppBar title={"Service Description"} />
            <CustomTable
                columns={column}
                rows={[]}
                toolBar={false}
                // search={true}
                hideFooter={true}
            />
        </Box>
    );
};

export default ServiceDescriptionView2;