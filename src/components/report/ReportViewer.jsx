import React from "react";
import ModalLoading from "../common/ModalLoading";
import ReportModal from "./ReportModal";
import { detectDeviceType } from "../../utils/detectDeviceType";
import { Button } from "@mui/material";
import { BsFilePdf } from "react-icons/bs";

const ReportViewer = ({ modalOpen, setModalOpen, reportData, title = "" }) => {
  const device = detectDeviceType();

  return (
    <div className="viewer">
      {/* {pdfDownloading && "Downloading File..."} */}

      <ReportModal open={modalOpen} setOpen={setModalOpen} title={title}>
        {reportData ? (
          // <iframe
          //   src={reportData}
          //   title="PDF Viewer"
          //   style={{ width: "100%", height: "600px", border: "none" }}
          // ></iframe>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {device === "Desktop" ? (
              <iframe
                src={reportData}
                title="PDF Viewer"
                style={{ width: "100%", height: "600px", border: "none" }}
              ></iframe>
            ) : (
              <a href={reportData} download="downloaded_file.pdf">
                <Button
                  variant="outlined"
                  startIcon={<BsFilePdf color="red" />}
                  sx={{ m: "auto" }}
                >
                  Download PDF
                </Button>
              </a>
            )}
          </div>
        ) : (
          <ModalLoading />
        )}
      </ReportModal>
    </div>
  );
};

export default ReportViewer;
