import React, { useEffect } from "react";
import GatePassInput from "./GatePassInput";
import { Box, Stack } from "@mui/system";
import AddButton from "../buttons/AddButton";
import CustomTable from "../table/CustomTable";
import SubmitButton from "../buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import {
  useCompleteGeneralGatePassMutation,
  useDeleteGeneralGatePassMutation,
  useSaveGeneralGatePassMutation,
} from "../../redux/features/gatePass/createGeneralgatePass/createGeneralGatePassMutation";
import { errorToast, successToast } from "../../common/toaster/toaster";
import { useLazyGetGeneralAddViewQuery } from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";
import { formateDate } from "../../utils/formateDate";
import { LoadingButton } from "@mui/lab";
import { MdOutlineDelete } from "react-icons/md";
import { setGeneralGatePass } from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassSlice";

const GatePassContainer = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const {
    gatePassType,
    company,
    department,
    section,
    deliverTo,
    store,
    description,
    qty,
    unit,
    purpose,
    currierBy,
    mobileNo,
    deliveryAddress,
    orderBy,
    status,
    returnableDate,
    remarks,
  } = useSelector((state) => state.createGatePass);
  const dispatch = useDispatch();
  // get add view data
  const [getAddViewData, { data: addViewData, isLoading: addViewLoading }] =
    useLazyGetGeneralAddViewQuery();

  // Save General Gate Pass Mutation
  const [saveGeneralGatePass, { data, isSuccess, isLoading, isError, error }] =
    useSaveGeneralGatePassMutation();

  // Delete General Gate Pass Mutation
  const [
    deleteGeneralGatePass,
    {
      data: deleteData,
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      error: deleteError,
    },
  ] = useDeleteGeneralGatePassMutation();
  // complete General Gate Pass Mutation
  const [
    completeGeneralGatePass,
    {
      data: completeData,
      isSuccess: completeSuccess,
      isLoading: completeLoading,
      error: completeError,
    },
  ] = useCompleteGeneralGatePassMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      gptype: gatePassType?.gpt_id,
      comId: company?.nCompanyID,
      deptID: department?.nUserDept,
      sectionID: section?.nSectionID,
      storeId: store?.storage_Sl,
      itemDesc: description,
      qty: qty,
      unitID: unit?.nUnitID,
      purpose: purpose,
      orderby: orderBy,
      carriedby: currierBy,
      contactno: mobileNo,
      returnSts: status?.gp_st_id,
      returnDate: status?.gp_st_desc === "Returnable" ? returnableDate : null,

      sentTo: deliverTo,
      address: deliveryAddress,
      remarks: remarks,
      userName: userName,
    };

    saveGeneralGatePass(payload);
  };
  // handle Complete fn
  const handleComplete = () => {
    completeGeneralGatePass([
      {
        completedby: userName,
      },
    ]);
  };
  // toaster setup
  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      successToast(data?.message);
      dispatch(setGeneralGatePass({ key: "description", value: "" }));
      dispatch(setGeneralGatePass({ key: "qty", value: "" }));
      dispatch(setGeneralGatePass({ key: "unit", value: null }));
    }
  }, [data]);
  useEffect(() => {
    deleteError && errorToast("Something went wrong!");
  }, [deleteError]);
  useEffect(() => {
    deleteSuccess && successToast("Delete Successfully!");
  }, [deleteData]);
  useEffect(() => {
    completeError && errorToast("Something went wrong!");
  }, [completeError]);
  useEffect(() => {
    completeSuccess && successToast("Complete Successfully!");
  }, [completeData]);

  // redux update add data
  useEffect(() => {
    addViewData &&
      dispatch(setGeneralGatePass({ key: "addTableData", value: addViewData }));
  }, [addViewData]);
  //----- fetch add view data -----
  useEffect(() => {
    gatePassType &&
      getAddViewData({ id: gatePassType?.gpt_id, user: userName });
    gatePassType &&
      dispatch(setGeneralGatePass({ key: "addTableData", value: addViewData }));
    !gatePassType &&
      dispatch(setGeneralGatePass({ key: "addTableData", value: [] }));
  }, [gatePassType, data, deleteData, completeData]);

  const viewColumns = [
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
                deleteGeneralGatePass(row?.row?.gp_id);
                // setSelectedMainCategory(row.original.nMainCategory_ID);
              }}
              loading={deleteLoading}
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

    { field: "com_nm", headerName: "Company", minWidth: 120, flex: 1 },
    { field: "dpt_nm", headerName: "Department", minWidth: 120, flex: 1 },
    { field: "str_name", headerName: "Store", minWidth: 120, flex: 1 },
    { field: "gp_item_des", headerName: "Item Desc", minWidth: 120, flex: 1 },
    { field: "gp_qty", headerName: "Qty", minWidth: 50, flex: 1 },
    { field: "unit_nm", headerName: "Unit", minWidth: 70, flex: 1 },
    { field: "gp_purpose", headerName: "Purpose", minWidth: 120, flex: 1 },
    { field: "gp_for_whom", headerName: "Order By", minWidth: 100, flex: 1 },
    { field: "gp_carried", headerName: "Carried By", minWidth: 100, flex: 1 },
    { field: "gp_st_desc", headerName: "Status", minWidth: 120, flex: 1 },
    {
      field: "gp_sent_to",
      headerName: "Delivery To",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "gp_address",
      headerName: "Address",
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },

    {
      field: "gp_rtn_dt",
      headerName: "return date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 100,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginRight: "1px" }}>
        <GatePassInput />
        <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={1}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>

            <span>
              <AddButton title={"add"} type="submit" loading={isLoading} />
            </span>
          </Stack>
        </Box>
      </form>

      <CustomTable
        columns={viewColumns}
        rows={
          gatePassType
            ? addViewData?.map((e, i) => ({ ...e, id: i + 1 })) ?? []
            : []
        }
        loading={addViewLoading}
        height={addViewData?.length > 0 && gatePassType ? "auto" : "280px"}
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
              handleClick={handleComplete}
              loading={completeLoading}
            />
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default GatePassContainer;
