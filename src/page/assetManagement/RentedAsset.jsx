import React, { useState } from 'react';
import { Box } from '@mui/material';
import RentedAssetInput from '../../components/rentedAsset/RentedAssetInput';
import RentedAssetView from '../../components/rentedAsset/RentedAssetView';

const RentedAsset = () => {
    const [getDetailsForEdit, setGetDetailsForEdit] = useState(null)
    return (
        <Box
            sx={{
                border: 1,
                borderColor: "#17a2b8",
                p: 1,
                boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
            }}
        >
            <RentedAssetInput getDetailsForEdit={getDetailsForEdit} />
            <RentedAssetView setGetDetailsForEdit={setGetDetailsForEdit} />
        </Box>
    );
};

export default RentedAsset;