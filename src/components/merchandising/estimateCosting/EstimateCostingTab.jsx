import { Box, Grid } from "@mui/material";
import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";

const EstimateCostingTab = () => {
  const viewColumns = [
    { field: "com_nm", headerName: "master category", minWidth: 60, flex: 1 },
    { field: "dpt_nm", headerName: "total value", minWidth: 100, flex: 1 },
  ];
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={5}>
        <CustomAppBar title={"Base on estimate bom"} />

        <CustomTable
          columns={viewColumns}
          rows={[]?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
          // loading={addViewLoading}
          height={[]?.length > 0 ? "auto" : "135px"}
          checkboxSelection
          toolBar={false}
          search={false}
          hideFooter={true}
          overlay={false}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Box sx={{ p: 1, border: "1px dashed grey", mt: 0.5 }}>
          <Grid container spacing={1} mt={"0px"}>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"Row material($/Doz)"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"Washing($/Doz)"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"SMV"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"Embroidery($/Doz)"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"Third party Test($/Doz)"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"Printing($/Doz)"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"Freight($/Doz)"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInputSmall label={"In-House Test($/Doz)"} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EstimateCostingTab;
