import { Box } from "@mui/material";
import React from "react";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import TabPanel from "../../components/tabPannel/TabPanel";
import LCOpening from "../../components/otherLC/LCOpening/LCOpening";
import EditAndViewLC from "../../components/otherLC/EditAndViewLC";
import LCAmendment from "../../components/otherLC/LCAmendment";
import CancelledLC from "../../components/otherLC/CancelledLC";
import OtherLCRename from "../../components/otherLC/OtherLCRename";

const OtherLC = () => {
  return (
    <>
      <Box sx={{ my: 1 }}>
        <CustomAutocomplete
          //   setValue={setValue}
          label={"Company"}
          options={[]}
          //   value={selectedStyle}
          optionLabel={"cStyleNo"}
          optionId={"nStyleID"}
          //   loading={isLoading}
          //   setSelectedValue={setSelectedStyle}
          required={true}
        />
      </Box>
      <TabPanel
        tabData={[
          {
            label: "LC opening",
            components: <LCOpening />,
          },
          {
            label: "edit/View LC",
            components: <EditAndViewLC />,
          },
          {
            label: "LC Amendment",
            components: <LCAmendment />,
          },
          {
            label: "Other LC Rename",
            components: <OtherLCRename />,
          },
          {
            label: "Cancelled LC",
            components: <CancelledLC />,
          },
        ]}
      />
    </>
  );
};

export default OtherLC;
