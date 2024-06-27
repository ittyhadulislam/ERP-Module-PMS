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
import { useUpdateExternalTransferApprovalMutation } from '../../redux/features/assetManagement/fixedAssetTransferApproval/mutationFixedAssetTransferApproval';
import { successToast } from '../../common/toaster/toaster';
import dayjs from 'dayjs';

const ExternalForApprovalView = () => {
    const [selectedRow, setSelected] = useState([])
    console.log("SELECTED:", selectedRow)
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    // get and show data
    const { data, isLoading, refetch } = useGetExternalTransferDetailsForApprovalQuery({
        comID: user?.companyID,
    })

    console.log("DATA:", data)

    // update approval
    const [passPayloadOverUpdateAPI] = useUpdateExternalTransferApprovalMutation()

    const handelApprove = async () => {
        try {
            // const payload = selectedRow?.map(item => ({
            //     assetNo: item?.iet_asset_no,
            //     approval_by: user?.userName
            // }))
            // console.log(payload);
            const payload = selectedRow?.map(item => ({
                RefNo: item?.iet_ref_no,
                approval_by: user?.userName
            }))
            const response = await passPayloadOverUpdateAPI(payload)
            if (response) {
                successToast("Approve Successfully")
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handelReturn = () => {
        navigate("/fixed-asset-transfer")
    }

    const column = [
        {
            field: "iet_ref_no",
            headerName: "Ref No",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        // {
        //     field: "iet_asset_no",
        //     headerName: "Asset No#",
        //     flex: 1,
        //     minWidth: 90,
        //     maxWidth: 90,
        // },
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
        // {
        //     field: "iet_remarks",
        //     headerName: "Remarks",
        //     flex: 1,
        //     // minWidth: 120,
        //     // maxWidth: 120,
        // },
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
                            handleClick={handelApprove}
                            disabled={selectedRow.length > 0 ? false : true}
                        />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default ExternalForApprovalView;