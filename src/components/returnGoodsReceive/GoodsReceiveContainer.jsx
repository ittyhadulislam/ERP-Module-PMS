import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import AddButton from "../buttons/AddButton";
import CustomTable from "../table/CustomTable";
import SubmitButton from "../buttons/SubmitButton";
import GoodsReceiveInput from "./GoodsReceiveInput";
import {
  useGetReturnViewAfterAddQuery,
  useLazyGetReturnViewQuery,
} from "../../redux/features/gatePass/returnGoodsReceive/returnGoodsReceiveQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../common/toaster/toaster";
import {
  useCompleteReturnReceiveMutation,
  useDeleteReturnReceiveMutation,
  useSaveReturnReceiveMutation,
} from "../../redux/features/gatePass/returnGoodsReceive/returnGoodsReceiveMutation";
import { formateDate } from "../../utils/formateDate";
import { LoadingButton } from "@mui/lab";
import { MdOutlineDelete } from "react-icons/md";
import {
  resetReturnGoods,
  setReturnGoods,
} from "../../redux/features/gatePass/returnGoodsReceive/returnGoodsReceiveSlice";
const GoodsReceiveContainer = () => {
  const dispatch = useDispatch();
  const { userName, companyID } = useSelector((state) => state.auth.user);
  const { category, section, gatePass, receiveDate, challanNo } = useSelector(
    (state) => state.returnGoodsReceive
  );
  const [finalTableData, setFinalTableData] = useState([]);

  // get table view
  const [getTableData, { data: tableData, isLoading: tableLoading }] =
    useLazyGetReturnViewQuery();
  // get table view after add
  const {
    data: tableDataView,
    isLoading: tableLoadingView,
    refetch: refetchAfterAdd,
  } = useGetReturnViewAfterAddQuery(userName, {
    refetchOnMountOrArgChange: true,
  });

  // save gate pass return receive
  const [
    saveReturnReceive,
    {
      data: saveData,
      isLoading: saveLoading,
      isSuccess: saveSuccess,
      error: saveError,
    },
  ] = useSaveReturnReceiveMutation();
  // delete gate pass return receive
  const [
    completeReturnReceive,
    {
      data: completeData,
      isLoading: completeLoading,
      isSuccess: completeSuccess,
      error: completeError,
    },
  ] = useCompleteReturnReceiveMutation();
  // delete gate pass return receive
  const [
    deleteReturnReceive,
    { data: deleteData, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteReturnReceiveMutation();

  useEffect(() => {
    gatePass && getTableData(gatePass?.gp_ref);
  }, [gatePass]);

  useEffect(() => {
    tableData && setFinalTableData(tableData);
  }, [tableData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = finalTableData
      .filter(
        (e) => e.receiveQuantity !== "" && e.receiveQuantity !== undefined
      )
      .map((e) => ({
        gpNo: e.gp_ref,
        gpcate: e.gp_type,
        gpID: e.gp_id,
        comID: companyID,
        rtnDate: receiveDate,
        challan: challanNo,
        buyerID: e.gp_buyer,
        styelID: e.gp_style,
        gmttype: e.gp_gmt_type,
        itemdesc: e.gp_item_des,
        purpose: e.gp_purpose,
        rcvdqty: e?.receiveQuantity,
        userName: userName,
      }));
    saveReturnReceive(payload);
  };
  // handle complete fn
  const handleComplete = () => {
    const payload = tableDataView?.map((e) => ({
      gpNo: e.rgr_ref,
    }));
    completeReturnReceive(payload);
  };
  // handle table text field input
  const handleTextFieldChange = (id, value, fieldName) => {
    setFinalTableData((prev) =>
      prev?.map((e) => {
        if (id === e.gp_id) {
          return { ...e, [fieldName]: value };
        } else {
          return { ...e };
        }
      })
    );
  };

  // toaster
  useEffect(() => {
    if (saveSuccess) {
      refetchAfterAdd();
      successToast("Added Successfully!");
      dispatch(setReturnGoods({ key: "gatePass", value: null }));
      gatePass && getTableData(gatePass?.gp_ref);
    }
  }, [saveData]);
  useEffect(() => {
    saveError && errorToast("Something Went Wrong!");
  }, [saveError]);

  // delete toaster
  useEffect(() => {
    deleteSuccess && successToast("Delete Successfully!");
    deleteSuccess && refetchAfterAdd();
    deleteSuccess && gatePass && getTableData(gatePass?.gp_ref);
  }, [deleteData]);
  useEffect(() => {
    deleteError && errorToast("Something Went Wrong!");
  }, [deleteError]);
  // complete toaster
  useEffect(() => {
    if (completeSuccess) {
      refetchAfterAdd();
      successToast("Complete Successfully!");
      dispatch(resetReturnGoods());
      gatePass && getTableData(gatePass?.gp_ref);
    }
  }, [completeData]);
  useEffect(() => {
    completeError && errorToast("Something Went Wrong!");
  }, [completeError]);

  // view table data
  const viewColumnsMerchant = [
    {
      field: "gp_buyer",
      headerName: "Buyer",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gp_style",
      headerName: "Style No",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gp_gmt_type",
      headerName: "Garment Type",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gp_purpose",
      headerName: "Item Type",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gp_item_des",
      headerName: "Item Description",
      minWidth: 100,
      flex: 1,
    },
    // {
    //   field: "gp_purpose",
    //   headerName: "Purpose",
    //   maxWidth: 150,
    //   flex: 1,
    // },
    { field: "cUnitDes", headerName: "Unit", maxWidth: 150, flex: 1 },
    { field: "balQty", headerName: "Availabe Qty", maxWidth: 100, flex: 1 },
    {
      field: "receiveQuantity",
      headerName: "Rcvd Qty",
      maxWidth: 120,
      flex: 1,
      renderCell: (row) => {
        const { gp_id, balQty } = row?.row;
        return (
          <input
            type="number"
            onInput={(e) => {
              if (balQty < e.target.value) {
                warningToast(
                  "Receive Quantity Cannot Exceed Available Quantity"
                );
                e.target.value = "";
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChange(gp_id, e.target.value, "receiveQuantity")
            }
          />
        );
      },
    },
  ];
  const viewColumnsGeneral = [
    // {
    //   field: "gp_buyer",
    //   headerName: "Buyer",
    //   minWidth: 100,
    //   flex: 1,
    // },
    // {
    //   field: "gp_style",
    //   headerName: "Style No",
    //   minWidth: 100,
    //   flex: 1,
    // },
    // {
    //   field: "gp_gmt_type",
    //   headerName: "Garment Type",
    //   minWidth: 100,
    //   flex: 1,
    // },
    {
      field: "gp_purpose",
      headerName: "Item Type",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "gp_item_des",
      headerName: "Item Description",
      minWidth: 100,
      flex: 1,
    },
    // {
    //   field: "gp_purpose",
    //   headerName: "Purpose",
    //   maxWidth: 150,
    //   flex: 1,
    // },
    { field: "cUnitDes", headerName: "Unit", maxWidth: 150, flex: 1 },
    { field: "balQty", headerName: "Availabe Qty", maxWidth: 100, flex: 1 },
    {
      field: "receiveQuantity",
      headerName: "Rcvd Qty",
      maxWidth: 120,
      flex: 1,
      renderCell: (row) => {
        const { gp_id, balQty } = row?.row;
        return (
          <input
            type="number"
            onInput={(e) => {
              if (balQty < e.target.value) {
                warningToast(
                  "Receive Quantity Cannot Exceed Available Quantity"
                );
                e.target.value = "";
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChange(gp_id, e.target.value, "receiveQuantity")
            }
          />
        );
      },
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Delete",
      accessor: "Delete",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                deleteReturnReceive({
                  id: row?.row?.rgr_id,
                  GPNo: row?.row?.rgr_gp_ref,
                });
                // deleteMerchantGatePass(row?.row?.gp_id);
                // setSelectedMainCategory(row.original.nMainCategory_ID);
              }}
              // loading={deleteLoading}
            >
              <MdOutlineDelete size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 60,
      maxWidth: 60,
      flex: 1,
    },
    {
      field: "rgr_id",
      headerName: "ID",
      minWidth: 60,
      maxWidth: 60,
      flex: 1,
    },
    {
      field: "rgr_gp_ref",
      headerName: "Gate Pass No",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "rgr_rcvd_dt",
      headerName: "Received Date",
      minWidth: 100,
      maxWidth: 100,
      valueGetter: (params) => formateDate(params.value),
      flex: 1,
    },
    {
      field: "rgr_challan",
      headerName: "Challan",
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "rgr_item_desc",
      headerName: "Item Description",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "rgr_purpose",
      headerName: "Purpose",
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "rgr_rcvd_qty",
      headerName: "Received Qty",
      maxWidth: 100,
      flex: 1,
    },
  ];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <GoodsReceiveInput />
        {category?.gp_type === "G" ? (
          <CustomTable
            columns={viewColumnsGeneral}
            rows={
              gatePass
                ? finalTableData?.map((e, i) => ({ ...e, id: i + 1 })) ?? []
                : []
            }
            loading={tableLoading}
            height={finalTableData?.length > 0 && gatePass ? "auto" : "280px"}
          />
        ) : (
          <CustomTable
            columns={viewColumnsMerchant}
            rows={
              gatePass
                ? finalTableData?.map((e, i) => ({ ...e, id: i + 1 })) ?? []
                : []
            }
            loading={tableLoading}
            height={finalTableData?.length > 0 && gatePass ? "auto" : "280px"}
          />
        )}

        <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={1}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>

            <span>
              <AddButton title={"add"} type="submit" loading={saveLoading} />
            </span>
          </Stack>
        </Box>
      </form>
      <CustomTable
        columns={columns}
        rows={tableDataView?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        loading={tableLoadingView}
        height={tableDataView?.length > 0 ? "auto" : "280px"}
      />
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span>
            <SubmitButton
              title={"complete"}
              type="button"
              handleClick={handleComplete}
              loading={completeLoading}
            />
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default GoodsReceiveContainer;
