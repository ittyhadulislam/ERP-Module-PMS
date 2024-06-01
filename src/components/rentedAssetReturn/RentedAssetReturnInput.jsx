import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import { Box, Grid } from '@mui/material';
import CustomDatePicker from '../inputs/CustomDatePicker';
import CustomAutocomplete from '../inputs/CustomAutocomplete';
import { useSelector } from 'react-redux';
import { useGetCurrentHolderForRentedAssetReturnQuery, useLazyGetSupplierForRentedAssetReturnQuery } from "../../redux/features/assetManagement/rentedAssetReturn/queryRentedAssetReturn"
import { setRentedAssetReturn } from '../../redux/features/assetManagement/rentedAssetReturn/rentedAssetReturnSlice';

const RentedAssetReturnInput = () => {

    const {
        returnDate,
        currentHolder,
        supplier,
    } = useSelector(state => state.rentedAssetReturn)

    // ----- Current Holder -----
    const { data: currentHolderData, isLoading: isCurrentHolderLoading } = useGetCurrentHolderForRentedAssetReturnQuery()

    // console.log(currentHolderData)

    // ----- Supplier -----
    const [setSupplier, { data: getSupplierData, isLoading: isSupplierLoading }] = useLazyGetSupplierForRentedAssetReturnQuery()

    useEffect(() => {
        if (currentHolder) {
            setSupplier(currentHolder?.nCompanyID)
        }
    }, [currentHolder])

    return (
        <>
            <CustomAppBar title={"Rent Asset Return"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form>
                    <Grid container spacing={1} mt={"5px"}>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomDatePicker
                                label={"Return Date"}
                                name='returnDate'
                                value={returnDate}
                                setReduxState={setRentedAssetReturn}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomAutocomplete
                                label={"Current Holder"}
                                name='currentHolder'
                                options={currentHolderData ?? []}
                                optionId={"nCompanyID"}
                                optionLabel={"cCmpName"}
                                value={currentHolder}
                                loading={isCurrentHolderLoading}
                                setReduxState={setRentedAssetReturn}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomAutocomplete
                                label={"Supplier"}
                                name='supplier'
                                options={currentHolder ? getSupplierData ?? [] : []}
                                optionId={"cSupCode"}
                                optionLabel={"cSupName"}
                                value={supplier}
                                loading={isSupplierLoading}
                                setReduxState={setRentedAssetReturn}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
};

export default RentedAssetReturnInput;