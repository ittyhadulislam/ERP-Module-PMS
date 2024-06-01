import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import CustomDatePicker from "../../inputs/CustomDatePicker";
import {
  useGetCostingOrderInfoByNameQuery,
  useGetCostingOrderInfoQuery,
} from "../../../redux/features/weaving/costing/queryCosting";
import { setCostingState } from "../../../redux/features/weaving/costing/costingSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";
import CustomAutocompleteSmall from "../../merchandisingUI/CustomAutocompleteSmall";
import CustomDatePickerSmall from "../../merchandisingUI/CustomDatePickerSmall";

const OrderInfo = () => {
  const dispatch = useDispatch();
  const { orderNo } = useSelector((state) => state.costing);
  const { data, isLoading } = useGetCostingOrderInfoQuery();
  const { data: orderInfoData } = useGetCostingOrderInfoByNameQuery(
    orderNo?.or_style_no,
    { refetchOnMountOrArgChange: true }
  );

  const {
    customer_name,
    buyer_name,
    or_gmt_name,
    fd_design,
    fcom_composition,
    fc_construction,
    finishedDia,
    fabric_color,
    gsm_description,
    fabricQty,
    unit_name,
    or_rcvd_date,
    ordt_desc,
  } = (orderInfoData && orderInfoData[0]) || {};
  // console.log(orderInfoData);

  useEffect(() => {
    if (orderInfoData && orderInfoData.length > 0) {
      dispatch(setCostingState({ key: "orderInfo", value: orderInfoData[0] }));
    }
  }, [orderInfoData]);
  return (
    <>
      <CustomAppBar title={"Order info"} />
      <Box
        sx={{
          p: 1,
          border: "1px dashed grey",
          mr: "1px",
          //   mt: 1.5,
          borderTop: 0,
          position: "relative",
        }}
      >
        {/* <FieldSet text={"order information"} /> */}
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={4} md={3}>
            <CustomAutocompleteSmall
              label={"Order No"}
              name="orderNo"
              optionId={"or_style_no"}
              optionLabel={"or_style_no"}
              value={orderNo}
              setReduxState={setCostingState}
              options={data ?? []}
              loading={isLoading}
              required
              //   disabled={isDisabled}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Order Type"}
              value={orderNo ? ordt_desc : ""}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Customer Name"}
              value={orderNo ? customer_name : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Buyer"}
              value={orderNo ? buyer_name : ""}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"GMT Name"}
              value={orderNo ? or_gmt_name : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Design"}
              value={orderNo ? fd_design : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Fabric Composition"}
              value={orderNo ? fcom_composition : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Fabric Construction"}
              value={orderNo ? fc_construction : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Finished Dia"}
              value={orderNo ? finishedDia : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={1.5}>
            <CustomTextInputSmall
              label={"Fabric Color"}
              value={orderNo ? fabric_color : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={1.5}>
            <CustomTextInputSmall
              label={"GSM"}
              value={orderNo ? gsm_description : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <CustomTextInputSmall
              label={"Total Fabric Qty"}
              value={orderNo ? fabricQty : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={1.5}>
            <CustomTextInputSmall
              label={"Unit"}
              value={orderNo ? unit_name : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} md={1.5}>
            <CustomDatePickerSmall
              label={"Received date"}
              value={orderNo ? or_rcvd_date : null}
              disabled
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderInfo;
