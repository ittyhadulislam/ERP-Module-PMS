import React from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import StyleMasterContainer from "../../components/merchandising/styelMaster/StyleMasterContainer";
import ViewAndEdit from "../../components/merchandising/styelMaster/ViewAndEdit";
import UploadFile from "../../components/merchandising/styelMaster/UploadFile";

const StyleMaster = () => {
  return (
    <TabPanel
      tabData={[
        {
          label: "Add New Style",
          components: <StyleMasterContainer />,
        },
        {
          label: "View Edit",
          components: <ViewAndEdit />,
        },
        {
          label: "upload file",
          components: <UploadFile />,
        },
      ]}
    />
  );
};

export default StyleMaster;
