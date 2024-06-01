import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import {
  useGetMainCategoryWithoutMasterQuery,
  useGetSubCategoryViewQuery,
  useGetUnitPriceComparisonQuery,
} from "../../../redux/features/scm/priceComparison/queryPriceComparison";
import { useSaveSubCategoryMutation } from "../../../redux/features/scm/priceComparison/mutationPriceComparison";
import { useSelector } from "react-redux";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import { successToast } from "../../../common/toaster/toaster";

const MainCategory = ({ setIsSubCatCreate }) => {
  const { user } = useSelector((state) => state.auth);
  const [mainCategory, setMainCategory] = useState(null);
  const [unit, setUnit] = useState(null);
  const [subCat, setSubCat] = useState("");

  //   query
  const { data: mainCategoryData, isLoading: isMainCategoryLoading } =
    useGetMainCategoryWithoutMasterQuery();
  const { data: unitData, isLoading: isUnitLoading } =
    useGetUnitPriceComparisonQuery();
  const {
    data: viewData,
    isLoading: isViewLoading,
    refetch,
  } = useGetSubCategoryViewQuery(
    mainCategory && mainCategory?.nMainCategory_ID
  );
  // mutation
  const [saveSubCategory, { data: saveData, isSuccess: isSaveSuccess }] =
    useSaveSubCategoryMutation();

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      subcategory: subCat,
      maincategory: mainCategory?.nMainCategory_ID,
      userName: user?.userName,
      unit: unit?.nUnitID,
    };

    saveSubCategory(payload);
  };

  useEffect(() => {
    if (isSaveSuccess) {
      setSubCat("");
      setUnit(null);
      successToast(saveData?.message);
      refetch();
      setIsSubCatCreate((prev) => !prev);
    }
  }, [isSaveSuccess]);
  useEffect(() => {
    refetch();
  }, [mainCategory]);

  const columns = [
    { field: "cMainCategory", headerName: "Main Category", minWidth: 280 },
    {
      field: "cDes",
      headerName: "Sub Category",
      minWidth: 250,
    },
    { field: "cUnitCode", headerName: "Unit", minWidth: 200 },
    { field: "cEntUser", headerName: "created by", minWidth: 200 },
    {
      field: "dEndDate",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),

      //   minWidth: 120,
      minWidth: 200,
    },
  ];

  const rows = viewData?.map((row, i) => ({ ...row, id: i }));

  return (
    <>
      <form onSubmit={handleSave}>
        <Grid container spacing={1} my={1}>
          <Grid item xs={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Main Category"}
              options={mainCategoryData ?? []}
              loading={isMainCategoryLoading}
              optionLabel={"cMainCategory"}
              optionId={"nMainCategory_ID"}
              setSelectedValue={setMainCategory}
              // handleChange={handleChangeColor}
              value={mainCategory}
              required={true}
            />
          </Grid>

          <Grid item xs={4}>
            <CustomTextInput
              label={"Sub Category"}
              required={true}
              value={subCat}
              setStateValue={setSubCat}
              // name="targetPrice"
              // register={register}
              // type="number"
              // value={watch("targetPrice")}
              // setValue={setValue}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomAutocomplete
              // setValue={setValue}
              label={"Unit"}
              options={unitData ?? []}
              loading={isUnitLoading}
              optionLabel={"cUnitDes"}
              optionId={"nUnitID"}
              setSelectedValue={setUnit}
              // handleChange={handleChangeColor}
              value={unit}
              required={true}
            />
          </Grid>
        </Grid>

        <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={1}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>
            <span>
              <SubmitButton
                title={"Save"}
                type="submit"
                // handleClick={}
                // handleClick={() =>
                //   completePriceComparison({
                //     completedby: user?.userName,
                //   })
                // }
              />
              {/* <AddButton title={"Add"} /> */}
            </span>
          </Stack>
        </Box>
      </form>
      <CustomTable columns={columns} rows={rows} loading={isViewLoading} />
    </>
  );
};

export default MainCategory;
