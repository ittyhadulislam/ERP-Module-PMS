/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';
import { useGetServiceTypeQuery } from '../../redux/features/assetManagement/ScheduleMaintenance/queryScheduleMaintenance';

const ServiceDescriptionView1 = ({ setGetServiceType, isSuccess }) => {
    const [selectedRow, setSelectedRow] = useState([])

    useEffect(() => {
        setGetServiceType(selectedRow)
    }, [selectedRow])

    useEffect(() => {
        setSelectedRow([])
    }, [isSuccess])

    const { data, isLoading } = useGetServiceTypeQuery()

    const column = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
            minWidth: 80,
            maxWidth: 80,
        },
        {
            field: "ser_service_type",
            headerName: "Service Type",
            flex: 1,
        },
    ]
    return (
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none", borderRight: "none" }}>
            <CustomAppBar title={"Service Description"} />
            <CustomTable
                columns={column}
                rows={data?.map((row, id) => ({ ...row, id: id + 1 }))}
                toolBar={false}
                checkboxSelection
                setSelectedRows={setSelectedRow}
                // search={true}
                hideFooter={true}
                loading={isLoading}
                isSuccess={isSuccess}
            // height={data?.length ? "auto" : "280px"}
            />
        </Box>
    );
};

export default ServiceDescriptionView1;