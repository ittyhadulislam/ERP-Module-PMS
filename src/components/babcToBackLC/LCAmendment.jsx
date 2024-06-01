import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import {
  useLazyGetAllAmendmentDataQuery,
  useLazyGetAmendmentDetailsQuery,
} from "../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import { useSelector } from "react-redux";
import { formateDate } from "../../utils/formateDate";
import { Box } from "@mui/system";
import { FaEye } from "react-icons/fa";
import { errorToast } from "../../common/toaster/toaster";
import CustomModal from "../common/CustomModal";
import AmendmentModal from "./AmendmentModal";

const LCAmendment = () => {
  const { backToBackLC, company } = useSelector((state) => state.backToBackLC);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [getData, { data, isLoading }] = useLazyGetAllAmendmentDataQuery();
  useEffect(() => {
    if (company && backToBackLC) {
      getData({ bblc: backToBackLC, company: company.company_ID });
    }
  }, [company]);
  // amendment view api call
  const [
    getViewData,
    { data: viewData, isSuccess: viewSuccess, isLoading: viewLoading, error },
  ] = useLazyGetAmendmentDetailsQuery();
  const handleView = (row) => {
    getViewData({ bblc: row.b2BLCNo, amd: row.bblC_Amandment });
    setViewModalOpen(true);
  };
  //------ error handle
  useEffect(() => {
    if (error) {
      errorToast(error.data.message);
      setViewModalOpen(false);
    }
  }, [error]);
  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      headerAlign: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => handleView(row?.row)}
              style={{
                color: "#1976d2",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              view <FaEye color="#1976d2" />
            </span>
          </Box>
        );
      },
      minWidth: 120,
      flex: 1,
    },
    { field: "b2BLC_Slno", headerName: "Sl #", minWidth: 60, flex: 1 },
    {
      field: "amendment_Date",
      headerName: "Amendment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "amendment_Value",
      headerName: "Value (+/-)",
      minWidth: 70,
      flex: 1,
    },

    { field: "b2BLC_Value", headerName: "LC Value", minWidth: 100, flex: 1 },
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

      <CustomModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        title={"Amendment Details"}
      >
        <AmendmentModal
          data={viewData?.data}
          singleData={viewData?.dataSingle}
        />
      </CustomModal>
    </>
  );
};

export default LCAmendment;
