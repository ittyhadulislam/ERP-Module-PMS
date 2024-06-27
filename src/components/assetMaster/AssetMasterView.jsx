/* eslint-disable react/prop-types */

import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import CustomAppBar from '../common/CustomAppBar';
import CustomTable from './../table/CustomTable';
import { useLazyGetViewQuery } from '../../redux/features/assetManagement/assetMaster/queryAssetMaster';
import { BiSelectMultiple } from "react-icons/bi";
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const AssetMasterView = ({
    setEditable = () => { },
}) => {

    const { assetNo } = useSelector(state => state.assetMaster)
    const [viewData, { data, isLoading }] = useLazyGetViewQuery()
    // console.log(data)

    const handelSelect = (details) => {
        setEditable(details)
    }

    useEffect(() => {
        const payload = {
            AsstNo: assetNo,
        }
        viewData(payload)
    }, [assetNo, viewData])


    const column = [
        {
            field: "action",
            headerName: "Select",
            flex: 1,
            minWidth: 75,
            maxWidth: 75,
            renderCell: (row) => {
                return (
                    <span
                        onClick={() => handelSelect(row?.row)}
                        style={{ color: "#1976d2", cursor: "pointer" }}
                    >
                        Select
                        <BiSelectMultiple
                            color="green"
                            style={{ marginLeft: "4px", marginTop: "-4px" }}
                        />
                    </span>
                )
            }
        },
        {
            field: "mcAsstNo",
            headerName: "AssetNo",
            flex: 1,
            minWidth: 90,
            maxWidth: 90,
        },
        {
            field: "mcDesc",
            headerName: "Machine Name",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "cCmpName",
            headerName: "Company Name",
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "cDeptname",
            headerName: "Department",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "cSection_Description",
            headerName: "Section",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
        },
        {
            field: "cFloor_Descriptin",
            headerName: "Floor",
            flex: 1,
            // minWidth: 160,
            // maxWidth: 160,
        },
        {
            field: "line_No",
            headerName: "Line",
            flex: 1,
            // minWidth: 130,
            // maxWidth: 130,
        },
        {
            field: "options",
            headerName: "Asset Special Feature",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
        },
        {
            field: "warrantyExpireDate",
            headerName: "Warranty Expire Date",
            flex: 1,
            minWidth: 150,
            maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "mcGoodsInhousDate",
            headerName: "In-House Date",
            flex: 1,
            // minWidth: 150,
            // maxWidth: 150,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
        {
            field: "mcUser",
            headerName: "Input User",
            flex: 1,
            // minWidth: 130,
            // maxWidth: 130,
        },
        {
            field: "mcDate",
            headerName: "Input Date",
            flex: 1,
            // minWidth: 130,
            // maxWidth: 130,
            valueFormatter: (formateDate) => {
                return dayjs(formateDate.value).format('DD-MMM-YYYY')
            }
        },
    ]

    return (
        <>
            <Box sx={{ p: 1, border: "1px dashed grey" }}>
                <CustomAppBar title={"Asset Details"} />
                <CustomTable
                    columns={column}
                    rows={data?.map((row, id) => ({ ...row, id }))}
                    loading={isLoading}
                    height={data?.length ? "auto" : "280px"}
                />
            </Box>
        </>
    );
};

export default AssetMasterView;