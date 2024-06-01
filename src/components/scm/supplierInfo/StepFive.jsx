import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomTextInput from "../../inputs/CustomTextInput";
import { useGetSupplierInfoStatusQuery } from "../../../redux/features/scm/supplierInfo/querySupplierInfo";

const StepFive = ({ setValue, watch, register, errors, prevData }) => {
  const [HaveSCS, setHaveSCS] = useState(null);
  const [HaveSCSExpDate, setHaveSCSExpDate] = useState(null);
  const [HaveScan, setHaveScan] = useState(null);
  const [HaveScanExpDate, setHaveScanExpDate] = useState(null);
  const [HaveAgency, setHaveAgency] = useState(null);

  const { data: supplierInfoData, isLoading: isSupplierLoading } =
    useGetSupplierInfoStatusQuery();

  useEffect(() => {
    if (HaveSCS?.yn_des === "No") {
      setValue("HaveSCS", "");
    }
    if (HaveScan?.yn_des === "No") {
      setValue("HaveScan", "");
    }
    if (HaveAgency?.yn_des === "No") {
      setValue("HaveAgency", "");
      setValue("agencyName", "");
      setValue("agencyDesignation", "");
      setValue("agencyPhone", "");
      setValue("agencyEmail", "");
    }

    setValue("HaveSCS", HaveSCS?.yn_id);
    setValue("HaveScan", HaveScan?.yn_id);
    setValue("HaveAgency", HaveAgency?.yn_id);
  }, [HaveSCS, HaveScan, HaveAgency]);

  useEffect(() => {
    if (prevData) {
      setValue("HaveSCSExpDate", prevData[0]?.si_scs_audit_ex_dt);
      setHaveSCSExpDate(prevData[0]?.si_scs_audit_ex_dt);
      setValue("HaveScanExpDate", prevData[0]?.si_scan_audit_ex_dt);
      setHaveScanExpDate(prevData[0]?.si_scan_audit_ex_dt);
      setValue("agencyName", prevData[0]?.si_loa_name);
      setValue("agencyDesignation", prevData[0]?.si_loa_designation);
      setValue("agencyPhone", prevData[0]?.si_loa_mobile);
      setValue("agencyEmail", prevData[0]?.si_loa_email);
    }
  }, [prevData]);

  useEffect(() => {
    if (prevData) {
      if (prevData[0]?.si_scs_audit === null) {
        setHaveSCS({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveSCS(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_scs_audit)
        );
      }
      if (prevData[0]?.si_scan_audit === null) {
        setHaveScan({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveScan(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_scan_audit)
        );
      }
      if (prevData[0]?.si_loa_bd === null) {
        setHaveAgency({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveAgency(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_loa_bd)
        );
      }
    }
  }, [prevData, supplierInfoData]);

  return (
    <>
      <CustomAppBar title={"SCS"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have Any SCS Audit Certificate?"}
              options={supplierInfoData ?? []}
              value={HaveSCS}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveSCS}
              required={true}
            />
          </Grid>
          {HaveSCS?.yn_des === "Yes" ? (
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                label={"SCS Audit Expire Date"}
                name="HaveSCSExpDate"
                setValue={setValue}
                required={true}
                disablePast={false}
                setData={setHaveSCSExpDate}
                value={HaveSCSExpDate}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"SCAN"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have Any SCAN Audit Certificate?"}
              options={supplierInfoData ?? []}
              value={HaveScan}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveScan}
              required={true}
            />
          </Grid>
          {HaveScan?.yn_des === "Yes" ? (
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                label={"SCAN Audit Expire Date"}
                name="HaveScanExpDate"
                setValue={setValue}
                required={true}
                disablePast={false}
                setData={setHaveScanExpDate}
                value={HaveScanExpDate}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>
      <CustomAppBar
        title={"Dose The Factory Have Any Local Office/Agency in BD?"}
      />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={12}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have Any Local Office/Agency in BD?"}
              options={supplierInfoData ?? []}
              value={HaveAgency}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveAgency}
              required={true}
            />
          </Grid>
        </Grid>
        {HaveAgency?.yn_des === "Yes" ? (
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label={"Name"}
                required={true}
                name="agencyName"
                value={watch("agencyName")}
                setValue={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label={"Designation"}
                required={true}
                name="agencyDesignation"
                value={watch("agencyDesignation")}
                setValue={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label={"Phone"}
                type="tel"
                required={true}
                name="agencyPhone"
                value={watch("agencyPhone")}
                setValue={setValue}
                register={register}
                validation={{
                  required: "Phone number is required",

                  validate: {
                    maxLength: (v) =>
                      v.length <= 15 ||
                      "The Phone should have at most 15 Number",
                    minLength: (v) =>
                      v.length >= 7 ||
                      "The Phone should have at Least 7 Number",
                    format: (v) =>
                      /^\+?[0-9]{1,4}?[-. ]?\(?[0-9]{1,3}?\)?[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,9}$/.test(
                        v
                      ) || "Please enter a valid phone number",
                  },
                }}
              />
              {errors.agencyPhone?.type === "required" && (
                <small style={{ color: "red" }}>Phone is required</small>
              )}
              {errors.agencyPhone?.type === "maxLength" && (
                <small style={{ color: "red" }}>
                  The Phone should have at most 15 Number
                </small>
              )}
              {errors.agencyPhone?.type === "minLength" && (
                <small style={{ color: "red" }}>
                  The Phone should have at Least 7 Number
                </small>
              )}
              {errors.agencyPhone?.type === "format" && (
                <small style={{ color: "red" }}>
                  Please enter a valid phone number
                </small>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label={"Email"}
                type="email"
                required={true}
                name="agencyEmail"
                value={watch("agencyEmail")}
                setValue={setValue}
                register={register}
                validation={{
                  required: "Email is required",
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 ||
                      "The email should have at most 50 characters",
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                }}
              />
              {errors?.agencyEmail?.type === "required" && (
                <small style={{ color: "red" }}>Email is required</small>
              )}

              {errors?.agencyEmail?.type === "maxLength" && (
                <small style={{ color: "red" }}>
                  The Email should have at least Under 50 characters
                </small>
              )}

              {errors?.agencyEmail?.type === "matchPattern" && (
                <small style={{ color: "red" }}>
                  This must contain only Type Email
                </small>
              )}
            </Grid>
          </Grid>
        ) : null}
      </Box>
    </>
  );
};

export default StepFive;
