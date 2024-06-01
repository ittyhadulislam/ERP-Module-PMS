import React, { useEffect, useState } from "react";
import CustomTable from "../../table/CustomTable";
import { Box, Stack } from "@mui/material";
import { formateDate } from "../../../utils/formateDate";
import { BsFileEarmarkPdf } from "react-icons/bs";
import SubmitButton from "../../buttons/SubmitButton";
import {
  useGetSupplierForApprovalQuery,
  useGetSupplierReportQuery,
} from "../../../redux/features/scm/supplierInfo/querySupplierInfo";
import { useSelector } from "react-redux";
import { useSupplierForApprovalMutation } from "../../../redux/features/scm/supplierInfo/mutationSupplierInfo";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import ReportViewer from "../../report/ReportViewer";

const SupplierForApprovalView = ({ showApproval }) => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [selectedRow, setSelectedRows] = useState([]);
  const {
    data: forApprovalData,
    isLoading: isForApprovalLoading,
    refetch,
  } = useGetSupplierForApprovalQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: reportData, refetch: refetchReport } =
    useGetSupplierReportQuery(supplierId);
  const [supplierForApproval, { data, isSuccess, isLoading, isError }] =
    useSupplierForApprovalMutation();

  const handleReport = (row) => {
    setSupplierId(row?.si_id);
    if (reportData) {
      setReportDataView(null);
      refetchReport();
      // setModalOpen(false);
    }
    setModalOpen(true);
  };

  const handleApproval = () => {
    const payload = selectedRow?.map((row) => {
      return {
        supId: row?.si_id,
        userName: user?.userName,
      };
    });

    supplierForApproval(payload);
  };
  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  useEffect(() => {
    if (!isError) refetch();
    setSelectedRows([]);
    if (data) successToast("Approved successfully!");
    if (isError) errorToast("Something Went Wrong!");
  }, [data, isError]);

  const forApprovalColumns = [
    {
      field: "id",
      headerName: "Report",
      accessor: "Report",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => handleReport(row?.row)}
              style={{ color: "#1976d2", cursor: "pointer" }}
            >
              Report <BsFileEarmarkPdf color="red" />
            </span>
          </Box>
        );
      },
      minWidth: 80,
      maxWidth: 85,
      flex: 1,
    },
    // { field: "cMainCategory", headerName: "Report", flex: 1 },
    {
      field: "si_id",
      headerName: "supplier id",
      minWidth: 100,
      maxWidth: 100,
      flex: 1,
    },
    { field: "si_nm", headerName: "supplier name", minWidth: 130, flex: 1 },
    { field: "sn_type", headerName: "Sourching type", minWidth: 150, flex: 1 },
    {
      field: "cor_description",
      headerName: "country of origin",
      minWidth: 200,
      maxWidth: 200,
      flex: 1,
    },
    {
      field: "si_total_worker",
      headerName: "total worker",
      minWidth: 150,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "si_created_by",
      headerName: "created by",
      minWidth: 150,
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "si_created_dt",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
  ];
  const forApprovalRows = forApprovalData?.map((row, i) => ({ ...row, id: i }));
  return (
    <>
      <CustomTable
        columns={forApprovalColumns}
        rows={forApprovalRows ?? []}
        checkboxSelection={true}
        setSelectedRows={setSelectedRows}
        loading={isForApprovalLoading}
        isSuccess={isSuccess}
        height={forApprovalRows?.length > 0 ? "auto" : "280px"}
      />
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span>
            <SubmitButton
              title={"Approve"}
              type="button"
              handleClick={handleApproval}
              loading={isLoading}
              disabled={selectedRow.length <= 0 || showApproval}
            />
          </span>
        </Stack>
      </Box>
      <ReportViewer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        reportData={reportDataView}
      />
    </>
  );
};

export default SupplierForApprovalView;
