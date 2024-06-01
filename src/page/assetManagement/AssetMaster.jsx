import { Box } from '@mui/material';
import React, { useState } from 'react';
import AssetMasterInput from '../../components/assetMaster/AssetMasterInput';
import AssetMasterView from '../../components/assetMaster/AssetMasterView';

const AssetMaster = () => {
    const [editsble, setEditable] = useState(null);

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "#17a2b8",
                p: 1,
                boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
            }}
        >
            <AssetMasterInput editsble={editsble} setEditable={setEditable} />
            <AssetMasterView setEditable={setEditable} />
        </Box>
    );
};

export default AssetMaster;