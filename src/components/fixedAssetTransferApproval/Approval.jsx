import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import CustomTable from '../table/CustomTable';
import CustomAppBar from '../common/CustomAppBar';
import { useLazyGetInternalAndExternalDetailsApprovedQuery } from '../../redux/features/assetManagement/fixedAssetTransferApproval/queryFixedAssetTransferApproval';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Approval = () => {
    const { user } = useSelector(state => state.auth)
    // console.log(user)
    const [getData, { data, isLoading }] = useLazyGetInternalAndExternalDetailsApprovedQuery()

    useEffect(() => {
        getData(user?.companyID)
    }, [user])


    const column = [
        {
            field: "iet_ref_no",
            headerName: "Ref No",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        {
            field: "traName",
            headerName: "Transfer Type",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "fromCom",
            headerName: "From Company",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "toCom",
            headerName: "To Company",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "iet_date",
            headerName: "Transfer Date",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "iet_input_user",
            headerName: "Created By",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "iet_input_date",
            headerName: "Created Date",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "iet_approve_user",
            headerName: "Approved By",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "iet_approve_date",
            headerName: "Approved Date",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
    ]
    return (
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
            <CustomAppBar title={"Rented Asset Return Details"} />
            <CustomTable
                columns={column}
                rows={data?.map((row, index) => ({ ...row, id: index }))}
                height={data?.length ? "auto" : "280px"}
            />
        </Box>
    );
};

export default Approval;