import React, { useState } from "react";
import { Box } from "@mui/system";
import TabPanel from "../../components/tabPannel/TabPanel";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import LCOpening from "../../components/babcToBackLC/LCOpening/LCOpening";
import EditAndViewLC from "../../components/babcToBackLC/EditAndViewLC";
import LCAmendment from "../../components/babcToBackLC/LCAmendment";
import CancelledLC from "../../components/babcToBackLC/CancelledLC";
import LCTransferAndRename from "../../components/babcToBackLC/LCTransferAndRename";
import { useGetComCompanyQuery } from "../../redux/features/commercial/contract/queryContract";
import { setBackToBack } from "../../redux/features/commercial/backToBackLC/backToBackLcSlice";
import { useSelector } from "react-redux";

const BackToBackLC = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const { company } = useSelector((state) => state.backToBackLC);
  const [goToTab, setGoToTab] = useState(0);
  // get company data
  const { data, isLoading } = useGetComCompanyQuery(userName);
  return (
    <>
      <Box sx={{ my: 1 }}>
        <CustomAutocomplete
          label={"Company"}
          name="company"
          options={data?.data ?? []}
          value={company}
          optionLabel={"company_Name"}
          optionId={"company_ID"}
          loading={isLoading}
          setReduxState={setBackToBack}
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
            components: <EditAndViewLC setGoToTab={setGoToTab} />,
          },
          {
            label: "LC Amendment",
            components: <LCAmendment />,
          },
          {
            label: "LC Transfer & Rename",
            components: <LCTransferAndRename />,
          },
          {
            label: "Cancelled LC",
            components: <CancelledLC />,
          },
        ]}
        activeTab={goToTab}
        setActiveTab={setGoToTab}
      />
    </>
  );
};

export default BackToBackLC;
