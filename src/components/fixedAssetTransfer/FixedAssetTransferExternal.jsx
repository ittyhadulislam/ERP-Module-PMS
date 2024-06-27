import FixedAssetTransferViewExternal from './externalTransfer/FixedAssetTransferViewExternal';
import FixedAssetTransferExternalInput from './externalTransfer/FixedAssetTransferExternalInput';
import { useState } from 'react';

const FixedAssetTransferExternal = () => {
    const [refetchData, setRefetchData] = useState(0)
    return (
        <>
            <FixedAssetTransferExternalInput setRefetchData={setRefetchData} />
            {/* <FixedAssetTransferViewExternal /> */}
        </>
    );
};

export default FixedAssetTransferExternal;