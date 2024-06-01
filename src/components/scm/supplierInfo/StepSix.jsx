import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import {
  useGetSupplierInfoStatusQuery,
  useGetUnitTestQuery,
} from "../../../redux/features/scm/supplierInfo/querySupplierInfo";

const StepSix = ({ setValue, watch, register, errors, prevData }) => {
  const [HaveWeavingMill, setHaveWeavingMill] = useState(null);
  const [haveLabTest, setHaveLabTest] = useState(null);
  const [haveTextReport, setHaveTextReport] = useState(null);
  const [haveWetProcess, setHaveWetProcess] = useState(null);
  const [unit1, setUnit1] = useState(null);
  const [unit2, setUnit2] = useState(null);
  const [unit3, setUnit3] = useState(null);

  const { data: supplierInfoData, isLoading: isSupplierLoading } =
    useGetSupplierInfoStatusQuery();

  const { data: unitData, isLoading: isUnitLoading } = useGetUnitTestQuery();

  useEffect(() => {
    if (HaveWeavingMill?.yn_des === "No") {
      setValue("HaveWeavingMill", "");
    }
    if (haveLabTest?.yn_des === "No") {
      setValue("haveLabTest", "");
    }
    if (haveTextReport?.yn_des === "No") {
      setValue("haveTextReport", "");
    }
    if (haveWetProcess?.yn_des === "No") {
      setValue("haveWetProcess", "");
    }

    setValue("HaveWeavingMill", HaveWeavingMill?.yn_id);
    setValue("haveLabTest", haveLabTest?.yn_id);
    setValue("haveTextReport", haveTextReport?.yn_id);
    setValue("haveWetProcess", haveWetProcess?.yn_id);
    setValue("unit1", unit1?.nUnitID);
    setValue("unit2", unit2?.nUnitID);
    setValue("unit3", unit3?.nUnitID);
  }, [
    HaveWeavingMill,
    haveLabTest,
    haveTextReport,
    haveWetProcess,
    unit1,
    unit2,
    unit3,
  ]);

  useEffect(() => {
    if (prevData) {
      if (prevData[0]?.si_weaving_mill === null) {
        setHaveWeavingMill({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveWeavingMill(
          supplierInfoData?.find(
            (e) => e.yn_id === prevData[0]?.si_weaving_mill
          )
        );
      }
      if (prevData[0]?.si_lab_test === null) {
        setHaveLabTest({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveLabTest(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_lab_test)
        );
      }
      if (prevData[0]?.si_test_report === null) {
        setHaveTextReport({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveTextReport(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_test_report)
        );
      }
      if (prevData[0]?.si_process_dye === null) {
        setHaveWetProcess({ yn_id: 2, yn_des: "No" });
      } else {
        setHaveWetProcess(
          supplierInfoData?.find((e) => e.yn_id === prevData[0]?.si_process_dye)
        );
      }
      setUnit1(unitData?.find((e) => e.nUnitID === prevData[0]?.si_unit1));
      setUnit2(unitData?.find((e) => e.nUnitID === prevData[0]?.si_unit2));
      setUnit3(unitData?.find((e) => e.nUnitID === prevData[0]?.si_unit3));

      setValue("productName1", prevData[0]?.si_product1);
      setValue("productName2", prevData[0]?.si_product2);
      setValue("productName3", prevData[0]?.si_product3);
      setValue("capacity1", prevData[0]?.si_capacity1?.toString());
      setValue("capacity2", prevData[0]?.si_capacity2?.toString());
      setValue("capacity3", prevData[0]?.si_capacity3?.toString());
    }
  }, [prevData, supplierInfoData, unitData]);

  return (
    <>
      <CustomAppBar
        title={"Weaving Mill/Lab Test/3rd Party Test/Wet Process/Dyeing"}
      />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have Own Weaving Mill?"}
              options={supplierInfoData ?? []}
              value={HaveWeavingMill}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveWeavingMill}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have Own Lab Test Facility?"}
              options={supplierInfoData ?? []}
              value={haveLabTest}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveLabTest}
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={
                "Dose You Provide 3rd Party Text Report At Your Cost When Required?"
              }
              options={supplierInfoData ?? []}
              value={haveTextReport}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveTextReport}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Dose The Factory Have Wet Process/Dyeing?"}
              options={supplierInfoData ?? []}
              value={haveWetProcess}
              optionLabel={"yn_des"}
              optionId={"yn_id"}
              loading={isSupplierLoading}
              setSelectedValue={setHaveWetProcess}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Top 3 Product With Monthly Capacity"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Product Name (1)"}
              required={true}
              name="productName1"
              value={watch("productName1")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Capacity (1)"}
              required={true}
              name="capacity1"
              value={watch("capacity1")}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 10 || "It Must be 10 characters",
                  format: (v) =>
                    /^[0-9+(). -]+$/.test(v) || "Please enter a valid number",
                },
              }}
            />
            {errors.capacity1?.type === "required" && (
              <small style={{ color: "red" }}>{errors.capacity1.message}</small>
            )}

            {errors.capacity1?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.capacity1.message}</small>
            )}
            {errors.capacity1?.type === "format" && (
              <small style={{ color: "red" }}>{errors.capacity1.message}</small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Unit 1"}
              options={unitData ?? []}
              value={unit1}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              loading={isUnitLoading}
              setSelectedValue={setUnit1}
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Product Name (2)"}
              required={true}
              name="productName2"
              value={watch("productName2")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Capacity (2)"}
              required={true}
              name="capacity2"
              value={watch("capacity2")}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 10 || "It Must be 10 characters",
                  format: (v) =>
                    /^[0-9+(). -]+$/.test(v) || "Please enter a valid number",
                },
              }}
            />
            {errors.capacity2?.type === "required" && (
              <small style={{ color: "red" }}>{errors.capacity2.message}</small>
            )}

            {errors.capacity2?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.capacity2.message}</small>
            )}
            {errors.capacity2?.type === "format" && (
              <small style={{ color: "red" }}>{errors.capacity2.message}</small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Unit 2"}
              options={unitData ?? []}
              value={unit2}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              loading={isUnitLoading}
              setSelectedValue={setUnit2}
              required={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Product Name (3)"}
              required={true}
              name="productName3"
              value={watch("productName3")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextInput
              label={"Capacity (3)"}
              required={true}
              name="capacity3"
              value={watch("capacity3")}
              setValue={setValue}
              register={register}
              validation={{
                required: "business is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 10 || "It Must be 10 characters",
                  format: (v) =>
                    /^[0-9+(). -]+$/.test(v) || "Please enter a valid number",
                },
              }}
            />
            {errors.capacity3?.type === "required" && (
              <small style={{ color: "red" }}>{errors.capacity3.message}</small>
            )}

            {errors.capacity3?.type === "maxLength" && (
              <small style={{ color: "red" }}>{errors.capacity3.message}</small>
            )}
            {errors.capacity3?.type === "format" && (
              <small style={{ color: "red" }}>{errors.capacity3.message}</small>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Unit 3"}
              options={unitData ?? []}
              value={unit3}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              loading={isUnitLoading}
              setSelectedValue={setUnit3}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StepSix;
