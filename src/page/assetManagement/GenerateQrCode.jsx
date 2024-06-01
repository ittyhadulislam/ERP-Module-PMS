import React from 'react';
import CustomAppBar from '../../components/common/CustomAppBar';
import { Box, Grid } from '@mui/material';
import CustomAutocomplete from '../../components/inputs/CustomAutocomplete';

const GenerateQrCode = () => {
    return (
        <>
            <CustomAppBar title={"Generate QR Code"} />
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <form>
                    <Grid container spacing={1} mt={"5px"}>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <CustomAutocomplete
                                label={"Current Holder"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <CustomAutocomplete
                                label={"Asset Category"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <CustomAutocomplete
                                label={"Floor"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <CustomAutocomplete
                                label={"Line"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2.4}>
                            <CustomAutocomplete
                                label={"Asset No#"}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
                <CustomAppBar title={"Asset Add Details"} />
            </Box>
        </>
    );
};

export default GenerateQrCode;