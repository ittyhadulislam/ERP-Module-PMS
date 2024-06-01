import React from "react";
import CustomTable from "../../table/CustomTable";
import ActionButton from "./ActionButton";
import { Box, Grid } from "@mui/material";
import CustomAppBar from "../../common/CustomAppBar";

const SpecialOperation = () => {
  const viewColumns = [
    { field: "com_nm", headerName: "Code", minWidth: 60, flex: 1 },
    { field: "dpt_nm", headerName: "Description", minWidth: 100, flex: 1 },
  ];
  return (
    <Grid container spacing={1}>
      <Grid item sx={12} sm={6} mt={0.5} width={"100%"}>
        <CustomAppBar title={"special operation"} />

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
      <Grid item sx={12} sm={6} mt={0.5}>
        {/* action button */}
        <ActionButton />
      </Grid>
    </Grid>
  );
};

export default SpecialOperation;
