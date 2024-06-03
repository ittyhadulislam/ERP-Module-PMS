import React, { useEffect, useState } from 'react';
import CustomTable from '../table/CustomTable';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetRentedAssetForApprovalQuery } from '../../redux/features/assetManagement/rentedAssetApproval/queryRentedAssetApproval';
import ReturnButton from '../buttons/ReturnButton';
import SubmitButton from '../buttons/SubmitButton';
import ErrorButton from '../buttons/ErrorButton';
import { useUpdateForApprovalMutation } from '../../redux/features/assetManagement/rentedAssetApproval/mutetionRentedAssetApproval';
import { useNavigate } from 'react-router-dom';

const ForApprovalView = () => {
    const [selectedRow, setSelectedRow] = useState([])
    const navigate = useNavigate()
    const {
        user
    } = useSelector(state => state.auth)
    console.log(user)

    // ----- view data for approval

    const { data: showDetailsForApproval, isLoading: isViewLoading, refetch } = useGetRentedAssetForApprovalQuery(user.companyID)
    // console.log(showDetailsForApproval)
    // ----- update for Approval ------
    const [passValueForApproval, { isLoading }] = useUpdateForApprovalMutation()

    const handelApprove = () => {
        try {
            const payload = selectedRow?.map(item => ({
                assetNo: item?.rentAssetNo,
                appby: user?.userName
            }))
            // console.log(payload)
            const res = passValueForApproval(payload)
            if (res) {
                refetch()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handelReturn = () => {
        navigate("/rented-asset-return")
    }

    const column = [
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
            minWidth: 230,
            maxWidth: 230,
        },
        {
            field: "cCmpName",
            headerName: "Company Name",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "nFloor",
            headerName: "Floor",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "line_No",
            headerName: "Line",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "rentDate",
            headerName: "Rent Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "returnDate",
            headerName: "Return Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "cUserFullname",
            headerName: "Created By",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "returnInputDate",
            headerName: "Created Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
    ]

    return (
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
            {/* <CustomAppBar title={"Rented Asset Return Details"} /> */}
            <CustomTable
                columns={column}
                rows={showDetailsForApproval?.map((row, id) => ({ ...row, id }))}
                checkboxSelection
                setSelectedRows={setSelectedRow}
                height={showDetailsForApproval?.length ? "auto" : "280px"}
                loading={isViewLoading}
            />
            <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
                <Stack
                    direction={"row"}
                    p={0.5}
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Box>
                        <ReturnButton
                            title={"Go To Return"}
                            handleClick={handelReturn}
                        />
                    </Box>
                    <Box>
                        <ErrorButton
                            title={"Cancel"}
                            type='submit'
                        // handleClick={}
                        />
                        <SubmitButton
                            title={"Approve"}
                            type='submit'
                            handleClick={handelApprove}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ForApprovalView;