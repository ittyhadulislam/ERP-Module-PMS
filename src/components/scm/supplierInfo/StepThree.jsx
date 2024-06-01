import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import {
  useGetSupplierInfoStatusQuery,
  useGetWRAPAuditRatingQuery,
} from "../../../redux/features/scm/supplierInfo/querySupplierInfo";

const StepThree = ({ setValue, watch, register, errors, prevData }) => {
  const [haveSEDEX, setHaveSEDEX] = useState(null);
  const [haveWrap, setHaveWrap] = useState(null);
  const [haveHIGG, setHaveHIGG] = useState(null);
  const [haveOEKOTex, sethHaveOEKOTex] = useState(null);
  const [SEDEXAuditDate, setSEDEXAuditDate] = useState(null);
  const [WRAPAuditDate, setWRAPAuditDate] = useState(null);
  const [WRAPRating, setWRAPRating] = useState(null);
  const [WRAPCertificateExpDate, setWRAPCertificateExpDate] = useState(null);
  const [OEKOTEXCertificateExpDate, setOEKOTEXCertificateExpDate] =
    useState(null);

  const { data: WRAPAuditRatingData, isLoading: isWRAPRatingLoading } =
    useGetWRAPAuditRatingQuery();

  const { data: supplierInfoData, isLoading: isSupplierLoading } =
    useGetSupplierInfoStatusQuery();

  useEffect(() => {
    if (haveSEDEX?.yn_des === "No") {
      setValue("SEDEXAuditFirm", "");
      setValue("SEDEXAuditDate", "");
    }
    if (haveWrap?.yn_des === "No") {
      setValue("WRAPAuditDate", "");
      setValue("WRAPAuditFirm", "");
      setValue("WRAPCertificateExpDate", "");
      setValue("rar_id", "");
    }
    if (haveHIGG?.yn_des === "No") {
      setValue("HIGGFacilityID", "");
      setValue("HIGGFEMSelfAssessment", "");
      setValue("HIGGFEMVerified", "");
      setValue("HIGGFSLMSelfAssessment", "");
      setValue("FEMSelfAssessment", "");
    }
    if (haveOEKOTex?.yn_des === "No") {
      setValue("OEKOTEXCertificateExpDate", "");
    }
    setValue("haveSEDEX", haveSEDEX?.yn_id);
    setValue("haveWrap", haveWrap?.yn_id);
    setValue("haveHIGG", haveHIGG?.yn_id);
    setValue("haveOEKOTex", haveOEKOTex?.yn_id);
  }, [haveSEDEX, haveWrap, haveHIGG, haveOEKOTex]);

  useEffect(() => {
    if (prevData) {
      // setValue("haveSEDEX", { yn_id: 2, yn_des: "No" });
      // setValue("haveWrap", { yn_id: 2, yn_des: "No" });
      // setValue("haveHIGG", { yn_id: 2, yn_des: "No" });
      // setValue("haveOEKOTex", { yn_id: 2, yn_des: "No" });
      setValue("SEDEXAuditDate", prevData[0]?.si_sedex_audit_dt);
      setSEDEXAuditDate(prevData[0]?.si_sedex_audit_dt);
      setValue("SEDEXAuditFirm", prevData[0]?.si_sedex_audit_firm);
      setValue("WRAPAuditDate", prevData[0]?.si_wrap_audit_dt);
      setWRAPAuditDate(prevData[0]?.si_wrap_audit_dt);
      setValue("WRAPAuditFirm", prevData[0]?.si_wrap_audit_firm);
      setValue("WRAPCertificateExpDate", prevData[0]?.si_wrap_audit_ex_dt);
      setWRAPCertificateExpDate(prevData[0]?.si_wrap_audit_ex_dt);
      setValue("HIGGFacilityID", prevData[0]?.si_higg_id);
      setValue("HIGGFEMSelfAssessment", prevData[0]?.si_higg_sa_scor);
      setValue("HIGGFEMVerified", prevData[0]?.si_higg_fv_scor);
      setValue("HIGGFSLMSelfAssessment", prevData[0]?.si_higg_fsv_scor);
      setValue("FEMSelfAssessment", prevData[0]?.si_higg_fsas_scor);
      setValue("OEKOTEXCertificateExpDate", prevData[0]?.si_oko_ex_dt);
      setOEKOTEXCertificateExpDate(prevData[0]?.si_oko_ex_dt);
    }
  }, [prevData]);

  useEffect(() => {
    if (prevData) {
      setHaveSEDEX(
        supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_sedex_y_n)
      );
      setHaveWrap(
        supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_wrap_y_n)
      );
      setHaveHIGG(
        supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_higg_org)
      );
      sethHaveOEKOTex(
        supplierInfoData?.find((e) => e.yn_id == prevData[0]?.si_oko_y_n)
      );
      setWRAPRating(
        WRAPAuditRatingData?.find(
          (e) => e.rar_id === prevData[0]?.si_wrap_audit_rat
        )
      );
    }
  }, [prevData, supplierInfoData, WRAPAuditRatingData]);
  // console.log(haveSEDEX, prevData[0]?.si_sedex_y_n);
  return (
    <>
      <CustomAppBar title={"SEDEX"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have SEDEX?"}
              options={supplierInfoData ?? []}
              value={haveSEDEX}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveSEDEX}
              required={true}
            />
          </Grid>
          {haveSEDEX?.yn_des === "Yes" ? (
            <>
              <Grid item xs={12} sm={4}>
                <CustomDatePicker
                  label={"Last SEDEX Audit Date"}
                  name="SEDEXAuditDate"
                  setValue={setValue}
                  required={true}
                  disablePast={false}
                  setData={setSEDEXAuditDate}
                  value={SEDEXAuditDate}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextInput
                  label={"Last SEDEX Audit Conducted By which Audit Firm"}
                  required={true}
                  name="SEDEXAuditFirm"
                  value={watch("SEDEXAuditFirm")}
                  setValue={setValue}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"WRAP"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have WRAP?"}
              options={supplierInfoData ?? []}
              value={haveWrap}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveWrap}
              required={true}
            />
          </Grid>
          {haveWrap?.yn_des === "Yes" ? (
            <>
              <Grid item xs={12} sm={4}>
                <CustomDatePicker
                  label={"Last WRAP Audit Date"}
                  name="WRAPAuditDate"
                  setValue={setValue}
                  required={true}
                  disablePast={false}
                  setData={setWRAPAuditDate}
                  value={WRAPAuditDate}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomAutocomplete
                  setValue={setValue}
                  label={"Last WRAP Audit Rating"}
                  options={WRAPAuditRatingData ?? []}
                  value={WRAPRating}
                  optionLabel={"rar_des"}
                  optionId={"rar_id"}
                  loading={isWRAPRatingLoading}
                  setSelectedValue={setWRAPRating}
                  required={true}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        {haveWrap?.yn_des === "Yes" ? (
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label={"Last WRAP Audit Conducted By which Audit Firm"}
                required={true}
                name="WRAPAuditFirm"
                value={watch("WRAPAuditFirm")}
                setValue={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                label={"WRAP Certificate Expires On"}
                name="WRAPCertificateExpDate"
                setValue={setValue}
                required={true}
                disablePast={false}
                setData={setWRAPCertificateExpDate}
                value={WRAPCertificateExpDate}
              />
            </Grid>
          </Grid>
        ) : null}
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"HIGG"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Are You Member Of HIGG.ORG?"}
              options={supplierInfoData ?? []}
              value={haveHIGG}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveHIGG}
              required={true}
            />
          </Grid>
          {haveHIGG?.yn_des === "Yes" ? (
            <>
              <Grid item xs={12} sm={4}>
                <CustomTextInput
                  label={"HIGG Facility ID"}
                  required={true}
                  name="HIGGFacilityID"
                  value={watch("HIGGFacilityID")}
                  setValue={setValue}
                  register={register}
                  validation={{
                    required: "business is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 || "It Must be under 50 characters",
                    },
                  }}
                />
                {errors.HIGGFacilityID?.type === "required" && (
                  <small style={{ color: "red" }}>
                    {errors.HIGGFacilityID.message}
                  </small>
                )}

                {errors.HIGGFacilityID?.type === "maxLength" && (
                  <small style={{ color: "red" }}>
                    {errors.HIGGFacilityID.message}
                  </small>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomTextInput
                  label={"HIGG FEM Self-Assessment Score"}
                  required={true}
                  name="HIGGFEMSelfAssessment"
                  value={watch("HIGGFEMSelfAssessment")}
                  setValue={setValue}
                  register={register}
                  validation={{
                    required: "business is required",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 || "It Must be under 50 characters",
                    },
                  }}
                />
                {errors.HIGGFEMSelfAssessment?.type === "required" && (
                  <small style={{ color: "red" }}>
                    {errors.HIGGFEMSelfAssessment.message}
                  </small>
                )}

                {errors.HIGGFEMSelfAssessment?.type === "maxLength" && (
                  <small style={{ color: "red" }}>
                    {errors.HIGGFEMSelfAssessment.message}
                  </small>
                )}
              </Grid>
            </>
          ) : null}
        </Grid>
        {haveHIGG?.yn_des === "Yes" ? (
          <Grid container spacing={1} mt={"5px"}>
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label={"HIGG FEM Verified Score"}
                required={true}
                name="HIGGFEMVerified"
                value={watch("HIGGFEMVerified")}
                setValue={setValue}
                register={register}
                validation={{
                  required: "business is required",
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 || "It Must be under 50 characters",
                  },
                }}
              />
              {errors.HIGGFEMVerified?.type === "required" && (
                <small style={{ color: "red" }}>
                  {errors.HIGGFEMVerified.message}
                </small>
              )}

              {errors.HIGGFEMVerified?.type === "maxLength" && (
                <small style={{ color: "red" }}>
                  {errors.HIGGFEMVerified.message}
                </small>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label={"HIGG FSLM Self-Assessment Score"}
                required={true}
                name="HIGGFSLMSelfAssessment"
                value={watch("HIGGFSLMSelfAssessment")}
                setValue={setValue}
                register={register}
                validation={{
                  required: "business is required",
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 || "It Must be under 50 characters",
                  },
                }}
              />
              {errors.HIGGFSLMSelfAssessment?.type === "required" && (
                <small style={{ color: "red" }}>
                  {errors.HIGGFSLMSelfAssessment.message}
                </small>
              )}

              {errors.HIGGFSLMSelfAssessment?.type === "maxLength" && (
                <small style={{ color: "red" }}>
                  {errors.HIGGFSLMSelfAssessment.message}
                </small>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label={"FEM Self-Assessment Score"}
                required={true}
                name="FEMSelfAssessment"
                value={watch("FEMSelfAssessment")}
                setValue={setValue}
                register={register}
                validation={{
                  required: "business is required",
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 || "It Must be under 50 characters",
                  },
                }}
              />
              {errors.FEMSelfAssessment?.type === "required" && (
                <small style={{ color: "red" }}>
                  {errors.FEMSelfAssessment.message}
                </small>
              )}

              {errors.FEMSelfAssessment?.type === "maxLength" && (
                <small style={{ color: "red" }}>
                  {errors.FEMSelfAssessment.message}
                </small>
              )}
            </Grid>
          </Grid>
        ) : null}
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"OEKO-TEX"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have OEKO-TEX Certificate?"}
              options={supplierInfoData ?? []}
              value={haveOEKOTex}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={sethHaveOEKOTex}
              required={true}
            />
          </Grid>
          {haveOEKOTex?.yn_des === "Yes" ? (
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                label={"OEKO-TEX Certificate Expire Date"}
                name="OEKOTEXCertificateExpDate"
                setValue={setValue}
                required={true}
                disablePast={false}
                setData={setOEKOTEXCertificateExpDate}
                value={OEKOTEXCertificateExpDate}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};

export default StepThree;
