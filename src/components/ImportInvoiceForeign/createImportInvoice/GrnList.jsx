import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { setForeignInvoice } from "../../../redux/features/commercial/importInvoiceForeign/foreignSlice";
import { Box, Stack } from "@mui/material";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSaveImportForeignMutation } from "../../../redux/features/commercial/importInvoiceForeign/mutationForeign";
import { LoadingButton } from "@mui/lab";
import { errorToast, successToast } from "../../../common/toaster/toaster";

const GrnList = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const {
    supplier,
    b2bLc,
    ref,
    invoice,
    date,
    adjustments,
    grnList,
    grnLoading,
  } = useSelector((state) => state.foreignInvoice);
  const [selectedRows, setSelectedRows] = useState([]);

  // save import foreign
  const [
    saveImportForeign,
    { data: saveData, error: saveError, isLoading: saveLoading },
  ] = useSaveImportForeignMutation();

  // handle click fn
  const handleClick = () => {
    const payload = {
      invType: "",
      supplierId: supplier?.benificiery,
      b2bId: b2bLc?.b2BLC_Slno,
      refNo: ref,
      invNo: invoice,
      invDate: date,
      adj: +adjustments,
      userName: userName,
      grnList: selectedRows?.map((e) => ({
        poNo: e.pO_No,
        piNo: e.pI_No,
        itemCode: e.itemCode,
        qty: +e.issueQty,
        unit: e.unit,
        uprice: e.price,
      })),
    };
    saveImportForeign(payload);
  };

  // input fields cheng
  const handleChange = (value, id) => {
    setSelectedRows((prev) =>
      prev.map((el) => {
        if (el.pO_No === id) {
          return { ...el, issueQty: value };
        } else {
          return el;
        }
      })
    );

    const data = grnList.map((el) => {
      if (el.pO_No === id) {
        return { ...el, issueQty: value };
      } else {
        return el;
      }
    });
    dispatch(setForeignInvoice({ key: "grnList", value: data }));
  };

  const viewColumns = [
    {
      field: "cItemDec",
      headerName: "Item Description",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 65,
      maxWidth: 65,
      flex: 1,
    },
    { field: "unit", headerName: "Unit", minWidth: 50, maxWidth: 50, flex: 1 },
    {
      field: "price",
      headerName: "Unit Price",
      minWidth: 70,
      maxWidth: 75,
      flex: 1,
    },
    {
      field: "value",
      headerName: "Value",
      minWidth: 50,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: "balanceQty",
      headerName: "Balance Qty.",
      minWidth: 80,
      maxWidth: 85,
      flex: 1,
    },
    {
      field: "issuedQty",
      headerName: "Issue Qty.",
      minWidth: 140,
      maxWidth: 140,
      flex: 1,
      renderCell: (row) => {
        const { pO_No } = row?.row;

        return (
          <>
            <input
              type="number"
              //   placeholder={id === 1 ? "Type Marketing Cost" : "Type PI Price"}
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              //   value={value}
              onChange={(e) => {
                handleChange(e.target.value, pO_No);
              }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (saveData) {
      successToast(saveData?.message);
    }
  }, [saveData]);
  useEffect(() => {
    if (saveError) {
      errorToast(saveError?.data?.message);
    }
  }, [saveError]);
  return (
    <>
      <CustomAppBar title={"grn list"} />
      <CustomTable
        columns={viewColumns}
        rows={b2bLc ? grnList ?? [] : []}
        loading={grnLoading}
        checkboxSelection
        setSelectedRows={setSelectedRows}
        height={grnList?.length > 0 && b2bLc ? "auto" : "270px"}
      />
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          pl={1}
          spacing={1}
          justifyContent="space-between"
        >
          <span></span>
          <span style={{ margin: "auto 0", marginRight: "5px" }}>
            <LoadingButton
              fullWidth
              variant="contained"
              size="small"
              onClick={handleClick}
              sx={{
                paddingY: "0.42em",
                margin: "2px",
              }}
              loading={saveLoading}
              disabled={selectedRows.length == 0}
            >
              <MdKeyboardDoubleArrowRight size={25} />
            </LoadingButton>
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default GrnList;
