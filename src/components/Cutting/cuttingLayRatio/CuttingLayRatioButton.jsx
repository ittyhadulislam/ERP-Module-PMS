import React, { useEffect, useState } from "react";
import { errorToast, warningToast } from "../../../common/toaster/toaster";
import { Box, Stack } from "@mui/material";
import ReportButton from "../../buttons/ReportButton";
import SubmitButton from "../../buttons/SubmitButton";
import { useLazyGetLayRatioReportQuery } from "../../../redux/features/cutting/cuttingLayRatio/queryCuttngLayRatio";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReturnButton from "../../buttons/ReturnButton";
import ReportViewer from "../../report/ReportViewer";

const CuttingLayRatioButton = () => {
  const { user } = useSelector((state) => state.auth);
  const { style, po, country } = useSelector((state) => state.cuttingLayRatio);

  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);

  const [
    getReport,
    { data: reportData, isFetching: isReportLoading, isError: reportError },
  ] = useLazyGetLayRatioReportQuery();

  const handleReport = () => {
    if (!po || !country || !style) {
      return warningToast("Please Select Style,PO and Country");
    }
    getReport({
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      user: user?.userName,
    });
  };
  useEffect(() => {
    if (reportData) {
      setModalOpen(true);
      setReportDataView(reportData);
    }
    if (reportError) {
      errorToast("Something Went Wrong");
    }
  }, [reportData, reportError]);
  return (
    <>
      <Box sx={{ my: 1, mb: 0, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span>
            <Link to={"/cutting-approval"}>
              <ReturnButton title={"Go to Approval"} />
            </Link>
          </span>

          <span style={{ margin: 0 }}>
            <ReportButton
              title={"Report"}
              handleClick={handleReport}
              loading={isReportLoading}
            />
            <SubmitButton title={"Save"} type="submit" />
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

export default CuttingLayRatioButton;
