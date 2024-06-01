import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomAutocomplete from "../inputs/CustomAutocomplete";
import CustomTextInput from "../inputs/CustomTextInput";
import {
  useGetColorQuery,
  useGetConstrictionQuery,
  useGetDimensionQuery,
  useGetFinishingQuery,
  useGetMainCategoryQuery,
  useGetMaterCategoryQuery,
  useGetSubCategoryQuery,
  useGetUnitQuery,
} from "../../redux/features/scm/priceComparison/queryPriceComparison";
import { useDebounce } from "../../hooks/useDebounce";
import { warningToast } from "../../common/toaster/toaster";
import { useDispatch, useSelector } from "react-redux";
import { setPriceComparison } from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { checkValidation } from "./priceComparison/numberValidation";

const ItemDetails = ({
  isSubCatCreate,
  isConstructionCreate,
  isDimensionCreate,
  isFinishCreate,
}) => {
  const dispatch = useDispatch();
  const {
    totalGmtQty,
    masterCategory,
    mainCategory,
    subCategory,
    constriction,
    dimension,
    finish,
    color,
    lastSeasonPrice,
    targetPrice,
    gmtQty,
    itemOrderQty,
    unit,
    isDisabled,
  } = useSelector((state) => state.priceComparison);

  const [searchColorValue, setSearchColorValue] = useState("");

  // debounce delay hook
  const debouncedSearchTerm = useDebounce(searchColorValue, 500);

  const { data, isLoading } = useGetMaterCategoryQuery(); //mater category query
  const { data: mainCategoryData, isLoading: isMainCategoryLoading } =
    useGetMainCategoryQuery(masterCategory?.nMasterCategory_ID); // main category query

  const {
    data: subCategoryData,
    isLoading: isSubCategoryLoading,
    refetch: reFetchSubCat,
  } = useGetSubCategoryQuery(mainCategory?.nMainCategory_ID); //sub category query
  const {
    data: constrictionData,
    isLoading: isConstrictionLoading,
    refetch: reFetchConstruction,
  } = useGetConstrictionQuery(mainCategory?.nMainCategory_ID); //constriction query
  const {
    data: dimensionData,
    isLoading: isDimensionLoading,
    refetch: reFetchDimension,
  } = useGetDimensionQuery(mainCategory?.nMainCategory_ID); //dimension query
  const {
    data: finishing,
    isLoading: isFinishingLoading,
    refetch: reFetchFinish,
  } = useGetFinishingQuery(mainCategory?.nMainCategory_ID); // finishing query
  const { data: unitData, isLoading: isUnitLoading } = useGetUnitQuery(); // unit query
  // const { data: unit, isLoading: isUnitLoading } = useGetUnitQuery(
  //   selectedSubCategory?.nItemcode
  // ); // unit query
  const { data: colorData, isLoading: isColorLoading } =
    useGetColorQuery(debouncedSearchTerm); //color query
  const handleChangeColor = (e) => {
    setSearchColorValue(e.target.value);
  };

  //validation and toast
  if (parseFloat(gmtQty) > totalGmtQty) {
    warningToast("GMT Quantity Cannot Exceed Total GMT Qty.");
    dispatch(setPriceComparison({ key: "gmtQty", value: "" }));
  }

  useEffect(() => {
    reFetchSubCat();
  }, [isSubCatCreate]);
  useEffect(() => {
    reFetchConstruction();
  }, [isConstructionCreate]);
  useEffect(() => {
    reFetchDimension();
  }, [isDimensionCreate]);
  useEffect(() => {
    reFetchFinish();
  }, [isFinishCreate]);

  return (
    <>
      <Box sx={{ mt: 1 }}></Box>
      <CustomAppBar title={"Item Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Master Category"}
              name="masterCategory"
              options={data ? data : []}
              value={masterCategory}
              loading={isLoading}
              optionLabel={"cMasterCategory"}
              optionId={"nMasterCategory_ID"}
              setReduxState={setPriceComparison}
              required={true}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Main Category"}
              name="mainCategory"
              options={masterCategory ? mainCategoryData ?? [] : []}
              loading={isMainCategoryLoading}
              optionLabel={"cMainCategory"}
              optionId={"nMainCategory_ID"}
              setReduxState={setPriceComparison}
              value={masterCategory ? mainCategory : null}
              required={true}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Sub Category"}
              name="subCategory"
              options={mainCategory ? subCategoryData ?? [] : []}
              loading={isSubCategoryLoading}
              optionLabel={"cItemDes"}
              optionId={"nItemcode"}
              setReduxState={setPriceComparison}
              value={mainCategory ? subCategory : null}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Constriction"}
              name="constriction"
              options={mainCategory ? constrictionData ?? [] : []}
              loading={isConstrictionLoading}
              optionLabel={"cArticle"}
              optionId={"nArtCode"}
              setReduxState={setPriceComparison}
              value={mainCategory ? constriction : null}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Dimension"}
              name="dimension"
              options={mainCategory ? dimensionData ?? [] : []}
              loading={isDimensionLoading}
              optionLabel={"cDimen"}
              optionId={"ndCode"}
              setReduxState={setPriceComparison}
              value={mainCategory ? dimension : null}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Finish"}
              name="finish"
              options={mainCategory ? finishing ?? [] : []}
              loading={isFinishingLoading}
              optionLabel={"finish_type"}
              optionId={"f_id"}
              setReduxState={setPriceComparison}
              value={mainCategory ? finish : null}
              required={true}
            />
          </Grid>
        </Grid>

        {/* second line */}
        <Grid container spacing={1} my={1}>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Color"}
              name="color"
              options={colorData ?? []}
              loading={isColorLoading}
              optionLabel={"cColour"}
              optionId={"nColNo"}
              setReduxState={setPriceComparison}
              handleChange={handleChangeColor}
              value={color}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Last Season Price"}
              type="number"
              name="lastSeasonPrice"
              value={lastSeasonPrice}
              setReduxState={setPriceComparison}
              required={true}
            />
            {checkValidation(lastSeasonPrice, 12, true)?.map((message, i) => (
              <small key={i} style={{ color: "red" }}>
                {message}
                <br />
              </small>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Target Price"}
              name="targetPrice"
              type="number"
              value={targetPrice}
              setReduxState={setPriceComparison}
              required={true}
            />
            {checkValidation(targetPrice, 12)?.map((message, i) => (
              <small key={i} style={{ color: "red" }}>
                {message}
                <br />
              </small>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"GMT Qty"}
              name="gmtQty"
              type="number"
              value={gmtQty}
              setReduxState={setPriceComparison}
              required={true}
            />
            {checkValidation(gmtQty, 6)?.map((message, i) => (
              <small key={i} style={{ color: "red" }}>
                {message}
                <br />
              </small>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Item Order Qty"}
              name="itemOrderQty"
              type="number"
              value={itemOrderQty}
              setReduxState={setPriceComparison}
              required={true}
            />
            {checkValidation(itemOrderQty, 6)?.map((message, i) => (
              <small key={i} style={{ color: "red" }}>
                {message}
                <br />
              </small>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Unit"}
              name="unit"
              options={unitData ?? []}
              loading={isUnitLoading}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              setReduxState={setPriceComparison}
              value={unit}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ItemDetails;
