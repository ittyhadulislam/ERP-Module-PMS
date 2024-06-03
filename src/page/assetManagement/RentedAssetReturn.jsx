import { Box } from '@mui/material';
import React, { useState } from 'react';
import RentedAssetReturnInput from '../../components/rentedAssetReturn/RentedAssetReturnInput';
import RentedAssetReturnView from '../../components/rentedAssetReturn/RentedAssetReturnView';
import RentedAssetReturnAddView from '../../components/rentedAssetReturn/RentedAssetReturnAddView';

const RentedAssetReturn = () => {
    const [autoUpdate, setAutoUpdate] = useState(0)
    return (
        <div>
            <Box
                sx={{
                    border: 1,
                    borderColor: "#17a2b8",
                    p: 1,
                    boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
                }}
            >
                <RentedAssetReturnInput />
                <RentedAssetReturnView setAutoUpdate={setAutoUpdate} />
                <RentedAssetReturnAddView autoUpdate={autoUpdate} />
            </Box>
        </div>
    );
};

export default RentedAssetReturn;