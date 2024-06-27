import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from '../table/CustomTable';
import { useSelector } from 'react-redux';
import { useGetAddViewInTableForRentedAssetReturnDetailsQuery } from '../../redux/features/assetManagement/rentedAssetReturn/queryRentedAssetReturn';
import ReturnButton from '../buttons/ReturnButton';
import SubmitButton from '../buttons/SubmitButton';
import { useUpdateDataInTableForRentedAssetReturnCompleteMutation } from '../../redux/features/assetManagement/rentedAssetReturn/mutationRentedAssetReturn';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const RentedAssetReturnAddView = ({ autoUpdate }) => {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    const {
        returnDate,
        currentHolder,
        supplier,
    } = useSelector(state => state.rentedAssetReturn)

    // get Add View Details
    const { data: addViewDetails, isLoading: isAddViewLoading, refetch } = useGetAddViewInTableForRentedAssetReturnDetailsQuery({
        comID: currentHolder?.nCompanyID,
        supID: supplier?.cSupCode
    })

    useEffect(() => {
        refetch()
    }, [autoUpdate])

    // Update Complete
    const [passParamsForAddDetailsLest] = useUpdateDataInTableForRentedAssetReturnCompleteMutation()


    const handelComplete = async () => {
        try {
            const payload = [
                {
                    returnRefNo: 1,
                    returnDate: returnDate,
                    returnUser: user?.userName
                }
            ]
            console.log(payload)
            const response = await passParamsForAddDetailsLest(payload)
            refetch()
        } catch (error) {
            console.log(error);
        }
    }


    const handelNavigation = () => {
        navigate("/rented-asset-return-approval")
    }

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
            field: "inputUser",
            headerName: "Input User",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "inputDate",
            headerName: "Input Date",
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
            <CustomAppBar title={"Return Asset Add Details"} />
            <CustomTable
                columns={column}
                rows={currentHolder && supplier ? addViewDetails?.map((row, id) => ({ ...row, id })) : []}
                height={currentHolder && supplier ? addViewDetails?.length ? "auto" : "280px" : "280px"}

            />
            <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
                <Stack
                    direction={"row"}
                    p={0.5}
                    spacing={2}
                    justifyContent="end"
                >
                    <ReturnButton
                        title={"Go To Approval"}
                        type='reset'
                        handleClick={handelNavigation}
                    />
                    <SubmitButton
                        title={"Complete"}
                        type='submit'
                        handleClick={handelComplete}
                        disabled={!returnDate}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default RentedAssetReturnAddView;