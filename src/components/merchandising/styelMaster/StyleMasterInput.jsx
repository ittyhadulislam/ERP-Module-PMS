import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomAutocompleteSmall from "../../merchandisingUI/CustomAutocompleteSmall";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";
import CustomDatePickerSmall from "../../merchandisingUI/CustomDatePickerSmall";

const StyleMasterInput = () => {
  return (
    <>
      <CustomAppBar title={"input parameters"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall label={"Order Type"} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Buyer"}
              name="buyer"
              optionLabel={"cBuyer_Name"}
              optionId={"nBuyer_ID"}
              //   options={buyerData ?? []}
              //   value={buyer}
              //   loading={buyerLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              //   setValue={setValue}
              label={"Store"}
              name="itemType"
              optionLabel={"gp_description"}
              optionId={"gp_id"}
              //   options={itemData ?? []}
              //   value={itemType}
              //   loading={itemLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"buyer Season"}
              name="deliverTo"
              optionLabel={"gpd_company"}
              optionId={"gpd_id"}
              //   options={deliverData ?? []}
              //   value={deliverTo}
              //   loading={deliverLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Factory Season"}
              name="department"
              optionLabel={"cDeptname"}
              optionId={"nUserDept"}
              //   options={company ? departmentData ?? [] : []}
              //   value={department}
              //   loading={departmentLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Brand"}
              name="style"
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   options={styleData ?? []}
              //   value={style}
              //   loading={styleLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Garments Dept"}
              name="style"
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   options={styleData ?? []}
              //   value={style}
              //   loading={styleLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Garments Type"}
              name="style"
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   options={styleData ?? []}
              //   value={style}
              //   loading={styleLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Style Type"}
              name="style"
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              //   options={styleData ?? []}
              value={null}
              //   loading={styleLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextInputSmall
              label={"Contract No"}
              name="itemDescription"
              value={"itemDescription"}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInputSmall
              label={"Style No"}
              name="deliveryAddress"
              //   value={deliveryAddress}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextInputSmall
              label={"Total Order Qty(Pcs)"}
              name="deliveryAddress"
              //   value={deliveryAddress}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextInputSmall
              label={"Currency"}
              name="deliveryAddress"
              //   value={deliveryAddress}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"FOB"}
              name="section"
              optionLabel={"cSection_Description"}
              optionId={"nSectionID"}
              //   options={department ? sectionData ?? [] : []}
              //   value={section}
              //   loading={sectionLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInputSmall
              label={"Plan Efficiency %"}
              name="garmentsType"
              //   value={garmentsType}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInputSmall
              label={"S.M.V"}
              name="qty"
              type="number"
              //   value={qty}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePickerSmall label="Initial Order RCVD" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePickerSmall label="BPCD" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePickerSmall
              label={"Confirm Order RCVD"}
              value={"01-12-2024"}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"TNA"}
              name="status"
              optionLabel={"gp_st_desc"}
              optionId={"gp_st_id"}
              //   options={statusData ?? []}
              //   value={status}
              //   loading={statusLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
              //   disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocompleteSmall
              label={"Factory"}
              name="unit"
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              //   options={unitData ?? []}
              //   value={unit}
              //   loading={unitLoading}
              //   setReduxState={setMerchantGatePass}
              //   required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StyleMasterInput;
