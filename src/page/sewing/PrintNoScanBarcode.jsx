import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import ReportButton from "../../components/buttons/ReportButton";
import { useLazyGetNoScanBarcodeReportQuery } from "../../redux/features/report/queryReport";
import { errorToast } from "../../common/toaster/toaster";
import { useSelector } from "react-redux";
import ReportViewer from "../../components/report/ReportViewer";

const PrintNoScanBarcode = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [reportDataView, setReportDataView] = useState(null);
  const [challan, setChallan] = useState("");
  // noScanBarcode report
  const [
    getNoScanBarcodeReport,
    {
      data: noScanBarcodeReport,
      isFetching: noScanBarcodeLoading,
      isError: noScanBarcodeError,
      isSuccess: noScanBarcodeSuccess,
    },
  ] = useLazyGetNoScanBarcodeReportQuery();

  const handleClick = () => {
    getNoScanBarcodeReport({
      id: user?.companyID,
      challan: challan,
      user: user?.userName,
    });
  };

  // noScanBarcode reports effect
  useEffect(() => {
    if (noScanBarcodeError) {
      setModalOpen(false);
      errorToast("Something Went Wrong");
    }
    if (noScanBarcodeReport && noScanBarcodeSuccess) {
      setModalOpen(true);
      setReportDataView(noScanBarcodeReport);
    }
  }, [noScanBarcodeError, noScanBarcodeSuccess, noScanBarcodeReport]);
  return (
    <div>
      <Box
        sx={{
          border: 1,
          borderColor: "#17a2b8",
          p: 1,
          boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <CustomTextInput
              label={"Challan Number"}
              value={challan}
              setStateValue={setChallan}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReportButton
              title={"view report"}
              fullWidth={true}
              handleClick={handleClick}
              disabled={challan?.length === 0}
              loading={noScanBarcodeLoading}
            />
          </Grid>
          <ReportViewer
            title={"Print No Scan Barcode"}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            reportData={reportDataView}
          />
        </Grid>
      </Box>
    </div>
  );
};

export default PrintNoScanBarcode;
