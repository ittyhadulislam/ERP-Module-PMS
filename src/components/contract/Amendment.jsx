import React, { useEffect, useState } from "react";
import CustomTable from "../table/CustomTable";
import {
  useGetComAmendmentViewQuery,
  useLazyGetComContractDetailsAmendmentQuery,
} from "../../redux/features/commercial/contract/queryContract";
import { useSelector } from "react-redux";
import { formateDate } from "../../utils/formateDate";
import { Box } from "@mui/material";
import { FaEye } from "react-icons/fa";
import CustomModal from "../common/CustomModal";
import { errorToast } from "../../common/toaster/toaster";
import AmendmentModal from "./AmendmentModal";

const Amendment = () => {
  const { contract } = useSelector((state) => state.contract);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  // get table data
  const { data, isLoading } = useGetComAmendmentViewQuery(contract, {
    refetchOnMountOrArgChange: true,
  });
  // amendment view api call
  const [
    getViewData,
    { data: viewData, isSuccess: viewSuccess, isLoading: viewLoading, error },
  ] = useLazyGetComContractDetailsAmendmentQuery();

  const handleView = (row) => {
    getViewData({ contract: row.cContractNo, amandmentNO: row.amandmentNO });
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
    { field: "cMainCatedgory", headerName: "Select", minWidth: 60, flex: 1 },
    {
      field: "amandmentNO",
      headerName: "AMD",
      minWidth: 70,
      flex: 1,
    },
    {
      field: "dAmendmentDate",
      headerName: "Amendment Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },

    {
      field: "increasedValue",
      headerName: "Value (+/-)",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "contractValue",
      headerName: "contract Value",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "dExpireDate",
      headerName: "Expiry Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 100,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "totalPOQty",
      headerName: "Quantity (Pcs)",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "increasedQty",
      headerName: "Quantity (+/-)",
      minWidth: 100,
      flex: 1,
    },

    {
      field: "created_User",
      headerName: "created by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "created_Date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 90,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "edit_User",
      headerName: "Edited by",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "edit_date",
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

export default Amendment;
