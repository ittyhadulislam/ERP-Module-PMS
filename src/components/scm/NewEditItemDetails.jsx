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
import { setPriceComparison } from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { checkValidation } from "./priceComparison/numberValidation";
import { useDispatch, useSelector } from "react-redux";

const NewEditItemDetails = () => {
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
    selectedTableRow,
  } = useSelector((state) => state.priceComparison);
  const [searchColorValue, setSearchColorValue] = useState(
    selectedTableRow?.cColour
  );
  const debouncedSearchTerm = useDebounce(searchColorValue, 500);
  //get master
  const { data: masterData, isLoading: isMasterLoading } =
    useGetMaterCategoryQuery();
  //get main
  const { data: mainData, isLoading: isMainLoading } = useGetMainCategoryQuery(
    masterCategory?.nMasterCategory_ID,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  //get sub category
  const { data: subCatData, isLoading: isSubCatLoading } =
    useGetSubCategoryQuery(mainCategory?.nMainCategory_ID, {
      refetchOnMountOrArgChange: true,
    });

  //get construction
  const { data: constrictionData, isLoading: isConstrictionLoading } =
    useGetConstrictionQuery(mainCategory?.nMainCategory_ID, {
      refetchOnMountOrArgChange: true,
    });
  //get dimension
  const { data: dimensionData, isLoading: isDimensionLoading } =
    useGetDimensionQuery(mainCategory?.nMainCategory_ID, {
      refetchOnMountOrArgChange: true,
    });
  //get finish
  const { data: finishData, isLoading: isFinishingLoading } =
    useGetFinishingQuery(mainCategory?.nMainCategory_ID, {
      refetchOnMountOrArgChange: true,
    });
  // get unit
  const { data: unitData, isLoading: isUnitLoading } = useGetUnitQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  // const { data: unitData, isLoading: isUnitLoading } = useGetUnitQuery(
  //   sub?.nItemcode,
  //   { refetchOnMountOrArgChange: true }
  // );
  //   get color
  const { data: colorData, isLoading: isColorLoading } =
    useGetColorQuery(debouncedSearchTerm);

  const prevMaster = masterData?.find(
    (e) => e?.nMasterCategory_ID === selectedTableRow?.nMasterCategory_ID
  );
  const prevFinish = finishData?.find(
    (e) => e?.f_id == selectedTableRow?.finish_id
  );

  useEffect(() => {
    if (selectedTableRow) {
      const {
        nMainCategory_ID,
        cMainCategory,
        cCode,
        cDes,
        nArtCode,
        cArticle,
        ndCode,
        cDimen,
        nColNo,
        cColour,
        nUnitID,
        cUnitDes,
        last_season_price,
        target_price,
        gmt_ord_qty,
        order_qty,
      } = selectedTableRow;
      dispatch(
        setPriceComparison({ key: "masterCategory", value: prevMaster })
      );
      dispatch(
        setPriceComparison({
          key: "mainCategory",
          value: { nMainCategory_ID, cMainCategory },
        })
      );
      dispatch(
        setPriceComparison({
          key: "subCategory",
          value: {
            nItemcode: cCode,
            cItemDes: cDes,
          },
        })
      );
      dispatch(
        setPriceComparison({
          key: "constriction",
          value: { nArtCode, cArticle },
        })
      );
      dispatch(
        setPriceComparison({
          key: "dimension",
          value: { ndCode, cDimen },
        })
      );
      dispatch(setPriceComparison({ key: "finish", value: prevFinish }));
      dispatch(
        setPriceComparison({
          key: "color",
          value: { nColNo, cColour },
        })
      );
      dispatch(
        setPriceComparison({
          key: "unit",
          value: { nUnitID, cUnitDes },
        })
      );
      dispatch(
        setPriceComparison({
          key: "lastSeasonPrice",
          value: last_season_price ?? "",
        })
      );
      dispatch(
        setPriceComparison({
          key: "targetPrice",
          value: target_price ?? "",
        })
      );
      dispatch(
        setPriceComparison({
          key: "gmtQty",
          value: gmt_ord_qty ?? "",
        })
      );
      dispatch(
        setPriceComparison({
          key: "itemOrderQty",
          value: order_qty ?? "",
        })
      );
    }
  }, [selectedTableRow, prevMaster, prevFinish]);

  // check validation
  if (parseFloat(gmtQty) > totalGmtQty && !totalGmtQty === "") {
    warningToast("GMT Quantity Cannot Exceed Total GMT Qty.");
    dispatch(
      setPriceComparison({
        key: "gmtQty",
        value: "",
      })
    );
  }

  return (
    <>
      <Box sx={{ mt: 1 }}></Box>

      <CustomAppBar title={"Edit Item Details"} />
      <Box sx={{ p: 1, border: "1px dashed grey", borderTop: "none" }}>
        <Grid container spacing={1} mt={"5px"}>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Master Category"}
              name="masterCategory"
              options={masterData ?? []}
              value={masterCategory}
              loading={isMasterLoading}
              disabled={true}
              optionLabel={"cMasterCategory"}
              optionId={"nMasterCategory_ID"}
              setReduxState={setPriceComparison}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Main Category"}
              name="mainCategory"
              options={masterCategory ? mainData ?? [] : []}
              loading={isMainLoading}
              optionLabel={"cMainCategory"}
              optionId={"nMainCategory_ID"}
              setReduxState={setPriceComparison}
              value={mainCategory}
              required={true}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Sub Category"}
              name="subCategory"
              options={mainCategory ? subCatData ?? [] : []}
              loading={isSubCatLoading}
              optionLabel={"cItemDes"}
              optionId={"nItemcode"}
              setReduxState={setPriceComparison}
              value={subCategory}
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
              value={constriction}
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
              value={dimension}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomAutocomplete
              label={"Finish"}
              name="finish"
              options={mainCategory ? finishData ?? [] : []}
              loading={isFinishingLoading}
              optionLabel={"finish_type"}
              optionId={"f_id"}
              setReduxState={setPriceComparison}
              value={finish}
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
              handleChange={(e) => {
                setSearchColorValue(e.target.value);
              }}
              value={color}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <CustomTextInput
              label={"Last Season Price"}
              name="lastSeasonPrice"
              type="number"
              value={lastSeasonPrice}
              setReduxState={setPriceComparison}
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

export default NewEditItemDetails;
