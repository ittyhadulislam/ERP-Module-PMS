import React, { useEffect, useState } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import { Box, Stack } from '@mui/material';
import CustomTable from '../table/CustomTable';
import { useSelector } from 'react-redux';
import { useLazyGetViewInTableForRentedAssetReturnDetailsQuery } from '../../redux/features/assetManagement/rentedAssetReturn/queryRentedAssetReturn';
import SubmitButton from '../buttons/SubmitButton';
import ReturnButton from './../buttons/ReturnButton';
import { useUpdateDataInTable1ForRentedAssetReturnMutation } from '../../redux/features/assetManagement/rentedAssetReturn/mutationRentedAssetReturn';
import { successToast } from './../../common/toaster/toaster';

const RentedAssetReturnView = () => {

    const [selectRows, setSelectRows] = useState([])
    // console.log(selectRows)

    const {
        currentHolder,
        supplier,
        returnDate
    } = useSelector(state => state.rentedAssetReturn)
    const {
        user
    } = useSelector(state => state.auth)


    // ===== View List in Table =====
    const [setParamForViewList, { data: viewList, isLoading }] = useLazyGetViewInTableForRentedAssetReturnDetailsQuery()
    useEffect(() => {
        if (currentHolder && supplier) {
            const payload = {
                comID: currentHolder?.nCompanyID,
                supID: supplier?.cSupCode
            }
            setParamForViewList(payload)
        }
    }, [currentHolder, supplier])

    // ----- post -----

    const [saveDataRentedAssetReturn, { isLoading: isDataSaveLoading }] = useUpdateDataInTable1ForRentedAssetReturnMutation()

    const handelClick = async () => {
        try {
            const payload = selectRows.map((item) => ({
                returnRefNo: item?.acat_id,
                returnDate: returnDate,
                returnUser: user?.userName
            }))
            console.log(payload);
            const res = await saveDataRentedAssetReturn(payload)
            console.log(res);
            // if (res) {
            //     successToast(res?.data?.message)
            // }
        } catch (error) {
            console.log(error);
        }
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
            field: "cFloor_Descriptin",
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
            minWidth: 162,
            maxWidth: 162,
        },
    ]

    return (
        <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
            <CustomAppBar title={"Rented Asset Return Details"} />
            <CustomTable
                columns={column}
                rows={currentHolder && supplier ? viewList?.map((row, id) => ({ ...row, id })) : []}
                loading={isLoading}
                checkboxSelection={true}
                setSelectedRows={setSelectRows}
                height={currentHolder && supplier ? viewList?.length ? "auto" : "280px" : "280px"}
            />
            <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
                <Stack
                    direction={"row"}
                    p={0.5}
                    spacing={2}
                    justifyContent="end"
                >
                    <ReturnButton
                        title={"Clear"}
                        type='reset'
                    />
                    <SubmitButton
                        title={"Add"}
                        type='submit'
                        handleClick={handelClick}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default RentedAssetReturnView;