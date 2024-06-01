import React, { useEffect } from 'react';
import CustomTable from '../../table/CustomTable';
import { useSelector } from 'react-redux';
import { useLazyGetViewListExternalQuery } from '../../../redux/features/assetManagement/fixedAssetTransfer/queryFixedAssetTransfer';

const FixedAssetTransferViewExternal = () => {
    const { fromCompany } = useSelector(state => state.fixedAssetMaster)
    // console.log(fromCompany);

    const [setComIdForViewInTable, { data: viewData, isLoading: isViewLoading }] = useLazyGetViewListExternalQuery()
    console.log(viewData)
    useEffect(() => {
        const payload = {
            comID: fromCompany?.nCompanyID
        }
        // console.log(payload)
        setComIdForViewInTable(payload)
    }, [fromCompany])

    const columns = [
        {
            field: "action",
            headerName: "Select",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "iet_asset_no",
            headerName: "Asset No #",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "fromCom",
            headerName: "From Company",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "toCom",
            headerName: "To Company",
            flex: 1,
            minWidth: 250,
            maxWidth: 250,
        },
        {
            field: "iet_date",
            headerName: "Transfer Date",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "iet_approve",
            headerName: "Is Approved",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "iet_input_user",
            headerName: "Input User",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "iet_input_date",
            headerName: "Input Date",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },

        {
            field: "iet_remarks",
            headerName: "Remarks",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
    ]
    return (
        <CustomTable
            columns={columns}
            // rows={viewData?.map((data, index) => ({ ...data, index }))}
            rows={viewData?.map((row, id) => ({ ...row, id }))}
            loading={isViewLoading}
            height={viewData?.length ? "auto" : "280px"}
        />
    );
};

export default FixedAssetTransferViewExternal;