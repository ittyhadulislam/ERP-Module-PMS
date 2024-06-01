import React, { useEffect } from "react";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import { useLazyGetEditAndViewLcQuery } from "../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { BiEdit } from "react-icons/bi";
import { setBackToBack } from "../../redux/features/commercial/backToBackLC/backToBackLcSlice";
const EditAndViewLC = ({ setGoToTab }) => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.backToBackLC);
  const [getData, { data, isLoading }] = useLazyGetEditAndViewLcQuery();
  useEffect(() => {
    if (company) {
      getData(company.company_ID);
    }
  }, [company]);

  // handleClick fn
  const handleClick = (row) => {
    setGoToTab(0);
    dispatch(
      setBackToBack({
        key: "backToBackLC",
        value: row?.b2BLCNo,
      })
    );
  };
  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                handleClick(row?.row);
              }}
            >
              <BiEdit size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 50,
      maxWidth: 55,
    },
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

    {
      field: "create_user",
      headerName: "created by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "create_Date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "edit_user",
      headerName: "Edited by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "edit_udate",
      headerName: "Edited date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "amd_user",
      headerName: "AMD by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "amd_udate",
      headerName: "AMD date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
  ];
  const tableData = data?.data?.map((e, i) => ({ ...e, id: i + 1 }));

  return (
    <>
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={isLoading}
        height={tableData?.length > 0 ? "auto" : "280px"}
      />
    </>
  );
};

export default EditAndViewLC;
