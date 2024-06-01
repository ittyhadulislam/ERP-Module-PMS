import React from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';

const ServiceDescriptionView1 = () => {
    const column = [
        {
            field: "Select",
            headerName: "Select",
            flex: 1,
            minWidth: 60,
            maxWidth: 60,
        },
        {
            field: "id",
            headerName: "ID",
            flex: 1,
            minWidth: 80,
            maxWidth: 80,
        },
        {
            field: "Service Type",
            headerName: "Service Type",
            flex: 1,
            minWidth: 140,
            maxWidth: 140,
        },
    ]
    return (
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", borderRight: "none" }}>
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

export default ServiceDescriptionView1;