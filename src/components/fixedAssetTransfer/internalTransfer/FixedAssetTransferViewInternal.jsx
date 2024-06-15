/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import CustomTable from '../../table/CustomTable';
import { useSelector } from 'react-redux';
import { useGetViewListInternalQuery } from '../../../redux/features/assetManagement/fixedAssetTransfer/queryFixedAssetTransfer';
import { formateDate } from './../../../utils/formateDate';


const FixedAssetTransferViewInternal = ({ refetchData }) => {
    const { companyName } = useSelector(state => state.fixedAssetMaster)

    const { data: viewData, isLoading: isViewLoading, refetch } = useGetViewListInternalQuery({ comID: companyName?.nCompanyID })

    useEffect(() => {
        refetch()
    }, [refetchData])

    console.log(viewData)

    const columns = [
        {
            field: "iet_asset_no",
            headerName: "Asset No #",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
        },
        {
            field: "fromCom",
            headerName: "Company",
            flex: 1,
            // minWidth: 200,
            // maxWidth: 200,
        },
        {
            field: "floorfrom",
            headerName: "From Floor",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
        },
        {
            field: "floorto",
            headerName: "To Floor",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
        },
        {
            field: "fromline",
            headerName: "From Line",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
        },
        {
            field: "toline",
            headerName: "To Line",
            flex: 1,
            // minWidth: 120,
            // maxWidth: 120,
        },
        {
            field: "iet_date",
            headerName: "Transfer Date",
            flex: 1,
            valueFormatter: (param) => {
                return formateDate(param.value)
            }
            // minWidth: 200,
            // maxWidth: 200,
        },

    ]
    return (
        <CustomTable
            columns={columns}
            rows={viewData?.map((row, id) => ({ ...row, id }))}
            checkboxSelection
            setSelectedRows={{}}
            loading={isViewLoading}
            height={viewData?.length ? "auto" : "280px"}
        />
    );
};

export default FixedAssetTransferViewInternal;