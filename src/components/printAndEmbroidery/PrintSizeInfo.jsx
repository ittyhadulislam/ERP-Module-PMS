import { Box } from "@mui/material";
import React from "react";
import CustomAppBar from "../common/CustomAppBar";
import { warningToast } from "../../common/toaster/toaster";
import CustomTable from "../table/CustomTable";

const PrintSizeInfo = ({
  finalSizeInfo,
  setFinalSizeInfo,
  isLoading,
  localState,
}) => {
  const { sendReceive } = localState;

  const handleTextFieldChange = (id, value, fieldName) => {
    setFinalSizeInfo((prev) =>
      prev?.map((e) => {
        if (id === e.sizeID) {
          return { ...e, [fieldName]: value };
        } else {
          return { ...e };
        }
      })
    );
  };

  const sizeInfoColumns = [
    {
      field: "sizeID",
      headerName: "id",
      accessor: "action",
      minWidth: 45,
      maxWidth: 45,
      flex: 1,
    },

    { field: "cSize", headerName: "size", maxWidth: 90, flex: 1 },
    {
      field: "cutqty",
      headerName: "Total Cut Quantity",
      //   maxWidth: 200,
      flex: 1,
    },
    {
      field: "sentQTy",
      headerName: "Total sent Quantity",
      //   maxWidth: 200,
      flex: 1,
    },
    {
      field: "sentBalQTy",
      headerName: "Total sent Balance Quantity",
      //   maxWidth: 90,
      flex: 1,
    },
    {
      field: "rcvdQTy",
      headerName: "Total receive Quantity",
      //   maxWidth: 200,
      flex: 1,
    },
    {
      field: "rcvdBalQTy",
      headerName: "Total receive Balance Quantity",
      //   maxWidth: 90,
      flex: 1,
    },
    {
      field: "sentQuantity",
      headerName: "sent Qty",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        const { sizeID, sentBalQTy } = row?.row;
        return (
          <input
            type="text"
            maxLength="10"
            disabled={sendReceive?.sr_id === 2}
            value={sendReceive?.sr_id === 2 ? "" : row?.row?.sentQuantity ?? ""}
            onInput={(e) => {
              if (e.target.value > sentBalQTy) {
                e.target.value = "";
                return warningToast(
                  "Sent Quantity Cannot Exceed Sent Balance Qty"
                );
              }
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
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
              handleTextFieldChange(sizeID, e.target.value, "sentQuantity")
            }
          />
        );
      },
    },
    {
      field: "receiveQuantity",
      headerName: "receive Qty",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        const { sizeID, rcvdBalQTy } = row?.row;
        return (
          <input
            type="text"
            maxLength="10"
            disabled={sendReceive?.sr_id === 1}
            value={
              sendReceive?.sr_id === 1 ? "" : row?.row?.receiveQuantity ?? ""
            }
            onInput={(e) => {
              if (e.target.value > rcvdBalQTy) {
                e.target.value = "";
                return warningToast(
                  "Receive Quantity Cannot Exceed Receive Balance Qty"
                );
              }
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
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
              handleTextFieldChange(sizeID, e.target.value, "receiveQuantity")
            }
          />
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 1, border: "1px dashed grey" }}>
      <CustomAppBar title={"Size Info"} />
      <CustomTable
        columns={sizeInfoColumns}
        rows={finalSizeInfo ?? []}
        toolBar={false}
        hideFooter={true}
        pagePerSize={99}
        height={finalSizeInfo?.length > 0 ? "auto" : "180px"}
        loading={isLoading}
      />
    </Box>
  );
};

export default PrintSizeInfo;
