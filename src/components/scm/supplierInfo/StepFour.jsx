import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomCheckBox from "../../inputs/CustomCheckBox";
import CustomTextInput from "../../inputs/CustomTextInput";
import { useGetSupplierInfoStatusQuery } from "../../../redux/features/scm/supplierInfo/querySupplierInfo";

const chek = ["OCS", "RCS", "GRS", "GOTS", "RDS", "RWS", "CCS", "Other"];

const StepFour = ({ setValue, watch, register, errors, prevData }) => {
  const [haveISO1400, setHaveISO1400] = useState(null);
  const [haveISO4500, setHaveISO4500] = useState(null);
  const [haveISO9001, setHaveISO9001] = useState(null);
  const [ISO14001ExpDate, setISO14001ExpDate] = useState(null);
  const [ISO4500ExpDate, setISO4500ExpDate] = useState(null);
  const [ISO9001ExpDate, setISO9001ExpDate] = useState(null);
  const [factoryHaveETP, setFactoryHaveETP] = useState(null);

  const { data: supplierInfoData, isLoading: isSupplierLoading } =
    useGetSupplierInfoStatusQuery();

  useEffect(() => {
    if (haveISO1400?.yn_des === "No") {
      setValue("ISO14001", "");
      setFactoryHaveETP(null);
    }
    if (haveISO4500?.yn_des === "No") {
      setISO4500ExpDate(null);
    }
    if (haveISO9001?.yn_des === "No") {
      setISO9001ExpDate(null);
    }

    setValue("haveISO1400", haveISO1400?.yn_id);
    setValue("haveISO4500", haveISO4500?.yn_id);
    setValue("haveISO9001", haveISO9001?.yn_id);
    setValue("factoryHaveETP", factoryHaveETP?.yn_id);
  }, [haveISO1400, haveISO4500, haveISO9001, factoryHaveETP]);

  useEffect(() => {
    if (prevData) {
      setValue("ISO14001", prevData[0]?.si_iso_ex_dt);
      setISO14001ExpDate(prevData[0]?.si_iso_ex_dt);
      setValue("ISO4500", prevData[0]?.si_etp_ex_dt);
      setISO4500ExpDate(prevData[0]?.si_etp_ex_dt);
      setValue("ISO9001", prevData[0]?.si_etp_iso_9001_ex_dt);
      setISO9001ExpDate(prevData[0]?.si_etp_iso_9001_ex_dt);
      setValue("OCS", prevData[0]?.si_ocs === "OCS");
      setValue("RCS", prevData[0]?.si_rcs === "RCS");
      setValue("GRS", prevData[0]?.si_grs === "GRS");
      setValue("GOTS", prevData[0]?.si_gots === "GOTS");
      setValue("RDS", prevData[0]?.si_rds === "RDS");
      setValue("RWS", prevData[0]?.si_rws === "RWS");
      setValue("CCS", prevData[0]?.si_ccs === "CCS");
      setValue("Other", prevData[0]?.si_others === "Other");
      // setOCS(prevData[0]?.si_ocs);
      // setRCS(prevData[0]?.si_rcs);
      // setGRS(prevData[0]?.si_grs);
      setValue("emsName", prevData[0]?.si_ems_name);
      setValue("emsDesignation", prevData[0]?.si_ems_desig);
      setValue("emsPhone", prevData[0]?.si_ems_sim_no);
      setValue("emsEmail", prevData[0]?.si_ems_email);
    }
  }, [prevData]);

  useEffect(() => {
    if (prevData) {
      if (prevData[0]?.si_iso_y_n === null) {
        setHaveISO1400({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveISO1400(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_iso_y_n)
        );
      }
      if (prevData[0]?.si_etp_iso === null) {
        setHaveISO4500({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveISO4500(
          supplierInfoData?.find((e) => e.yn_id == prevData[0]?.si_etp_iso)
        );
      }
      if (prevData[0]?.si_etp_iso_9001 === null) {
        setHaveISO9001({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveISO9001(
          supplierInfoData?.find(
            (e) => e.yn_id === prevData[0]?.si_etp_iso_9001
          )
        );
      }
      setFactoryHaveETP(
        supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_etp)
      );
    }
  }, [prevData, supplierInfoData]);

  return (
    <>
      <CustomAppBar title={"ISO/Scop Certificate/ETP"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have ISO 14001:2015?"}
              options={supplierInfoData ?? []}
              value={haveISO1400}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveISO1400}
              required={true}
            />
          </Grid>
          {haveISO1400?.yn_des === "Yes" ? (
            <>
              <Grid item xs={12} sm={4}>
                <CustomDatePicker
                  label={"ISO 14001:2015 Expire Date"}
                  name="ISO14001"
                  setValue={setValue}
                  required={true}
                  disablePast={false}
                  setData={setISO14001ExpDate}
                  value={ISO14001ExpDate}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomAutocomplete
                  setValue={setValue}
                  label={"Dose The Factory Have An ETP?"}
                  options={supplierInfoData ?? []}
                  value={factoryHaveETP}
                  optionLabel={"yn_des"}
                  optionId={"yn_id"}
                  loading={isSupplierLoading}
                  setSelectedValue={setFactoryHaveETP}
                  required={true}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          <Box
            sx={{
              display: "flex",
              //   justifyContent: "center",
              flexDirection: "column",
              //   alignItems: "center",
              ml: 2,
            }}
          >
            <Typography variant="p" sx={{ mt: 1 }}>
              Scope Certificate
            </Typography>
            <span>
              {/* {chek.map((e) => (
                <CustomCheckBox
                  label={e}
                  key={e}
                  // checked={true}
                  handleChange={(e) => }
                  // defaultChecked={true}
                />
              ))} */}
              <CustomCheckBox
                label={"OCS"}
                name={"OCS"}
                setValue={setValue}
                // key={e}
                checked={watch("OCS")}
                // handleChange={(e) => setOCS(e.target.checked)}
                // defaultChecked={
                //   prevData[0]?.si_ocs ? prevData[0]?.si_ocs : false
                // }
              />
              <CustomCheckBox
                label={"RCS"}
                name={"RCS"}
                setValue={setValue}
                checked={watch("RCS")}
              />
              <CustomCheckBox
                label={"GRS"}
                name={"GRS"}
                setValue={setValue}
                checked={watch("GRS")}
              />
              <CustomCheckBox
                label={"GOTS"}
                name={"GOTS"}
                setValue={setValue}
                checked={watch("GOTS")}
              />
              <CustomCheckBox
                label={"RDS"}
                name={"RDS"}
                setValue={setValue}
                checked={watch("RDS")}
              />
              <CustomCheckBox
                label={"RWS"}
                name={"RWS"}
                setValue={setValue}
                checked={watch("RWS")}
              />
              <CustomCheckBox
                label={"CCS"}
                name={"CCS"}
                setValue={setValue}
                checked={watch("CCS")}
              />
              <CustomCheckBox
                label={"Other"}
                name={"Other"}
                setValue={setValue}
                checked={watch("Other")}
              />
            </span>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"EMS/ECR Responsible Person Information"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Name"}
              required={true}
              name="emsName"
              value={watch("emsName")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Designation"}
              required={true}
              name="emsDesignation"
              value={watch("emsDesignation")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Phone"}
              type="tel"
              required={true}
              name="emsPhone"
              value={watch("emsPhone")}
              setValue={setValue}
              register={register}
              validation={{
                required: "Phone number is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 15 || "The Phone should have at most 15 Number",
                  minLength: (v) =>
                    v.length >= 7 || "The Phone should have at Least 7 Number",
                  format: (v) =>
                    /^\+?[0-9]{1,4}?[-. ]?\(?[0-9]{1,3}?\)?[-. ]?[0-9]{1,4}[-. ]?[0-9]{1,9}$/.test(
                      v
                    ) || "Please enter a valid phone number",
                },
              }}
            />
            {errors.emsPhone?.type === "required" && (
              <small style={{ color: "red" }}>Phone is required</small>
            )}
            {errors.emsPhone?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at most 15 Number
              </small>
            )}
            {errors.emsPhone?.type === "minLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at Least 7 Number
              </small>
            )}

            {errors.emsPhone?.type === "format" && (
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
              name="emsEmail"
              value={watch("emsEmail")}
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
            {errors?.emsEmail?.type === "required" && (
              <small style={{ color: "red" }}>Email is required</small>
            )}

            {errors?.emsEmail?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Email should have at least Under 50 characters
              </small>
            )}

            {errors?.emsEmail?.type === "matchPattern" && (
              <small style={{ color: "red" }}>
                This must contain only Type Email
              </small>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"ISO 4500:2018"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have ISO 45001:2018 Certificate?"}
              options={supplierInfoData ?? []}
              value={haveISO4500}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveISO4500}
              required={true}
            />
          </Grid>
          {haveISO4500?.yn_des === "Yes" ? (
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                label={"ISO 45001:2018 Expire Date"}
                name="ISO4500"
                setValue={setValue}
                required={true}
                disablePast={false}
                setData={setISO4500ExpDate}
                value={ISO4500ExpDate}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"ISO 9001:2015"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have ISO 9001:2015 Certificate?"}
              options={supplierInfoData ?? []}
              value={haveISO9001}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveISO9001}
              required={true}
            />
          </Grid>
          {haveISO9001?.yn_des === "Yes" ? (
            <Grid item xs={12} sm={6}>
              <CustomDatePicker
                label={"ISO 9001:2015 Expire Date"}
                name="ISO9001"
                setValue={setValue}
                required={true}
                disablePast={false}
                setData={setISO9001ExpDate}
                value={ISO9001ExpDate}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </>
  );
};

export default StepFour;
