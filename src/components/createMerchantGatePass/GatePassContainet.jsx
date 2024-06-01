import React, { useEffect, useState } from "react";
import GatePassInput from "./GatePassInput";
import { Box, Stack } from "@mui/system";
import AddButton from "../buttons/AddButton";
import CustomTable from "../table/CustomTable";
import SubmitButton from "../buttons/SubmitButton";
import { useGetAddViewQuery } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassQuery";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { MdOutlineDelete } from "react-icons/md";
import { errorToast, successToast } from "../../common/toaster/toaster";
import {
  useCompleteMerchantGatePassMutation,
  useDeleteMerchantGatePassMutation,
  useSaveMerchantGatePassMutation,
} from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassMutation";
import { Button } from "@mui/material";
import CustomModal from "../common/CustomModal";
import AddEditDeliveryDestination from "./AddEditDeliveryDestination";
import AddEditItemType from "./AddEditItemType";
import CancelGatePass from "./CancelGatePass";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";
import { setMerchantGatePass } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassSlice";

const GatePassContainer = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const [deliveryDestinationOpen, setDeliveryDestination] = useState(false);
  const [itemTypeOpen, setItemType] = useState(false);
  const [cancelOpen, setCancel] = useState(false);
  const {
    company,
    buyer,
    style,
    itemType,
    department,
    section,
    deliverTo,
    unit,
    status,
    returnableDate,
    itemDescription,
    deliveryAddress,
    garmentsType,
    qty,
    attention,
    orderBy,
    attMobileNo,
    ordMobileNo,
    currierBy,
    mobileNo,
    remarks,
  } = useSelector((state) => state.merchantGatePass);
  // get add view data
  const {
    data: addViewData,
    isLoading: addViewLoading,
    refetch,
  } = useGetAddViewQuery(userName);

  // Save Merchant Gate Pass Mutation
  const [saveMerchantGatePass, { data, isSuccess, isLoading, isError, error }] =
    useSaveMerchantGatePassMutation();
  // Delete Merchant Gate Pass Mutation
  const [
    deleteMerchantGatePass,
    {
      data: deleteData,
      isSuccess: deleteSuccess,
      isLoading: deleteLoading,
      error: deleteError,
    },
  ] = useDeleteMerchantGatePassMutation();
  // complete Merchant Gate Pass Mutation
  const [
    completeMerchantGatePass,
    {
      data: completeData,
      isSuccess: completeSuccess,
      isLoading: completeLoading,
      error: completeError,
    },
  ] = useCompleteMerchantGatePassMutation();

  // handle submit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      comID: company?.nCompanyID,
      deptID: department?.nUserDept,
      sectionID: section?.nSectionID,
      buyer: buyer?.cBuyer_Name,
      style: style?.cStyleNo,
      description: itemDescription,
      qty: parseInt(qty),
      unit: unit?.nUnitID,
      purpose: itemType?.gp_description,
      gmttype: garmentsType,
      attention: attention,
      attmobileno: attMobileNo,
      orderby: orderBy,
      ordcontactno: ordMobileNo,
      carriedby: currierBy,
      carriedbycontactno: mobileNo,
      returnsts: status?.gp_st_id,
      returnDate: status?.gp_st_desc === "Returnable" ? returnableDate : null,
      remarks: remarks,
      deliverytoID: deliverTo?.gpd_id,
      deliveryto: deliverTo?.gpd_company,
      address: deliveryAddress,
      userName: userName,
    };

    saveMerchantGatePass(payload);
  };
  // handle Complete fn
  const handleComplete = () => {
    completeMerchantGatePass([
      {
        completedby: userName,
      },
    ]);
  };

  // ----------------------------------------------------------------
  const buttonArray = ["BtnDEDES", "BtnItemtype", "BtnCancelb"];
  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonArray.map((e) => ({
      buttonName: e,
      controller: "R2m_Merchant_Gate_Pass.aspx",
      isShow: true,
      userName: userName,
    }));
    buttonPermission(payload);
  }, []);
  const showDelivery = !buttonData?.find((e) => e?.buttonName === "BtnDEDES")
    ?.isShow;
  const showItemType = !buttonData?.find((e) => e?.buttonName === "BtnItemtype")
    ?.isShow;
  const showCancel = !buttonData?.find((e) => e?.buttonName === "BtnCancelb")
    ?.isShow;
  // ----------------------------------------------------------------

  // toaster setup
  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      successToast(data?.message);
      // dispatch(setMerchantGatePass({ key: "buyer", value: null }));
      // dispatch(setMerchantGatePass({ key: "style", value: null }));
      // dispatch(setMerchantGatePass({ key: "garmentsType", value: "" }));
      // dispatch(setMerchantGatePass({ key: "itemType", value: null }));
      // dispatch(setMerchantGatePass({ key: "itemDescription", value: "" }));
      // dispatch(setMerchantGatePass({ key: "qty", value: "" }));
      // dispatch(setMerchantGatePass({ key: "unit", value: null }));
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

  // set redux state table data
  useEffect(() => {
    addViewData &&
      dispatch(
        setMerchantGatePass({ key: "addTableData", value: addViewData })
      );
  }, [addViewData]);
  //----- fetch add view data -----
  useEffect(() => {
    refetch();
  }, [data, deleteData, completeData]);

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
                deleteMerchantGatePass(row?.row?.gp_id);
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
    {
      field: "cSection_Description",
      headerName: "Section",
      minWidth: 120,
      flex: 1,
    },
    { field: "gp_buyer", headerName: "Buyer", minWidth: 120, flex: 1 },
    { field: "gp_style", headerName: "Style", minWidth: 150, flex: 1 },
    {
      field: "gp_item_des",
      headerName: "Po/Color/Size",
      minWidth: 100,
      flex: 1,
    },
    { field: "gp_qty", headerName: "Qty", minWidth: 70, flex: 1 },
    { field: "unit_nm", headerName: "unit", minWidth: 100, flex: 1 },
    { field: "gp_purpose", headerName: "Purpose", minWidth: 100, flex: 1 },
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
  ];
  return (
    <>
      <form onSubmit={handleSubmit}>
        <GatePassInput />
        <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={1}
            spacing={2}
            justifyContent="space-between"
          >
            <span>
              <Button
                variant="contained"
                size="small"
                onClick={() => setDeliveryDestination(true)}
                sx={{ m: 0.2 }}
                disabled={showDelivery}
              >
                Add Delivery Destination
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={() => setItemType(true)}
                sx={{ m: 0.2 }}
                disabled={showItemType}
              >
                Add Item Type
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => setCancel(true)}
                sx={{ m: 0.2 }}
                disabled={showCancel}
              >
                Cancel
              </Button>
            </span>

            <span>
              <AddButton title={"add"} type="submit" loading={isLoading} />
            </span>
          </Stack>
        </Box>
      </form>

      <CustomTable
        columns={viewColumns}
        rows={addViewData?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        loading={addViewLoading}
        height={addViewData?.length > 0 ? "auto" : "280px"}
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

      {/* --- add item modal ---- */}
      <CustomModal
        open={deliveryDestinationOpen}
        setOpen={setDeliveryDestination}
        title="Add/Edit Delivery Destination"
      >
        <AddEditDeliveryDestination />
      </CustomModal>
      {/* --- add item modal ---- */}
      <CustomModal
        open={itemTypeOpen}
        setOpen={setItemType}
        title="Add/Edit Item Type"
      >
        <AddEditItemType />
      </CustomModal>
      <CustomModal
        open={cancelOpen}
        setOpen={setCancel}
        title="Gate Pass-Cancel"
      >
        <CancelGatePass />
      </CustomModal>
    </>
  );
};

export default GatePassContainer;
