import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetCompanyQuery,
  useGetStatusQuery,
  useGetUnitQuery,
  useLazyGetDepartmentQuery,
  useLazyGetSectionQuery,
} from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";
import { useDispatch, useSelector } from "react-redux";
import { setMerchantGatePass } from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassSlice";
import {
  useGetBuyerQuery,
  useGetDeliverToQuery,
  useGetItemQuery,
  useLazyGetStyleQuery,
} from "../../redux/features/gatePass/createMerchantGatePass/createMerchantGatePassQuery";
import CustomDatePicker from "../inputs/CustomDatePicker";

const GatePassInput = () => {
  const dispatch = useDispatch();
  const {
    company,
    buyer,
    style,
    itemType,
    department,
    section,
    deliverTo,
    unit,
    status,
    returnableDate,
    itemDescription,
    deliveryAddress,
    garmentsType,
    qty,
    attention,
    orderBy,
    attMobileNo,
    ordMobileNo,
    currierBy,
    mobileNo,
    remarks,
    addTableData,
  } = useSelector((state) => state.merchantGatePass);

  // get company
  const { data: companyData, isLoading: companyLoading } = useGetCompanyQuery();
  // get buyer
  const { data: buyerData, isLoading: buyerLoading } = useGetBuyerQuery();
  // get style
  const [getStyle, { data: styleData, isLoading: styleLoading }] =
    useLazyGetStyleQuery();
  // get item type
  const { data: itemData, isLoading: itemLoading } = useGetItemQuery();
  // get Deliver To
  const { data: deliverData, isLoading: deliverLoading } =
    useGetDeliverToQuery();

  // get department
  const [
    getDepartment,
    { data: departmentData, isLoading: departmentLoading },
  ] = useLazyGetDepartmentQuery();
  // get section
  const [getSection, { data: sectionData, isLoading: sectionLoading }] =
    useLazyGetSectionQuery();
  // get unit
  const { data: unitData, isLoading: unitLoading } = useGetUnitQuery();
  // get status
  const { data: statusData, isLoading: statusLoading } = useGetStatusQuery();

  useEffect(() => {
    company && getDepartment(company?.nCompanyID);
    department && getSection(department?.nUserDept);
    if (buyer) getStyle(buyer?.nBuyer_ID);
  }, [buyer, company, department]);

  // update redux values if exist
  useEffect(() => {
    if (addTableData?.length > 0) {
      const {
        gp_for_whom,
        gp_carried,
        gp_st_id,
        gp_st_desc,
        gp_deliverytoID,
        gp_sent_to,
        gp_address,
        gp_remark,
        gp_contact,
        com_nm,
        com_id,
        dpt_id,
        dpt_nm,
        nSectionID,
        cSection_Description,
        gp_attention,
        gp_atten_mobile,
        gp_order_by_mobile,
      } = addTableData[0];
      dispatch(
        setMerchantGatePass({
          key: "company",
          value: { nCompanyID: com_id, cCmpName: com_nm },
        })
      );

      dispatch(
        setMerchantGatePass({
          key: "deliverTo",
          value: {
            gpd_id: gp_deliverytoID,
            gpd_company: gp_sent_to,
            gpd_address: gp_address,
          },
        })
      );

      dispatch(
        setMerchantGatePass({
          key: "department",
          value: { nUserDept: dpt_id, cDeptname: dpt_nm },
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "deliveryAddress",
          value: gp_address,
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "section",
          value: {
            nSectionID: nSectionID,
            cSection_Description: cSection_Description,
          },
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "attention",
          value: gp_attention,
        })
      );

      dispatch(
        setMerchantGatePass({
          key: "orderBy",
          value: gp_for_whom,
        })
      );
      // dispatch(
      //   setMerchantGatePass({
      //     key: "description",
      //     value: gp_item_des,
      //   })
      // );
      dispatch(
        setMerchantGatePass({
          key: "status",
          value: {
            gp_st_id: gp_st_id,
            gp_st_desc: gp_st_desc,
          },
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "attMobileNo",
          value: gp_atten_mobile?.trim(),
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "ordMobileNo",
          value: gp_order_by_mobile?.trim(),
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "currierBy",
          value: gp_carried,
        })
      );
      dispatch(
        setMerchantGatePass({
          key: "mobileNo",
          value: gp_contact.trim(),
        })
      );

      dispatch(
        setMerchantGatePass({
          key: "remarks",
          value: gp_remark,
        })
      );
    } else {
      dispatch(setMerchantGatePass({ key: "company", value: null }));
      dispatch(setMerchantGatePass({ key: "buyer", value: null }));
      dispatch(setMerchantGatePass({ key: "style", value: null }));
      dispatch(setMerchantGatePass({ key: "garmentsType", value: "" }));
      dispatch(setMerchantGatePass({ key: "deliverTo", value: null }));
      dispatch(setMerchantGatePass({ key: "department", value: null }));
      dispatch(setMerchantGatePass({ key: "deliveryAddress", value: "" }));
      dispatch(setMerchantGatePass({ key: "section", value: null }));
      dispatch(setMerchantGatePass({ key: "attention", value: "" }));
      dispatch(setMerchantGatePass({ key: "orderBy", value: "" }));
      dispatch(setMerchantGatePass({ key: "status", value: null }));
      dispatch(setMerchantGatePass({ key: "attMobileNo", value: "" }));
      dispatch(setMerchantGatePass({ key: "ordMobileNo", value: "" }));
      dispatch(setMerchantGatePass({ key: "currierBy", value: "" }));
      dispatch(setMerchantGatePass({ key: "mobileNo", value: "" }));
      dispatch(setMerchantGatePass({ key: "remarks", value: "" }));
    }
  }, [addTableData]);

  useEffect(() => {
    if (deliverTo) {
      dispatch(
        setMerchantGatePass({
          key: "deliveryAddress",
          value: deliverTo?.gpd_address,
        })
      );
      // dispatch(
      //   setMerchantGatePass({
      //     key: "attMobileNo",
      //     value: deliverTo?.gpd_mobile?.trim(),
      //   })
      // );
    } else {
      dispatch(setMerchantGatePass({ key: "deliveryAddress", value: "" }));
      // dispatch(setMerchantGatePass({ key: "attMobileNo", value: "" }));
    }
    if (style) {
      dispatch(
        setMerchantGatePass({
          key: "garmentsType",
          value: style?.cGmetDis,
        })
      );
    } else {
      dispatch(
        setMerchantGatePass({
          key: "garmentsType",
          value: "",
        })
      );
    }
  }, [deliverTo, style]);

  const disableAll = addTableData?.length > 0;

  return (
    <>
      <CustomAppBar title={"Merchant Gate Pass Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Company"}
              name="company"
              options={companyData ?? []}
              value={company}
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              loading={companyLoading}
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Buyer"}
              name="buyer"
              options={buyerData ?? []}
              value={buyer}
              optionLabel={"cBuyer_Name"}
              optionId={"nBuyer_ID"}
              loading={buyerLoading}
              setReduxState={setMerchantGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              //   setValue={setValue}
              label={"Item Type"}
              name="itemType"
              options={itemData ?? []}
              value={itemType}
              optionLabel={"gp_description"}
              optionId={"gp_id"}
              loading={itemLoading}
              setReduxState={setMerchantGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Deliver To"}
              name="deliverTo"
              options={deliverData ?? []}
              value={deliverTo}
              optionLabel={"gpd_company"}
              optionId={"gpd_id"}
              loading={deliverLoading}
              setReduxState={setMerchantGatePass}
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
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Style"}
              name="style"
              options={styleData ?? []}
              value={style}
              optionLabel={"cStyleNo"}
              optionId={"nStyleID"}
              loading={styleLoading}
              setReduxState={setMerchantGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Item Description(PO/Color/Size)"}
              value={itemDescription}
              name="itemDescription"
              multiline
              setReduxState={setMerchantGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Delivery Address"}
              value={deliveryAddress}
              name="deliveryAddress"
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomAutocomplete
              label={"Section"}
              name="section"
              options={department ? sectionData ?? [] : []}
              value={section}
              optionLabel={"cSection_Description"}
              optionId={"nSectionID"}
              loading={sectionLoading}
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Garments Type"}
              value={garmentsType}
              name="garmentsType"
              setReduxState={setMerchantGatePass}
              required={true}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomTextInput
              label={"Qty"}
              name="qty"
              type="number"
              value={qty}
              setReduxState={setMerchantGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <CustomAutocomplete
              label={"Unit"}
              name="unit"
              options={unitData ?? []}
              value={unit}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              loading={unitLoading}
              setReduxState={setMerchantGatePass}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Attention"}
              value={attention}
              name="attention"
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Order By"}
              value={orderBy}
              name="orderBy"
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
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
              setReduxState={setMerchantGatePass}
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
                setReduxState={setMerchantGatePass}
                required={true}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Att: Mobile No"}
              name="attMobileNo"
              type="number"
              value={attMobileNo}
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Ord: Mobile No"}
              name="ordMobileNo"
              type="number"
              value={ordMobileNo}
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Carried By"}
              value={currierBy}
              name="currierBy"
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Mobile/AWB Number"}
              name="mobileNo"
              type="number"
              value={mobileNo}
              setReduxState={setMerchantGatePass}
              required={true}
              disabled={disableAll}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <CustomTextInput
              label={"Remarks"}
              value={remarks}
              name="remarks"
              setReduxState={setMerchantGatePass}
              disabled={disableAll}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default GatePassInput;
