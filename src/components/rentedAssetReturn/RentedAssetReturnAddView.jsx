import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { useSelector } from 'react-redux';
import { useLazyGetAddViewInTableForRentedAssetReturnDetailsQuery } from '../../redux/features/assetManagement/rentedAssetReturn/queryRentedAssetReturn';

const RentedAssetReturnAddView = () => {
    const {
        // returnDate,
        currentHolder,
        supplier,
    } = useSelector(state => state.rentedAssetReturn)

    // get Add View Details
    const [setDetailsForShowData, { data: addViewDetails, isLoading: isAddViewLoading }] = useLazyGetAddViewInTableForRentedAssetReturnDetailsQuery()

    useEffect(() => {
        if (currentHolder && supplier) {
            const payload = {
                comID: currentHolder?.nCompanyID,
                supID: supplier?.cSupCode
            }
            setDetailsForShowData(payload)
        }
    }, [currentHolder, supplier])

    // console.log(addViewDetails)

    const column = [
        {
            field: "action",
            headerName: "Select",
            flex: 1,
            minWidth: 75,
            maxWidth: 75,
        },
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
            headerName: "Input User",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "InputDate",
            headerName: "Input Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
    ]
    return (
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
            <CustomAppBar title={"Return Asset Add Details"} />
            <CustomTable
                columns={column}
                rows={currentHolder && supplier ? addViewDetails?.map((row, id) => ({ ...row, id })) : []}
                height={currentHolder && supplier ? addViewDetails?.length ? "auto" : "280px" : "280px"}

            />
        </Box>
    );
};

export default RentedAssetReturnAddView;