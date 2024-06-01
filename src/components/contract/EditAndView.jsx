import React from "react";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import { useGetComEditAndViewQuery } from "../../redux/features/commercial/contract/queryContract";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { setContract } from "../../redux/features/commercial/contract/contractSlice";

const EditAndView = ({ setGoToTab }) => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.contract);
  //  get table data
  const { data, isLoading } = useGetComEditAndViewQuery(company?.company_ID, {
    refetchOnMountOrArgChange: true,
  });

  // handleClick fn
  const handleClick = (row) => {
    console.log(row);
    setGoToTab(0);
    dispatch(
      setContract({
        key: "contract",
        value: row.cContractNo,
      })
    );
  };
  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                handleClick(row?.row);
              }}
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 50,
      maxWidth: 55,
    },
    {
      field: "fileNo",
      headerName: "file/job",
      minWidth: 70,
      flex: 1,
    },

    { field: "cContractNo", headerName: "Contract", minWidth: 120, flex: 1 },
    { field: "amandmentNO", headerName: "ADM", minWidth: 50, flex: 1 },
    {
      field: "bank_Name",
      headerName: "Receiving Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "negotiableBank",
      headerName: "Lien Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "issuingBank",
      headerName: "Issuing Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    { field: "b2BLc", headerName: "B2B Limit(%)", minWidth: 100, flex: 1 },

    {
      field: "dOpeningDate",
      headerName: "Opening Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "amd_date",
      headerName: "Amendment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "dLastShipDate",
      headerName: "Last Shipment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "dExpireDate",
      headerName: "Expiry Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "created_User",
      headerName: "created by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "created_Date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "edit_User",
      headerName: "Edited by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "edit_date",
      headerName: "Edited date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "amd_User",
      headerName: "AMD by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "amd_date",
      headerName: "AMD date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  const tableData = data?.data?.map((e, i) => ({ ...e, id: i + 1 }));
  // console.log(tableData);
  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={isLoading}
        height={tableData?.length > 0 ? "auto" : "280px"}
      />
    </>
  );
};

export default EditAndView;
