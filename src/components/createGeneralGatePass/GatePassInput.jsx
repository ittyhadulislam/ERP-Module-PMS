import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetCompanyQuery,
  useGetGatePassTypeQuery,
  useGetStatusQuery,
  useGetUnitQuery,
  useLazyGetDepartmentQuery,
  useLazyGetSectionQuery,
  useLazyGetStoreQuery,
} from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";
import { useDispatch, useSelector } from "react-redux";
import { setGeneralGatePass } from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassSlice";
import CustomDatePicker from "../inputs/CustomDatePicker";

const GatePassInput = () => {
  const dispatch = useDispatch();
  const {
    gatePassType,
    company,
    department,
    section,
    deliverTo,
    store,
    description,
    qty,
    unit,
    purpose,
    currierBy,
    mobileNo,
    deliveryAddress,
    orderBy,
    status,
    returnableDate,
    remarks,
    addTableData,
  } = useSelector((state) => state.createGatePass);

  // get getPass Data
  const { data: gatePassData, isLoading: gatePassLoading } =
    useGetGatePassTypeQuery();
  // get company
  const { data: companyData, isLoading: companyLoading } = useGetCompanyQuery();

  // get department
  const [
    getDepartment,
    { data: departmentData, isLoading: departmentLoading },
  ] = useLazyGetDepartmentQuery();

  // get section
  const [getSection, { data: sectionData, isLoading: sectionLoading }] =
    useLazyGetSectionQuery();
  // get store
  const [getStore, { data: storeData, isLoading: storeLoading }] =
    useLazyGetStoreQuery();
  // get unit
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery();
  // get status
  const { data: statusData, isLoading: statusLoading } = useGetStatusQuery();

  useEffect(() => {
    company && getDepartment(company?.nCompanyID);
    department && getSection(department?.nUserDept);
    company && getStore(company?.nCompanyID);
  }, [company, department]);

  // update values if exist
  useEffect(() => {
    if (addTableData?.length > 0) {
      const {
        gp_purpose,
        gp_for_whom,
        gp_carried,
        gp_st_id,
        gp_st_desc,
        gp_sent_to,
        gp_address,
        gp_remark,
        gp_contact,
        com_nm,
        com_id,
        dpt_id,
        dpt_nm,
        str_id,
        str_name,
        nSectionID,
        cSection_Description,
      } = addTableData[0];
      dispatch(
        setGeneralGatePass({
          key: "company",
          value: { nCompanyID: com_id, cCmpName: com_nm },
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "store",
          value: { storage_Sl: str_id, storage_Name: str_name },
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "deliverTo",
          value: gp_sent_to,
        })
      );

      dispatch(
        setGeneralGatePass({
          key: "department",
          value: { nUserDept: dpt_id, cDeptname: dpt_nm },
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "section",
          value: {
            nSectionID: nSectionID,
            cSection_Description: cSection_Description,
          },
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "purpose",
          value: gp_purpose,
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "deliveryAddress",
          value: gp_address,
        })
      );
      // dispatch(
      //   setGeneralGatePass({
      //     key: "description",
      //     value: gp_item_des,
      //   })
      // );
      dispatch(
        setGeneralGatePass({
          key: "status",
          value: {
            gp_st_id: gp_st_id,
            gp_st_desc: gp_st_desc,
          },
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "currierBy",
          value: gp_carried,
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "mobileNo",
          value: gp_contact.trim(),
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "orderBy",
          value: gp_for_whom,
        })
      );
      dispatch(
        setGeneralGatePass({
          key: "remarks",
          value: gp_remark,
        })
      );
    } else {
      dispatch(setGeneralGatePass({ key: "company", value: null }));
      dispatch(setGeneralGatePass({ key: "store", value: null }));
      dispatch(setGeneralGatePass({ key: "deliverTo", value: "" }));
      dispatch(setGeneralGatePass({ key: "department", value: null }));
      dispatch(setGeneralGatePass({ key: "section", value: null }));
      dispatch(setGeneralGatePass({ key: "purpose", value: "" }));
      dispatch(setGeneralGatePass({ key: "deliveryAddress", value: "" }));
      dispatch(setGeneralGatePass({ key: "status", value: null }));
      dispatch(setGeneralGatePass({ key: "currierBy", value: "" }));
      dispatch(setGeneralGatePass({ key: "mobileNo", value: "" }));
      dispatch(setGeneralGatePass({ key: "orderBy", value: "" }));
      dispatch(setGeneralGatePass({ key: "remarks", value: "" }));
    }
  }, [addTableData]);

  const disableAll = addTableData?.length > 0;

  return (
    <>
      <CustomAppBar title={"General Gate Pass Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Gate Pass Type"}
              name="gatePassType"
              options={gatePassData ?? []}
              value={gatePassType}
              optionLabel={"gpt_desc"}
              optionId={"gpt_id"}
              loading={gatePassLoading}
              setReduxState={setGeneralGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Company"}
              name="company"
              options={companyData ?? []}
              value={company}
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              loading={companyLoading}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Store"}
              name="store"
              options={company ? storeData ?? [] : []}
              value={store}
              optionLabel={"storage_Name"}
              optionId={"storage_Sl"}
              loading={storeLoading}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Deliver To"}
              name="deliverTo"
              value={deliverTo}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Department"}
              name="department"
              options={company ? departmentData ?? [] : []}
              value={department}
              optionLabel={"cDeptname"}
              optionId={"nUserDept"}
              loading={departmentLoading}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Section"}
              name="section"
              options={department ? sectionData ?? [] : []}
              value={section}
              optionLabel={"cSection_Description"}
              optionId={"nSectionID"}
              loading={sectionLoading}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Purpose"}
              name="purpose"
              value={purpose}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Delivery Address"}
              name="deliveryAddress"
              value={deliveryAddress}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Item Description"}
              name="description"
              multiline
              value={description}
              setReduxState={setGeneralGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Qty"}
              name="qty"
              type="number"
              value={qty}
              setReduxState={setGeneralGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Unit"}
              name="unit"
              options={unitData ?? []}
              value={unit}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              loading={unitLoading}
              setReduxState={setGeneralGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Status"}
              options={statusData ?? []}
              name="status"
              value={status}
              optionLabel={"gp_st_desc"}
              optionId={"gp_st_id"}
              loading={statusLoading}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          {status?.gp_st_desc === "Returnable" && (
            <Grid item xs={12} sm={6} md={3}>
              <CustomDatePicker
                label={"Returnable Date"}
                name="returnableDate"
                disablePast={true}
                value={returnableDate}
                setReduxState={setGeneralGatePass}
                required={true}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Curried By"}
              name="currierBy"
              value={currierBy}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Curried By Mobile No"}
              name="mobileNo"
              type="number"
              value={mobileNo}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Order By"}
              name="orderBy"
              value={orderBy}
              setReduxState={setGeneralGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Remarks"}
              name="remarks"
              value={remarks}
              setReduxState={setGeneralGatePass}
              disabled={disableAll}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default GatePassInput;
