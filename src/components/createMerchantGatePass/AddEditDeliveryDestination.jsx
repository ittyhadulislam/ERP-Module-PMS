import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Box, Grid, Stack } from "@mui/material";
import CustomTextInput from "../inputs/CustomTextInput";
import AddButton from "../buttons/AddButton";
import CustomTable from "../table/CustomTable";
import { useGetDestinationViewQuery } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassQuery";
import { formateDate } from "../../utils/formateDate";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import ErrorButton from "../buttons/ErrorButton";
import {
  useSaveDeliveryDetailsMutation,
  useUpdateDeliveryDetailsMutation,
} from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassMutation";
import { errorToast, successToast } from "../../common/toaster/toaster";
import { useSelector } from "react-redux";

const initialState = {
  destination: "",
  mobileNo: "",
  mail: "",
  address: "",
};

const AddEditDeliveryDestination = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [selectedTableRow, setSelectedTableRow] = useState(null);
  const [localState, setLocalState] = useState(initialState);
  const { destination, mobileNo, mail, address } = localState;

  // useGetDestinationViewQuery
  const {
    data: addViewData,
    isLoading: addViewLoading,
    refetch,
  } = useGetDestinationViewQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // save mutation
  const [saveDeliveryDetails, { data, isSuccess, isLoading, isError, error }] =
    useSaveDeliveryDetailsMutation();
  // Update mutation
  const [
    updateDeliveryDetails,
    {
      data: updateData,
      isSuccess: updateSuccess,
      isLoading: updateLoading,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateDeliveryDetailsMutation();

  //    handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    // create payload
    const payload = {
      destination: destination,
      mobileno: mobileNo,
      mail: mail,
      address: address,
      createname: userName,
    };

    // edit payload
    const editPayload = {
      desID: selectedTableRow?.gpd_id,
      destination: destination,
      mobileno: mobileNo,
      mail: mail,
      address: address,
      createname: userName,
    };

    selectedTableRow
      ? updateDeliveryDetails(editPayload)
      : saveDeliveryDetails(payload);
  };

  // handle effect for event and form data
  useEffect(() => {
    if (selectedTableRow) {
      setLocalState((prev) => ({
        ...prev,
        destination: selectedTableRow?.gpd_company,
      }));
      setLocalState((prev) => ({
        ...prev,
        mobileNo: selectedTableRow?.gpd_mobile,
      }));
      setLocalState((prev) => ({
        ...prev,
        mail: selectedTableRow?.gpd_mailID,
      }));
      setLocalState((prev) => ({
        ...prev,
        address: selectedTableRow?.gpd_address,
      }));
    } else {
      setLocalState(initialState);
    }
  }, [selectedTableRow]);

  // toaster setup

  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [error]);
  useEffect(() => {
    isSuccess && successToast("Save Successfully! ");
    isSuccess && refetch();
  }, [data]);
  useEffect(() => {
    isUpdateError && errorToast("Something went wrong!");
  }, [updateError]);
  useEffect(() => {
    updateSuccess && successToast("Update Successfully! ");
    updateSuccess && refetch();
  }, [updateData]);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      accessor: "Edit",
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
              onClick={() => setSelectedTableRow(row?.row)}
              // title={"Edit"}
              // loading
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 60,
      maxWidth: 60,
    },

    { field: "gpd_company", headerName: "Destination", minWidth: 220 },
    { field: "gpd_mobile", headerName: "Mobile No.", minWidth: 150 },
    {
      field: "gpd_mailID",
      headerName: "mail ID",
      minWidth: 200,
    },
    { field: "gpd_address", headerName: "Address", minWidth: 150 },
    { field: "gpd_crt_name", headerName: "Created By", minWidth: 150 },
    {
      field: "gpd_crt_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      //   minWidth: 120,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <CustomAppBar title={"Input parameters"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"1px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              name="destination"
              label={"Destination"}
              value={destination}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Mobile No"}
              name="mobileNo"
              value={mobileNo}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Mail ID"}
              name="mail"
              value={mail}
              setLocalState={setLocalState}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Address"}
              multiline={true}
              name="address"
              value={address}
              setLocalState={setLocalState}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span>
            <ErrorButton
              title={"clear"}
              handleClick={() => {
                setSelectedTableRow(null);
                setLocalState(initialState);
              }}
            />
            <AddButton
              title={selectedTableRow ? "Update" : "save"}
              type="submit"
              loading={isLoading || updateLoading}
            />
          </span>
        </Stack>
      </Box>
      <CustomTable
        columns={columns}
        rows={addViewData?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        loading={addViewLoading}
        height={addViewData?.length > 0 ? "auto" : "280px"}
      />
    </form>
  );
};

export default AddEditDeliveryDestination;
