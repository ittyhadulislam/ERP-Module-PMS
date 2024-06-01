import FixedAssetTransferViewInternal from './internalTransfer/FixedAssetTransferViewInternal';
import FixedAssetTransferInternalInput from './internalTransfer/FixedAssetTransferInternalInput';

const FixedAssetTransferInternal = () => {
    return (
        <>
            <FixedAssetTransferInternalInput />
            <FixedAssetTransferViewInternal />
        </>
    );
};

export default FixedAssetTransferInternal;