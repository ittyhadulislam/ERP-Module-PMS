import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// const pdfjsWorker = "./worker.js";

import React from "react";

const PDFViewer = ({ pdfURL }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      <div className="viewer">
        {pdfURL && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"> */}
            <Viewer
              fileUrl={pdfURL}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={1}
            ></Viewer>
          </Worker>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
