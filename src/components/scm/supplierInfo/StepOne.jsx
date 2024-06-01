import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import { useSelector } from "react-redux";
import {
  useGetBusinessTypeQuery,
  useGetCountryQuery,
  useGetSupplierCategoryQuery,
  useGetSupplierQuery,
  useGetSupplierTypeQuery,
} from "../../../redux/features/scm/supplierInfo/querySupplierInfo";

const StepOne = ({
  setValue,
  watch,
  supplier,
  setSupplier,
  register,
  errors,
  prevData,
}) => {
  const { user } = useSelector((state) => state.auth);

  const [category, setCategory] = useState(null);
  const [supplierType, setSupplierType] = useState(null);
  const [businessType, setBusinessType] = useState(null);
  const [country, setCountry] = useState(null);

  const { data: supplierInfo, isLoading: isSupplierLoading } =
    useGetSupplierQuery(user?.userName);
  const { data: supplierCategory, isLoading: isSupplierCategoryLoading } =
    useGetSupplierCategoryQuery();
  const { data: supplierTypeData, isLoading: isSupplierTypeLoading } =
    useGetSupplierTypeQuery();
  const { data: businessTypeData, isLoading: isBusinessTypeLoading } =
    useGetBusinessTypeQuery();
  const { data: countryData, isLoading: isCountryLoading } =
    useGetCountryQuery();

  useEffect(() => {
    if (prevData) {
      setValue("sic_id", prevData[0]?.si_sup_category);
      setValue("sn_id", prevData[0]?.si_sup_type);
      setValue("sbt_id", prevData[0]?.si_buss_type);
      setValue("cor_id", prevData[0]?.si_country);
      setValue("factoryNameEnglish", prevData[0]?.si_fac_nm_eng);
      setValue("factoryAddressEnglish", prevData[0]?.si_fac_addr_eng);
      setValue("factoryOwnerName", prevData[0]?.si_fac_owner_name);
      setValue(
        "factoryOwnerDesignation",
        prevData[0]?.si_fac_owner_designation
      );
      setValue("factoryOwnerPhone", prevData[0]?.si_fac_owner_sim_no);
      setValue("factoryOwnerEmail", prevData[0]?.si_fac_owner_email);
      setValue("responsiblePersonName", prevData[0]?.si_mar_name);
      setValue("responsiblePersonDesignation", prevData[0]?.si_mar_designation);
      setValue("responsiblePersonPhone", prevData[0]?.si_mar_sim_no);
      setValue("responsiblePersonEmail", prevData[0]?.si_mar_email);
      setValue("hrName", prevData[0]?.si_hrc_name);
      setValue("hrDesignation", prevData[0]?.si_hrc_designation);
      setValue("hrPhone", prevData[0]?.si_hrc_sim_no);
      setValue("hrEmail", prevData[0]?.si_hrc_email);
    }
    if (!supplier) {
      setValue("sic_id", null);
      setValue("sn_id", null);
      setValue("sbt_id", null);
      setValue("cor_id", null);
      setValue("factoryNameEnglish", "");
      setValue("factoryAddressEnglish", "");
      setValue("factoryOwnerName", "");
      setValue("factoryOwnerDesignation", "");
      setValue("factoryOwnerPhone", "");
      setValue("factoryOwnerEmail", "");
      setValue("responsiblePersonName", "");
      setValue("responsiblePersonDesignation", "");
      setValue("responsiblePersonPhone", "");
      setValue("responsiblePersonEmail", "");
      setValue("hrName", "");
      setValue("hrDesignation", "");
      setValue("hrPhone", "");
      setValue("hrEmail", "");
      setCategory(null);
      setSupplierType(null);
      setBusinessType(null);
      setCountry(null);
    }
  }, [prevData, supplier]);

  useEffect(() => {
    if (supplier) {
      setSupplier(supplierInfo?.find((e) => e.nUserID === watch("nUserID")));
      setCategory(supplierCategory?.find((e) => e.sic_id === watch("sic_id")));
      setSupplierType(
        supplierTypeData?.find((e) => e.sn_id === watch("sn_id"))
      );
      setBusinessType(
        businessTypeData?.find((e) => e.sbt_id === watch("sbt_id"))
      );
      setCountry(countryData?.find((e) => e.cor_id === watch("cor_id")));
    }
  }, [watch, prevData, supplier]);

  return (
    <>
      <CustomAppBar title={"Basic Supply Info"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Supplier Name"}
              options={supplierInfo ?? []}
              // options={[]}
              value={supplier}
              optionLabel={"cUserFullname"}
              optionId={"nUserID"}
              loading={isSupplierLoading}
              setSelectedValue={setSupplier}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Supplier Category"}
              options={supplierCategory ?? []}
              value={category}
              optionLabel={"sic_desc"}
              optionId={"sic_id"}
              loading={isSupplierCategoryLoading}
              setSelectedValue={setCategory}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Supplier Type"}
              options={supplierTypeData ?? []}
              value={supplierType}
              optionLabel={"sn_type"}
              optionId={"sn_id"}
              loading={isSupplierTypeLoading}
              setSelectedValue={setSupplierType}
              required={true}
            />
          </Grid>
        </Grid>

        {/* second line */}
        <Grid container spacing={1} my={1}>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Business Type"}
              options={businessTypeData ?? []}
              value={businessType}
              optionLabel={"sbt_bussiness_type"}
              optionId={"sbt_id"}
              loading={isBusinessTypeLoading}
              setSelectedValue={setBusinessType}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              setValue={setValue}
              label={"Country Origin"}
              options={countryData ?? []}
              value={country}
              optionLabel={"cor_description"}
              optionId={"cor_id"}
              loading={isCountryLoading}
              setSelectedValue={setCountry}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>
      <CustomAppBar title={"Factory Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Factory Name in English"}
              required={true}
              name="factoryNameEnglish"
              value={watch("factoryNameEnglish")}
              setValue={setValue}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Factory Address in English"}
              required={true}
              name="factoryAddressEnglish"
              value={watch("factoryAddressEnglish")}
              setValue={setValue}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Details Of Factory Owner"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Name"}
              required={true}
              name="factoryOwnerName"
              value={watch("factoryOwnerName")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Designation"}
              required={true}
              name="factoryOwnerDesignation"
              value={watch("factoryOwnerDesignation")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Phone"}
              type="tel"
              required={true}
              name="factoryOwnerPhone"
              value={watch("factoryOwnerPhone")}
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
            {errors.factoryOwnerPhone?.type === "required" && (
              <small style={{ color: "red" }}>Phone is Required</small>
            )}
            {errors.factoryOwnerPhone?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at most 15 Number
              </small>
            )}
            {errors.factoryOwnerPhone?.type === "minLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at Least 7 Number
              </small>
            )}

            {errors.factoryOwnerPhone?.type === "format" && (
              <small style={{ color: "red" }}>
                Please Enter a Valid Phone Number
              </small>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Email"}
              type="email"
              required={true}
              name="factoryOwnerEmail"
              value={watch("factoryOwnerEmail")}
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
            {errors.factoryOwnerEmail?.type === "required" && (
              <small style={{ color: "red" }}>Email is required</small>
            )}

            {errors.factoryOwnerEmail?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Email should have at least Under 50 characters
              </small>
            )}

            {errors.factoryOwnerEmail?.type === "matchPattern" && (
              <small style={{ color: "red" }}>
                This must contain only Type Email
              </small>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Details Of The Marketing Responsible Person"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Name"}
              required={true}
              name="responsiblePersonName"
              value={watch("responsiblePersonName")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Designation"}
              required={true}
              name="responsiblePersonDesignation"
              value={watch("responsiblePersonDesignation")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Phone"}
              type="tel"
              required={true}
              name="responsiblePersonPhone"
              value={watch("responsiblePersonPhone")}
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

            {errors.responsiblePersonPhone?.type === "required" && (
              <small style={{ color: "red" }}>Phone is required</small>
            )}
            {errors.responsiblePersonPhone?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at most 15 Number
              </small>
            )}
            {errors.responsiblePersonPhone?.type === "minLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at Least 7 Number
              </small>
            )}

            {errors.responsiblePersonPhone?.type === "format" && (
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
              name="responsiblePersonEmail"
              value={watch("responsiblePersonEmail")}
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
            {errors.responsiblePersonEmail?.type === "required" && (
              <small style={{ color: "red" }}>Email is required</small>
            )}

            {errors.responsiblePersonEmail?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Email should have at least Under 50 characters
              </small>
            )}

            {errors.responsiblePersonEmail?.type === "matchPattern" && (
              <small style={{ color: "red" }}>
                This must contain only Type Email
              </small>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Details Of HR And Compliance Responsible Person"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Name"}
              required={true}
              name="hrName"
              value={watch("hrName")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Designation"}
              required={true}
              name="hrDesignation"
              value={watch("hrDesignation")}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Phone"}
              type="tel"
              required={true}
              name="hrPhone"
              value={watch("hrPhone")}
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
            {errors.hrPhone?.type === "required" && (
              <small style={{ color: "red" }}>Phone is required</small>
            )}
            {errors.hrPhone?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at most 15 Number
              </small>
            )}
            {errors.hrPhone?.type === "minLength" && (
              <small style={{ color: "red" }}>
                The Phone should have at Least 7 Number
              </small>
            )}

            {errors.hrPhone?.type === "format" && (
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
              name="hrEmail"
              value={watch("hrEmail")}
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
            {errors?.hrEmail?.type === "required" && (
              <small style={{ color: "red" }}>Email is required</small>
            )}

            {errors?.hrEmail?.type === "maxLength" && (
              <small style={{ color: "red" }}>
                The Email should have at least Under 50 characters
              </small>
            )}

            {errors?.hrEmail?.type === "matchPattern" && (
              <small style={{ color: "red" }}>
                This must contain only Type Email
              </small>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StepOne;
