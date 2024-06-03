import React, { useState } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { Box, Stack } from '@mui/material';
import ReturnButton from '../buttons/ReturnButton';
import ErrorButton from '../buttons/ErrorButton';
import SubmitButton from '../buttons/SubmitButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetExternalTransferDetailsForApprovalQuery } from '../../redux/features/assetManagement/fixedAssetTransferApproval/queryFixedAssetTransferApproval';

const ExternalForApprovalView = () => {
    const [selectedRow, setSelected] = useState([])
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    // get and show data
    const { data, isLoading } = useGetExternalTransferDetailsForApprovalQuery({
        comID: user?.companyID,
        userName: user?.userName
    })
    console.log(data)

    const handelReturn = () => {
        navigate("/fixed-asset-transfer")
    }

    const column = [
        {
            field: "iet_id",
            headerName: "Ref No",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "iet_asset_no",
            headerName: "Asset No#",
            flex: 1,
            minWidth: 230,
            maxWidth: 230,
        },
        {
            field: "fromCom",
            headerName: "From Company",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "toCom",
            headerName: "To Company",
            flex: 1,
            minWidth: 130,
            maxWidth: 130,
        },
        {
            field: "iet_remarks",
            headerName: "Remarks",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "iet_date",
            headerName: "Transfer Date",
            flex: 1,
            minWidth: 120,
            maxWidth: 120,
        },
        {
            field: "iet_input_user",
            headerName: "Created By",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "iet_input_date",
            headerName: "Created Date",
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
                rows={data?.map((row, id) => ({ ...row, id }))}
                checkboxSelection
                setSelectedRows={setSelected}
                loading={isLoading}
                height={data?.length ? "auto" : "280px"}
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
                        // handleClick={handelApprove}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ExternalForApprovalView;