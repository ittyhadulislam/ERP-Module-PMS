import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import {
  useGetBSCIAuditRatingQuery,
  useGetSupplierInfoStatusQuery,
} from "../../../redux/features/scm/supplierInfo/querySupplierInfo";

const StepTwo = ({ setValue, watch, register, errors, prevData }) => {
  const [bsci, setBsci] = useState(null);
  const [bsciRating, setBsciRating] = useState(null);
  const [BSCIAuditDate, setBSCIAuditDate] = useState(null);
  const [BSCIAuditExpDate, setBSCIAuditExpDate] = useState(null);

  const { data: BSCIAuditRatingData, isLoading: isBSCIRatingLoading } =
    useGetBSCIAuditRatingQuery();
  const { data: supplierInfoData, isLoading: isSupplierLoading } =
    useGetSupplierInfoStatusQuery();
  useEffect(() => {
    if (bsci?.yn_des === "No") {
      setValue("DBID", "");
      setValue("BSCIAuditDate", "");
      setValue("AuditConductedFirm", "");
      setValue("bci_ar_id", "");
      setValue("BSCIAuditExpDate", "");
    }
  }, [bsci]);

  useEffect(() => {
    if (prevData) {
      setValue("customerName1", prevData[0]?.si_major_cus1);
      setValue("customerName2", prevData[0]?.si_major_cus2);
      setValue("customerName3", prevData[0]?.si_major_cus3);
      setValue("business1", prevData[0]?.si_major_percentage1?.toString());
      setValue("business2", prevData[0]?.si_major_percentage2?.toString());
      setValue("business3", prevData[0]?.si_major_percentage3?.toString());
      setValue("businessVolume", prevData[0]?.si_annual_qty?.toString());
      setValue("businessTurnover", prevData[0]?.si_annual_value);
      setValue("Workers", prevData[0]?.si_total_worker?.toString());
      setValue("DBID", prevData[0]?.si_total_worker?.toString());
      setValue("BSCIAuditDate", prevData[0]?.si_bsci_audit_dt);
      setValue("AuditConductedFirm", prevData[0]?.si_bsci_audit_firm);
      setValue("BSCIAuditExpDate", prevData[0]?.si_bsci_audit_ex_dt);
      setBSCIAuditDate(prevData[0]?.si_bsci_audit_dt);
      setBSCIAuditExpDate(prevData[0]?.si_bsci_audit_ex_dt);
    }
  }, [prevData]);

  useEffect(() => {
    if (prevData) {
      setBsci(
        supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_bsci_y_n)
      );
      setBsciRating(
        BSCIAuditRatingData?.find(
          (e) => e.bci_ar_id === prevData[0]?.si_bsci_audit_rat
        )
      );
    }
  }, [prevData, supplierInfoData, BSCIAuditRatingData]);

  return (
    <>
      <CustomAppBar
        title={"Top 3 Major Customers With The Business Percentage"}
      />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Customer Name (1)"}
              required={true}
              name="customerName1"
              value={watch("customerName1")}
              setValue={setValue}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Customer Name (2)"}
              required={true}
              name="customerName2"
              value={watch("customerName2")}
              setValue={setValue}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Customer Name (3)"}
              required={true}
              name="customerName3"
              value={watch("customerName3")}
              setValue={setValue}
              register={register}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Business %"}
              required={true}
              name="business1"
              value={watch("business1")?.toString()}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  format: (v) =>
                    /^[1-9]\d*$/.test(v) ||
                    "Please enter a valid positive number",
                  // /^[0-9+(). -]+$/.test(v) || "Please enter a valid number",
                  maxLength: (v) => v.length <= 3 || "It Must be 3 characters",
                },
              }}
            />
            {errors.business1?.type === "required" && (
              <small style={{ color: "red" }}>{errors.business1.message}</small>
            )}

            {errors.business1?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.business1.message}</small>
            )}
            {errors.business1?.type === "format" && (
              <small style={{ color: "red" }}>{errors.business1.message}</small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Business %"}
              required={true}
              name="business2"
              value={watch("business2")?.toString()}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  format: (v) =>
                    /^[1-9]\d*$/.test(v) ||
                    "Please enter a valid positive number",
                  maxLength: (v) => v.length <= 3 || "It Must be 3 characters",
                },
              }}
            />
            {errors.business2?.type === "required" && (
              <small style={{ color: "red" }}>{errors.business2.message}</small>
            )}

            {errors.business2?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.business2.message}</small>
            )}
            {errors.business2?.type === "format" && (
              <small style={{ color: "red" }}>{errors.business2.message}</small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Business %"}
              required={true}
              name="business3"
              value={watch("business3")?.toString()}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  format: (v) =>
                    /^[1-9]\d*$/.test(v) ||
                    "Please enter a valid positive number",
                  maxLength: (v) => v.length <= 3 || "It Must be 3 characters",
                },
              }}
            />
            {errors.business3?.type === "required" && (
              <small style={{ color: "red" }}>{errors.business3.message}</small>
            )}

            {errors.business3?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.business3.message}</small>
            )}
            {errors.business3?.type === "format" && (
              <small style={{ color: "red" }}>{errors.business3.message}</small>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Annual Business Volume Debonair (%)"}
              required={true}
              name="businessVolume"
              value={watch("businessVolume")?.toString()}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  format: (
                    v // ^[0-9]+(\.[0-9]+)?$
                  ) =>
                    /^[0-9]+(\.[0-9]+)?$/.test(v) ||
                    "Please enter a valid positive number",
                  maxLength: (v) => v.length <= 4 || "It Must be 4 characters",
                },
              }}
            />
            {errors.businessVolume?.type === "required" && (
              <small style={{ color: "red" }}>
                {errors.businessVolume.message}
              </small>
            )}

            {errors.businessVolume?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                {errors.businessVolume.message}
              </small>
            )}
            {errors.businessVolume?.type === "format" && (
              <small style={{ color: "red" }}>
                {errors.businessVolume.message}
              </small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Factory Annual Business Turnover (Million USD)"}
              required={true}
              name="businessTurnover"
              value={watch("businessTurnover")?.toString()}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  format: (v) =>
                    /^[0-9]+(\.[0-9]+)?$/.test(v) ||
                    "Please enter a valid positive number",
                  maxLength: (v) => v.length <= 4 || "It Must be 4 characters",
                },
              }}
            />
            {errors.businessTurnover?.type === "required" && (
              <small style={{ color: "red" }}>
                {errors.businessTurnover.message}
              </small>
            )}

            {errors.businessTurnover?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                {errors.businessTurnover.message}
              </small>
            )}
            {errors.businessTurnover?.type === "format" && (
              <small style={{ color: "red" }}>
                {errors.businessTurnover.message}
              </small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Total Number Of Workers"}
              required={true}
              name="Workers"
              value={watch("Workers")?.toString()}
              setValue={setValue}
              register={register}
              validation={{
                required: "Workers is required",
                validate: {
                  format: (v) =>
                    /^[1-9]\d*$/.test(v) ||
                    "Please enter a valid positive number",
                  maxLength: (v) => v.length <= 4 || "It Must be 4 characters",
                },
              }}
            />
            {errors.Workers?.type === "required" && (
              <small style={{ color: "red" }}>{errors.Workers.message}</small>
            )}

            {errors.Workers?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.Workers.message}</small>
            )}
            {errors.Workers?.type === "format" && (
              <small style={{ color: "red" }}>{errors.Workers.message}</small>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Business Social Compliance Initiative (BSCI)"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have BSCI?"}
              options={supplierInfoData ?? []}
              value={bsci}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setBsci}
              required={true}
            />
          </Grid>
          {bsci?.yn_des === "Yes" ? (
            <>
              <Grid item xs={12} sm={4}>
                <CustomTextInput
                  label={"BSCI DBID Number"}
                  required={true}
                  name="DBID"
                  value={watch("DBID")?.toString()}
                  setValue={setValue}
                  register={register}
                  validation={{
                    required: "business is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 || "It Must be under 50 characters",
                      format: (v) =>
                        /^[1-9]\d*$/.test(v) ||
                        "Please enter a valid positive number",
                    },
                  }}
                />
                {errors.DBID?.type === "required" && (
                  <small style={{ color: "red" }}>{errors.DBID.message}</small>
                )}

                {errors.DBID?.type === "maxLength" && (
                  <small style={{ color: "red" }}>{errors.DBID.message}</small>
                )}
                {errors.DBID?.type === "format" && (
                  <small style={{ color: "red" }}>{errors.DBID.message}</small>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomDatePicker
                  label={"Last BSCI Audit Date"}
                  name="BSCIAuditDate"
                  setValue={setValue}
                  required={true}
                  disablePast={false}
                  setData={setBSCIAuditDate}
                  value={BSCIAuditDate}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          {bsci?.yn_des === "Yes" ? (
            <>
              <Grid item xs={12} sm={4}>
                <CustomTextInput
                  label={"Last BSCI Audit Conducted Firm"}
                  required={true}
                  name="AuditConductedFirm"
                  value={watch("AuditConductedFirm")}
                  setValue={setValue}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {" "}
                <CustomAutocomplete
                  setValue={setValue}
                  label={"Last BSCI Audit Rating"}
                  options={BSCIAuditRatingData ?? []}
                  value={bsciRating}
                  optionLabel={"bci_des"}
                  optionId={"bci_ar_id"}
                  loading={isBSCIRatingLoading}
                  setSelectedValue={setBsciRating}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomDatePicker
                  label={"BSCI Audit Expire Date"}
                  name="BSCIAuditExpDate"
                  setValue={setValue}
                  required={true}
                  disablePast={false}
                  setData={setBSCIAuditExpDate}
                  value={BSCIAuditExpDate}
                />
              </Grid>{" "}
            </>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};

export default StepTwo;
