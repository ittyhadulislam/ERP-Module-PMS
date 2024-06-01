import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAutocomplete from "../../inputs/CustomAutocomplete";
import CustomTextInput from "../../inputs/CustomTextInput";
import SubmitButton from "../../buttons/SubmitButton";
import {
  useGetConstructionViewQuery,
  useGetMainCategoryWithoutMasterQuery,
} from "../../../redux/features/scm/priceComparison/queryPriceComparison";
import { useSaveConstructionMutation } from "../../../redux/features/scm/priceComparison/mutationPriceComparison";
import { useSelector } from "react-redux";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import { successToast } from "../../../common/toaster/toaster";

const Construction = ({ setIsConstructionCreate }) => {
  const { user } = useSelector((state) => state.auth);
  const [mainCategory, setMainCategory] = useState(null);

  const [construction, setConstruction] = useState("");

  //   query
  const { data: mainCategoryData, isLoading: isMainCategoryLoading } =
    useGetMainCategoryWithoutMasterQuery();

  const {
    data: viewData,
    isLoading: isViewLoading,
    refetch,
  } = useGetConstructionViewQuery(
    mainCategory && mainCategory?.nMainCategory_ID
  );
  // mutation
  const [saveConstruction, { data: saveData, isSuccess: isSaveSuccess }] =
    useSaveConstructionMutation();

  useEffect(() => {
    if (isSaveSuccess) {
      setConstruction("");
      successToast(saveData?.message);
      refetch();
      setIsConstructionCreate((prev) => !prev);
    }
  }, [isSaveSuccess]);
  useEffect(() => {
    refetch();
  }, [mainCategory]);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      construction: construction,
      maincategory: mainCategory?.cMainCategory,
      maincategoryID: mainCategory?.nMainCategory_ID,
      userName: user?.userName,
    };
    saveConstruction(payload);
  };

  const columns = [
    { field: "cMainCategory", headerName: "Main Category", minWidth: 300 },
    {
      field: "cArticle",
      headerName: "construction",
      minWidth: 300,
    },
    // { field: "cUnitCode", headerName: "Unit", flex: 1 },
    { field: "created_user", headerName: "created by", minWidth: 300 },
    {
      field: "dEntDate",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 200,
    },
  ];

  const rows = viewData?.map((row, i) => ({ ...row, id: i }));

  return (
    <>
      <form onSubmit={handleSave}>
        <Grid container spacing={1} my={1}>
          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <CustomTextInput
              label={"Construction"}
              required={true}
              value={construction}
              setStateValue={setConstruction}
              // name="targetPrice"
              // register={register}
              // type="number"
              // value={watch("targetPrice")}
              // setValue={setValue}
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
                // handleClick={handleSave}
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

export default Construction;
