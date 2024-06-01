import React, { useEffect, useState } from "react";
import { formateDate } from "../../../utils/formateDate";
import {
  useGetSupplierApprovedQuery,
  useGetSupplierReportQuery,
} from "../../../redux/features/scm/supplierInfo/querySupplierInfo";
import SubmitButton from "../../buttons/SubmitButton";
import { Box, Stack } from "@mui/material";
import CustomTable from "../../table/CustomTable";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useSupplierForApprovedMutation } from "../../../redux/features/scm/supplierInfo/mutationSupplierInfo";
import { useSelector } from "react-redux";
import { successToast } from "../../../common/toaster/toaster";
import ReportViewer from "../../report/ReportViewer";

const SupplierApprovedView = ({ showRevise }) => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [selectedRow, setSelectedRows] = useState([]);

  const {
    data: approvedData,
    isLoading: isApprovalLoading,
    refetch,
  } = useGetSupplierApprovedQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: reportData, refetch: refetchReport } =
    useGetSupplierReportQuery(supplierId);

  const [supplierForApproved, { data, isSuccess, isLoading }] =
    useSupplierForApprovedMutation();

  const handleApproval = () => {
    const payload = selectedRow?.map((row) => {
      return {
        supId: row?.si_id,
        userName: user?.userName,
      };
    });
    supplierForApproved(payload);
  };

  const handleReport = (row) => {
    setSupplierId(row?.si_id);
    if (reportData) {
      setReportDataView(null);
      refetchReport();
    }
    setModalOpen(true);
  };
  useEffect(() => {
    if (reportData) {
      // setModalOpen(true);
      setReportDataView(reportData);
    }
  }, [reportData]);

  useEffect(() => {
    refetch();
    setSelectedRows([]);
    if (data) successToast("Revise Successfully!");
  }, [data]);

  const approvalColumns = [
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
      maxWidth: 80,
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
      flex: 1,
    },
    {
      field: "si_created_dt",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      maxWidth: 120,
      //   minWidth: 120,
      flex: 1,
    },
    {
      field: "si_approved_by",
      headerName: "approved by",
      minWidth: 120,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "si_approved_dt",
      headerName: "approved date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 130,
      maxWidth: 130,
      flex: 1,
    },
  ];
  const approvedRows = approvedData?.map((row, i) => ({ ...row, id: i }));
  return (
    <>
      <CustomTable
        columns={approvalColumns}
        rows={approvedRows ?? []}
        checkboxSelection={true}
        setSelectedRows={setSelectedRows}
        loading={isApprovalLoading}
        isSuccess={isSuccess}
        height={approvedRows?.length > 0 ? "auto" : "280px"}
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
              title={"revise"}
              type="button"
              handleClick={handleApproval}
              loading={isLoading}
              disabled={selectedRow.length <= 0 || showRevise}
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

export default SupplierApprovedView;
