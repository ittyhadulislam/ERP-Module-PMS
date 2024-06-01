import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import { useLazyGetForeignPiDeleteQuery } from "../../../redux/features/commercial/importInvoiceForeign/queryforeign";
import { errorToast, successToast } from "../../../common/toaster/toaster";

const AddGrnList = () => {
  const { b2bLc, addGrnList, addGrnLoading } = useSelector(
    (state) => state.foreignInvoice
  );

  // get delete
  const [getDelete, { data, error }] = useLazyGetForeignPiDeleteQuery();

  // handle delete fn
  const handleDelete = (row) => {
    getDelete({
      Qty: row?.imd_qty,
      InvNo: row?.imd_invno,
      Itcode: row?.imd_itcode,
    });
  };

  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => handleDelete(row?.row)}
              // title={"Edit"}
              // loading
            >
              <MdOutlineDelete size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 55,
      maxWidth: 55,
      flex: 1,
    },
    {
      field: "cItemDes",
      headerName: "Item Description",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "imd_qty",
      headerName: "Quantity",
      minWidth: 65,
      maxWidth: 65,
      flex: 1,
    },
    {
      field: "imd_unit",
      headerName: "Unit",
      minWidth: 50,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: "imd_uprice",
      headerName: "Unit Price",
      minWidth: 70,
      maxWidth: 75,
      flex: 1,
    },
    {
      field: "imd_value",
      headerName: "Value",
      minWidth: 50,
      maxWidth: 50,
      flex: 1,
    },
  ];

  useEffect(() => {
    if (data) {
      successToast(data?.message);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      errorToast(error?.data?.message);
    }
  }, [error]);
  return (
    <>
      <Box mt={0.5}></Box>
      <CustomAppBar title={" add grn list"} />
      <CustomTable
        columns={viewColumns}
        rows={b2bLc ? addGrnList ?? [] : []}
        loading={addGrnLoading}
        height={addGrnList?.length > 0 && b2bLc ? "auto" : "270px"}
      />
    </>
  );
};

export default AddGrnList;
