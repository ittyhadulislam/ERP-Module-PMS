import React from "react";
import CustomAppBar from "../../../common/CustomAppBar";
import { Grid } from "@mui/material";
import CustomTextInput from "../../../inputs/CustomTextInput";
import CustomAutocomplete from "../../../inputs/CustomAutocomplete";
import { useGetCountryQuery } from "../../../../redux/features/scm/supplierInfo/querySupplierInfo";

const SupplierForm = ({ localState, setLocalState }) => {
  const { supplierName, attention, mobile, email, country, address } =
    localState;

  //   get country information
  const { data: countryData, isLoading: isCountryLoading } =
    useGetCountryQuery();

  return (
    <>
      <CustomAppBar title={"Form Parameter"} />
      <Grid sx={{ border: `1px solid #1976d2`, padding: "5px" }}>
        <Grid container spacing={1} mt={0.1}>
          <Grid item xs={12} md={4}>
            <CustomTextInput
              label="Supplier Name"
              name="supplierName"
              value={supplierName}
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
            <CustomAutocomplete
              label="Country"
              name="country"
              optionLabel={"cor_description"}
              optionId={"cor_id"}
              options={countryData ?? []}
              value={country}
              setLocalState={setLocalState}
              loading={isCountryLoading}
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
  );
};

export default SupplierForm;
