import React from "react";
import CustomTable from "../../table/CustomTable";
import { Grid } from "@mui/material";
import CustomAppBar from "../../common/CustomAppBar";

const DeliveryInformation = () => {
  const columns = [
    // {
    //   field: "id",
    //   headerName: "Delete",
    //   accessor: "Delete",
    //   align: "center",
    //   renderCell: (row) => {
    //     return (
    //       <Box>
    //         <LoadingButton
    //           variant="outlined"
    //           size="small"
    //           color="error"
    //           title="DELETE"
    //           sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
    //           onClick={() => {
    //             deleteMerchantGatePass(row?.row?.gp_id);
    //             // setSelectedMainCategory(row.original.nMainCategory_ID);
    //           }}
    //           loading={deleteLoading}
    //         >
    //           <MdOutlineDelete size={20} />
    //         </LoadingButton>
    //       </Box>
    //     );
    //   },
    //   minWidth: 60,
    //   maxWidth: 60,
    //   flex: 1,
    // },

    { field: "com_nm", headerName: "Lot", minWidth: 60, flex: 1 },
    { field: "dpt_nm", headerName: "PO No", minWidth: 60, flex: 1 },
    {
      field: "cSection_Description",
      headerName: "Total Qty",
      minWidth: 80,
      flex: 1,
    },
    { field: "gp_buyer", headerName: "Ship Mode", minWidth: 80, flex: 1 },
    { field: "gp_style", headerName: "BPCD", minWidth: 100, flex: 1 },
    {
      field: "gp_item_des",
      headerName: "FOB Date",
      minWidth: 100,
      flex: 1,
    },
    { field: "gp_qty", headerName: "X-Fty Date", minWidth: 70, flex: 1 },
    { field: "unit_nm", headerName: "U.Price", minWidth: 60, flex: 1 },
    { field: "gp_purpose", headerName: "CM", minWidth: 60, flex: 1 },
  ];

  return (
    <>
      <CustomAppBar title={"Delivery Information"} />
      <CustomTable
        columns={columns}
        rows={[]?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        // loading={addViewLoading}
        height={[]?.length > 0 ? "auto" : "250px"}
        hideFooter
        toolbarOptions={{ filter: true }}
      />
    </>
  );
};

export default DeliveryInformation;
