import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import { Box } from '@mui/material';
import CustomTable from '../table/CustomTable';
import { useLazyGetViewForRentedAssetQuery } from '../../redux/features/assetManagement/rentedAsset/queryRentedAsset';
import { useSelector } from 'react-redux';
import { BiSelectMultiple } from "react-icons/bi";

const RentedAssetView = ({ setGetDetailsForEdit = () => { } }) => {

    const { assetNo } = useSelector(state => state.rentedAsset)
    const [getRentedAssetView, { data: getRentedAssetViewData, isLoading: isViewDataLoading }] = useLazyGetViewForRentedAssetQuery()
    // console.log(assetNo)

    useEffect(() => {
        const payload = {
            AssetNo: assetNo
        }
        getRentedAssetView(payload)
    }, [assetNo, getRentedAssetView])

    const handelSelect = (payload) => {
        // console.log(payload)
        setGetDetailsForEdit(payload)
    }
    const column = [
        {
            field: "action",
            headerName: "Select",
            flex: 1,
            minWidth: 75,
            maxWidth: 75,
            renderCell: row => {
                return (
                    <span
                        onClick={() => handelSelect(row?.row)}
                        style={{ color: "#1976d2", cursor: "pointer" }}
                    >
                        Select
                        <BiSelectMultiple
                            color="green"
                            style={{ marginLeft: "4px", marginTop: "-4px" }}
                        />
                    </span>
                )
            }
        },
        {
            field: "rentAssetNo",
            headerName: "AssetNo",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "mcDesc",
            headerName: "Machine Name",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "cCmpName",
            headerName: "Company Name",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "cFloor_Descriptin",
            headerName: "Floor",
            flex: 1,
            minWidth: 160,
            maxWidth: 160,
        },
        {
            field: "line_No",
            headerName: "Line",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "rentDate",
            headerName: "RentDate",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "returnDate",
            headerName: "Return Date",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "inputUser",
            headerName: "Input User",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "inputDate",
            headerName: "Input Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
    ]

    return (
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
            <CustomAppBar title={"Rented Asset Details"} />
            <CustomTable
                columns={column}
                rows={getRentedAssetViewData?.map((data, id) => ({ ...data, id }))}
                loading={isViewDataLoading}
                height={getRentedAssetViewData?.length ? "auto" : "280px"}
            />
        </Box>
    );
};

export default RentedAssetView;