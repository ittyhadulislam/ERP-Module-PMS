import React, { useEffect } from "react";
import CustomTable from "../table/CustomTable";
import { useLazyGetB2bCancelQuery } from "../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import { useSelector } from "react-redux";
import { formateDate } from "../../utils/formateDate";

const CancelledLC = () => {
  const { company } = useSelector((state) => state.backToBackLC);
  // get cancel data
  const [getData, { data: cancelData, isLoading: cancelLoading }] =
    useLazyGetB2bCancelQuery();
  useEffect(() => {
    if (company) {
      getData(company?.company_ID);
    }
  }, [company]);

  const viewColumns = [
    // {
    //   field: "id",
    //   headerName: "Action",
    //   accessor: "action",
    //   align: "center",
    //   renderCell: (row) => {
    //     return (
    //       <Box>
    //         <LoadingButton
    //           variant="outlined"
    //           size="small"
    //           color="primary"
    //           title="EDIT"
    //           sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
    //           onClick={() => {
    //             handleClick(row?.row);
    //           }}
    //         >
    //           <BiEdit size={20} />
    //         </LoadingButton>
    //       </Box>
    //     );
    //   },
    //   minWidth: 50,
    //   maxWidth: 55,
    // },
    {
      field: "b2BLCNo",
      headerName: "BBLC #",
      minWidth: 70,
      flex: 1,
    },

    { field: "bblC_Amandment", headerName: "ADM", minWidth: 50, flex: 1 },
    // { field: "masterLCNo", headerName: "Master LC #", minWidth: 120, flex: 1 },
    {
      field: "masterLCNo",
      headerName: "Master LC #",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "opening_Date",
      headerName: "Opening Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "lastShipment_Date",
      headerName: "Last Shipment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "amendment_Date",
      headerName: "Amendment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "expire_Date",
      headerName: "Expiry Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "bank_Name",
      headerName: "Issuing Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "receivingBank",
      headerName: "Receiving Bank",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "b2BLC_Value",
      headerName: "BBLC Value",
      minWidth: 100,
      flex: 1,
    },
  ];
  const tableData = cancelData?.data?.map((e, i) => ({ ...e, id: i + 1 }));
  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={cancelLoading}
        height={tableData?.length > 0 ? "auto" : "280px"}
      />
    </>
  );
};

export default CancelledLC;
