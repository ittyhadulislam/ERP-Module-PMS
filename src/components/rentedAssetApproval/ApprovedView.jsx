import React, { useEffect } from 'react';
import CustomTable from '../table/CustomTable';
import { Box } from '@mui/material';
import CustomAppBar from '../common/CustomAppBar';
import { useSelector } from 'react-redux';
import { useLazyGetRentedAssetApprovedQuery } from '../../redux/features/assetManagement/rentedAssetApproval/queryRentedAssetApproval';
import dayjs from 'dayjs';

const ApprovedView = () => {

    const { user } = useSelector(state => state.auth)

    // get and show approve data

    const [getDataRentedAssetApproved, { data, isLoading }] = useLazyGetRentedAssetApprovedQuery()
    console.log(data)
    useEffect(() => {
        getDataRentedAssetApproved(user?.companyID)
    }, [])

    const column = [
        {
            field: "rentAssetNo",
            headerName: "AssetNo",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        {
            field: "mcDesc",
            headerName: "Machine Name",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "cCmpName",
            headerName: "Company Name",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "cFloor_Descriptin",
            headerName: "Floor",
            flex: 1,
            // minWidth: 130,
            // maxWidth: 130,
        },
        {
            field: "line_No",
            headerName: "Line",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
        },
        {
            field: "rentDate",
            headerName: "Rent Date",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "returnDate",
            headerName: "Return Date",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "cUserFullname",
            headerName: "Created By",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "returnInputDate",
            headerName: "Created Date",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "rentApproveBy",
            headerName: "Approved By",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "rentApproveDate",
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
                rows={data?.map((row, id) => ({ ...row, id }))}
                height={data?.length ? "auto" : "280px"}
            />
        </Box>
    );
};

export default ApprovedView;