import React from "react";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { useGetAllImportLocalQuery } from "../../redux/features/commercial/importInvoiceLocal/queryLocal";

const EditAndViewImportInvoice = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const { data, isLoading } = useGetAllImportLocalQuery(userName, {
    refetchOnMountOrArgChange: true,
  });

  // handle edit fn
  const handleEdit = (row) => {
    console.log(row);
  };

  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                handleEdit(row?.row);
                // setSelectedMainCategory(row.original.nMainCategory_ID);
                // dispatch(
                //   setPriceComparison({
                //     key: "selectedTableRow",
                //     value: row?.row,
                //   })
                // );
                // setSelectedTableRow(row?.row);
              }}
              // title={"Edit"}
              // loading
            >
              <BiEdit size={20} />
            </LoadingButton>
            {/* <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                deletePostPriceComparison(row?.row?.pc_id);
                // setSelectedMainCategory(row.original.nMainCategory_ID);
              }}
              // title={"Edit"}
              // loading
            >
              <MdOutlineDelete size={20} />
            </LoadingButton> */}
          </Box>
        );
      },
      minWidth: 70,
      maxWidth: 70,
      flex: 1,
    },

    {
      field: "imP_InvoiceNo",
      headerName: "Invoice No",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "imp_InvoiceDate",
      headerName: "Invoice Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 50,
      flex: 1,
    },
    {
      field: "invoice_Value",
      headerName: "Invoice Value",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "b2BLC_No",
      headerName: "Back To Back LC",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "cSupName",
      headerName: "Supplier",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    { field: "shipMode", headerName: "Ship Mode", minWidth: 100, flex: 1 },
  ];

  const tableData = data?.data?.map((e, i) => ({ ...e, id: i + 1 }));
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

export default EditAndViewImportInvoice;
