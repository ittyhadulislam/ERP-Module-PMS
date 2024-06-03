import React, { useEffect } from 'react';
import CustomTable from '../../table/CustomTable';
import { useSelector } from 'react-redux';
import { useLazyGetViewListInternalQuery } from '../../../redux/features/assetManagement/fixedAssetTransfer/queryFixedAssetTransfer';

const FixedAssetTransferViewInternal = () => {
    const { companyName } = useSelector(state => state.fixedAssetMaster)

    const [setComIdForViewInTable, { data: viewData, isLoading: isViewLoading }] = useLazyGetViewListInternalQuery()

    useEffect(() => {
        const payload = {
            comID: companyName?.nCompanyID
        }
        setComIdForViewInTable(payload)
    }, [companyName])

    const columns = [
        {
            field: "action",
            headerName: "Select",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "AssetNo",
            headerName: "Asset No #",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "company",
            headerName: "Company",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "fromFloor",
            headerName: "From Floor",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "ToFloor",
            headerName: "To Floor",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "fromLine",
            headerName: "From Line",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "ToLine",
            headerName: "To Line",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "TransferDate",
            headerName: "Transfer Date",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },

    ]
    return (
        <CustomTable
            columns={columns}
            rows={viewData?.map((row, id) => ({ ...row, id }))}
        />
    );
};

export default FixedAssetTransferViewInternal;