import React, { useState } from 'react';
import CustomRadioButtonForLocal from '../../components/inputs/CustomRadioButtonForLocal';
import { Box } from '@mui/material';
import FixedAssetTransferInternal from '../../components/fixedAssetTransfer/FixedAssetTransferInternal';
import FixedAssetTransferExternal from '../../components/fixedAssetTransfer/FixedAssetTransferExternal';

const FixedAssetTransfer = () => {
    const [select, setSelect] = useState("1")

    let content
    // if Internal Transfer Select 
    if (select === "1") {
        content = <FixedAssetTransferInternal />
    }
    // if External Transfer Select
    if (select === "2") {
        content = <FixedAssetTransferExternal />
    }

    return (
        <>
            <Box
                sx={{
                    border: 1,
                    borderColor: "#17a2b8",
                    p: 1,
                    boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
                }}
            >
                <Box sx={{ p: "1px", borderBottom: "1px dashed grey", marginBottom: "10px" }}>
                    <CustomRadioButtonForLocal groupQuantity={[
                        {
                            label: "Internal Transfer",
                            value: "1",
                        },
                        {
                            label: "External Transfer",
                            value: "2",
                        },
                    ]}
                        setState={setSelect}
                    />
                </Box>
                {content}
            </Box>
        </>
    );
};

export default FixedAssetTransfer;