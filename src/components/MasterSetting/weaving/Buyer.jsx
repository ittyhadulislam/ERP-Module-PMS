import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { formateDate } from "../../../utils/formateDate";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";
import { useGetWeavingMasterBuyerQuery } from "../../../redux/features/weaving/masterSetup/queryMasterSetup";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { useSaveBuyerMutation } from "../../../redux/features/weaving/masterSetup/mutationMasterSetup";
const initialState = {
  buyerName: "",
  attention: "",
  mobile: "",
  email: "",
  country: null,
  address: "",
};
const Buyer = () => {
  const [localState, setLocalState] = useState(initialState);
  const [selectedRow, setSelectedRow] = useState(null);

  const { buyerName, attention, mobile, email, address } = localState;
  const { userName } = useSelector((state) => state.auth.user);

  console.log(selectedRow);
  //   get table data
  const { data, isLoading, refetch } = useGetWeavingMasterBuyerQuery();

  // save yarn type
  const [
    saveBuyer,
    { data: saveData, isLoading: saveLoading, isError, isSuccess, error },
  ] = useSaveBuyerMutation();

  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      buyerName: buyerName,
      address: address,
      concernPerson: attention,
      email: email,
      mobile: mobile,
      tramscondition: "string",
      createdBy: userName,
    };

    const updatePayload = {
      buyerName: buyerName,
      address: address,
      concernPerson: attention,
      email: email,
      mobile: mobile,
      tramscondition: "string",
      createdBy: userName,
    };
    saveBuyer(selectedRow ? updatePayload : payload);
  };

  //   toaster setup
  useEffect(() => {
    if (isSuccess) {
      successToast(saveData?.message);
      setLocalState(initialState);
      setSelectedRow(null);
      refetch();
    }
  }, [saveData, isSuccess]);
  useEffect(() => {
    isError && errorToast("Something Went Wrong!");
  }, [error, isError]);

  useEffect(() => {
    if (selectedRow) {
      setLocalState((prev) => ({ ...prev, attention: selectedRow.con_person }));
      setLocalState((prev) => ({ ...prev, buyerName: selectedRow.buyer_name }));
      setLocalState((prev) => ({ ...prev, email: selectedRow.email }));
      setLocalState((prev) => ({ ...prev, mobile: selectedRow.mobile }));
      setLocalState((prev) => ({
        ...prev,
        address: selectedRow.buyer_address,
      }));
    }
  }, [selectedRow]);

  //   table columns
  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ ml: 1 }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                setSelectedRow(row?.row);
              }}
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 50,
      maxWidth: 55,
      flex: 1,
    },
    {
      field: "buyer_name",
      headerName: "buyer Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "con_person",
      headerName: "Attention",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 120,
      maxWidth: 140,
      flex: 1,
    },
    {
      field: "buyer_address",
      headerName: "Address",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "ent_user",
      headerName: "created by",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "ent_dat",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      maxWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  return (
    <Grid
      container
      sx={{
        border: `1px solid #1976d2`,
        padding: "10px",
        borderRadius: "2px",
      }}
    >
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <>
            <CustomAppBar title={"Form Parameter"} />
            <Grid sx={{ border: `1px solid #1976d2`, padding: "5px" }}>
              <Grid container spacing={1} mt={0.1}>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Buyer Name"
                    name="buyerName"
                    value={buyerName}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Attention"
                    name="attention"
                    value={attention}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Mobile No"
                    name="mobile"
                    type="number"
                    value={mobile}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <CustomTextInput
                    label="Address"
                    name="address"
                    value={address}
                    multiline
                    setLocalState={setLocalState}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </>

          <SubmitButton
            title={selectedRow ? "Update" : "Add"}
            fullWidth
            // title={"add"}
            type="submit"
            loading={saveLoading}
          />
        </form>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Box>
          <CustomTable
            columns={columns}
            loading={isLoading}
            rows={data ? data?.map((e, i) => ({ ...e, id: i + 1 })) : []}
            height={data?.length > 0 ? "50vh" : "350px"}
            toolbarOptions={{}}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Buyer;
