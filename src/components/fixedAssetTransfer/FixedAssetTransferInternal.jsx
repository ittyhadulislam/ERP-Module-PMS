import FixedAssetTransferViewInternal from './internalTransfer/FixedAssetTransferViewInternal';
import FixedAssetTransferInternalInput from './internalTransfer/FixedAssetTransferInternalInput';
import { useState } from 'react';

const FixedAssetTransferInternal = () => {
    const [refetchData, setRefetchData] = useState(0)

    return (
        <>
            <FixedAssetTransferInternalInput setRefetchData={setRefetchData} />
            {/* <FixedAssetTransferViewInternal refetchData={refetchData} /> */}
        </>
    );
};

export default FixedAssetTransferInternal;