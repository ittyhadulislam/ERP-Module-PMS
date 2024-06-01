import React, { useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { formateDate } from "../../../utils/formateDate";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import CustomTable from "../../table/CustomTable";

const FabricColor = () => {
  const [name, setName] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const { userName } = useSelector((state) => state.auth.user);

  // handleSubmit fn
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      // "supplierID": "string",
      supplierName: supplierName,
      attension: attention,
      mobile: mobile,
      email: email,
      country: country?.cor_id,
      address: address,
      userName: userName,
    };

    const updatePayload = {
      supplierID: selectedRow?.sn_id,
      supplierName: supplierName,
      attension: attention,
      mobile: mobile,
      email: email,
      country: country?.cor_id,
      address: address,
      userName: userName,
    };
    // saveAndUpdate(selectedRow ? updatePayload : payload);
  };
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
      field: "sn_name",
      headerName: "buyer Name",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sn_atten",
      headerName: "Attention",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sn_att_mobile",
      headerName: "Mobile",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "sn_email",
      headerName: "Email",
      minWidth: 120,
      maxWidth: 140,
      flex: 1,
    },
    {
      field: "sn_address",
      headerName: "Address",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sn_crt_nm",
      headerName: "created by",
      minWidth: 90,
      maxWidth: 90,
      flex: 1,
    },
    {
      field: "sn_date",
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
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    label="Fabric Color"
                    value={name}
                    setStateValue={setName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SubmitButton
                    title={selectedRow ? "Update" : "Add"}
                    fullWidth
                    // title={"add"}
                    type="submit"
                    // loading={saveLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        </form>
      </Grid>
      <Grid item xs={12} mt={1}>
        <Box>
          <CustomTable
            columns={columns}
            // loading={isLoading}
            // rows={data ? data?.map((e, i) => ({ ...e, id: i + 1 })) : []}
            // height={data?.length > 0 ? "50vh" : "350px"}
            toolbarOptions={{}}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FabricColor;
