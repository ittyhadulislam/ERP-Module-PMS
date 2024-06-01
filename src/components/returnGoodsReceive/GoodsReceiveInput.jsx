import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import { Grid } from "@mui/material";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import CustomDatePicker from "../inputs/CustomDatePicker";
import {
  useGetReturnCategoryQuery,
  useLazyGetReturnGatePassQuery,
  useLazyGetReturnSectionQuery,
} from "../../redux/features/gatePass/returnGoodsReceive/returnGoodsReceiveQuery";
import { setReturnGoods } from "../../redux/features/gatePass/returnGoodsReceive/returnGoodsReceiveSlice";
import { useSelector } from "react-redux";

const GoodsReceiveInput = () => {
  const { userName, companyID } = useSelector((state) => state.auth.user);
  const { category, section, gatePass, receiveDate, challanNo } = useSelector(
    (state) => state.returnGoodsReceive
  );

  // get category data
  const { data: categoryData, isLoading: categoryLoading } =
    useGetReturnCategoryQuery(undefined, { refetchOnMountOrArgChange: true });
  // get section data
  const [getSection, { data: sectionData, isLoading: sectionLoading }] =
    useLazyGetReturnSectionQuery();
  // get Gate pass data
  const [getGatePass, { data: gatePassData, isLoading: gatePassLoading }] =
    useLazyGetReturnGatePassQuery();

  useEffect(() => {
    category && getSection({ id: companyID, category: category?.gp_type });
    section &&
      getGatePass({
        id: companyID,
        category: category?.gp_type,
        section: section?.nSectionID,
      });
  }, [category, section]);

  return (
    <>
      <CustomAppBar title={"General Gate Pass Details"} />
      <Box
        sx={{ p: 1, border: "1px dashed grey", borderTop: "none", mr: "1px" }}
      >
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Gate Pass Category"}
              name="category"
              options={categoryData ?? []}
              optionLabel={"gp_cate_desc"}
              value={category}
              optionId={"gp_type"}
              loading={categoryLoading}
              setReduxState={setReturnGoods}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"Section"}
              name="section"
              options={category ? sectionData ?? [] : []}
              value={section}
              optionLabel={"cSection_Description"}
              optionId={"nSectionID"}
              loading={sectionLoading}
              setReduxState={setReturnGoods}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomAutocomplete
              label={"C/Gate Pass No"}
              name="gatePass"
              options={section ? gatePassData ?? [] : []}
              value={gatePass}
              optionLabel={"gp_ref"}
              optionId={"gp_ref"}
              loading={gatePassLoading}
              setReduxState={setReturnGoods}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomDatePicker
              label="Receive Date"
              name="receiveDate"
              value={receiveDate}
              setReduxState={setReturnGoods}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextInput
              label={"Challan No"}
              name="challanNo"
              type="number"
              value={challanNo}
              setReduxState={setReturnGoods}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default GoodsReceiveInput;
