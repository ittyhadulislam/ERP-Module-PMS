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

const EditItemDetails = ({
  selectedMainCategory,
  setSelectedMainCategory,
  register,
  setValue,
  selectedTableRow,
  watch,
  resetForm,
}) => {
  const [selectedMasterCategory, setSelectedMasterCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedConstruction, setSelectedConstruction] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedFinishing, setSelectedFinishing] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [searchColorValue, setSearchColorValue] = useState(
    selectedTableRow?.cColour
  );

  // debounce delay hook
  const debouncedSearchTerm = useDebounce(searchColorValue, 500);

  const { data, isLoading } = useGetMaterCategoryQuery(); //mater category query
  const { data: mainCategory, isLoading: isMainCategoryLoading } =
    useGetMainCategoryQuery(selectedTableRow?.nMasterCategory_ID); // main category query

  const { data: subCategory, isLoading: isSubCategoryLoading } =
    useGetSubCategoryQuery(selectedTableRow?.nMainCategory_ID); //sub category query
  const { data: constriction, isLoading: isConstrictionLoading } =
    useGetConstrictionQuery(selectedTableRow?.nMainCategory_ID); //constriction query
  const { data: dimension, isLoading: isDimensionLoading } =
    useGetDimensionQuery(selectedTableRow?.nMainCategory_ID); //dimension query
  const { data: finishing, isLoading: isFinishingLoading } =
    useGetFinishingQuery(selectedTableRow?.nMainCategory_ID); // finishing query
  const { data: unit, isLoading: isUnitLoading } = useGetUnitQuery(
    selectedTableRow?.cCode
  ); // unit query
  const { data: color, isLoading: isColorLoading } =
    useGetColorQuery(debouncedSearchTerm); //color query

  const handleChangeColor = (e) => {
    setSearchColorValue(e.target.value);
  };

  const master = data?.find(
    (e) => e?.nMasterCategory_ID === selectedTableRow?.nMasterCategory_ID
  );
  const main = mainCategory?.find(
    (e) => e?.nMainCategory_ID === selectedTableRow?.nMainCategory_ID
  );
  const sub = subCategory?.find((e) => e?.nItemcode == selectedTableRow?.cCode);
  const constrictions = constriction?.find(
    (e) => e?.nArtCode == selectedTableRow?.nArtCode
  );
  const dimen = dimension?.find((e) => e?.ndCode == selectedTableRow?.ndCode);
  const units = unit?.find((e) => e?.nUnitID == selectedTableRow?.nUnitID);
  const colors = color?.find((e) => e?.nColNo == selectedTableRow?.nColNo);

  const finish = finishing?.find((e) => e?.f_id == selectedTableRow?.finish_id);

  useEffect(() => {
    master && setSelectedMasterCategory(master);
    main && setSelectedMainCategory(main);
    sub && setSelectedSubCategory(sub);
    constrictions && setSelectedConstruction(constrictions);
    dimen && setSelectedDimension(dimen);
    finish && setSelectedFinishing(finish);
    units && setSelectedUnit(units);
    colors && setSelectedColor(colors);
  }, [
    selectedTableRow,
    master,
    main,
    sub,
    constriction,
    dimen,
    finish,
    unit,
    colors,
  ]);

  useEffect(() => {
    if (selectedTableRow) {
      setValue("lastSeasonPrice", selectedTableRow?.last_season_price);
      setValue("gmtQty", selectedTableRow?.gmt_ord_qty);
      setValue("itemOrderQty", selectedTableRow?.order_qty);
      setValue("targetPrice", selectedTableRow?.target_price);
      setSearchColorValue(selectedTableRow?.cColour);
    }
    if (!selectedTableRow && resetForm) {
      setValue("lastSeasonPrice", "");
      setValue("gmtQty", "");
      setValue("itemOrderQty", "");
      setValue("targetPrice", "");
      setSearchColorValue("");
      setSelectedMasterCategory(null);
      setSelectedMainCategory(null);
      setSelectedSubCategory(null);
      setSelectedConstruction(null);
      setSelectedDimension(null);
      setSelectedFinishing(null);
      setSelectedUnit(null);
      setSelectedColor(null);
    }
  }, [selectedTableRow, resetForm]);

  return (
    <Box sx={{ my: 1, p: 1, border: "1px dashed grey" }}>
      <CustomAppBar title={"Edit Item Details"} />
      <Grid container spacing={1} mt={"5px"}>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Master Category"}
            options={data ?? []}
            value={selectedMasterCategory}
            loading={isLoading}
            disabled={selectedTableRow && true}
            optionLabel={"cMasterCategory"}
            optionId={"nMasterCategory_ID"}
            setSelectedValue={setSelectedMasterCategory}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Main Category"}
            options={mainCategory ?? []}
            loading={isMainCategoryLoading}
            optionLabel={"cMainCategory"}
            optionId={"nMainCategory_ID"}
            setSelectedValue={setSelectedMainCategory}
            value={
              selectedMasterCategory === null ? null : selectedMainCategory
            }
            disabled={selectedTableRow && true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Sub Category"}
            options={selectedMainCategory === null ? [] : subCategory ?? []}
            loading={isSubCategoryLoading}
            optionLabel={"cItemDes"}
            optionId={"nItemcode"}
            setSelectedValue={setSelectedSubCategory}
            value={selectedMainCategory === null ? null : selectedSubCategory}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Constriction"}
            options={constriction ?? []}
            loading={isConstrictionLoading}
            optionLabel={"cArticle"}
            optionId={"nArtCode"}
            setSelectedValue={setSelectedConstruction}
            value={selectedMainCategory === null ? null : selectedConstruction}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Dimension"}
            options={dimension ?? []}
            loading={isDimensionLoading}
            optionLabel={"cDimen"}
            optionId={"ndCode"}
            setSelectedValue={setSelectedDimension}
            value={selectedMainCategory === null ? null : selectedDimension}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Finish"}
            options={finishing ?? []}
            loading={isFinishingLoading}
            optionLabel={"finish_type"}
            optionId={"f_id"}
            setSelectedValue={setSelectedFinishing}
            value={selectedMainCategory === null ? null : selectedFinishing}
          />
        </Grid>
      </Grid>

      {/* second line */}
      <Grid container spacing={1} my={1}>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Unit"}
            options={unit ?? []}
            loading={isUnitLoading}
            optionLabel={"cUnitDes"}
            optionId={"nUnitID"}
            setSelectedValue={setSelectedUnit}
            value={selectedSubCategory === null ? null : selectedUnit}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomAutocomplete
            setValue={setValue}
            label={"Color"}
            options={color ?? []}
            loading={isColorLoading}
            optionLabel={"cColour"}
            optionId={"nColNo"}
            setSelectedValue={setSelectedColor}
            handleChange={handleChangeColor}
            value={selectedColor}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomTextInput
            label={"Last Season Price"}
            name="lastSeasonPrice"
            register={register}
            type="number"
            value={watch("lastSeasonPrice")}
            setValue={setValue}
            // setStateValue={setLastSeasonPrice}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomTextInput
            label={"Target Price"}
            name="targetPrice"
            register={register}
            type="number"
            value={watch("targetPrice")}
            setValue={setValue}
            // setStateValue={setTargetPrice}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomTextInput
            label={"GMT Qty"}
            name="gmtQty"
            register={register}
            type="number"
            value={watch("gmtQty")}
            setValue={setValue}
            // setStateValue={setGmtQty}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CustomTextInput
            label={"Item Order Qty"}
            name="itemOrderQty"
            register={register}
            type="number"
            value={watch("itemOrderQty")}
            setValue={setValue}
            // setStateValue={setItemOrderQty}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditItemDetails;
