import React, { useState } from "react";
import { Box } from "@mui/system";
import TabPanel from "../../components/tabPannel/TabPanel";
import ContractOpening from "../../components/contract/contractOpening/ContractOpening";
import EditAndView from "../../components/contract/EditAndView";
import Amendment from "../../components/contract/Amendment";
import Other from "../../components/contract/Other";
import Cancelled from "../../components/contract/Cancelled";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import { useSelector } from "react-redux";
import { useGetComCompanyQuery } from "../../redux/features/commercial/contract/queryContract";
import { setContract } from "../../redux/features/commercial/contract/contractSlice";

const Contract = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const { company } = useSelector((state) => state.contract);
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
          setReduxState={setContract}
          required={true}
        />
      </Box>
      <TabPanel
        tabData={[
          {
            label: "contract opening",
            components: <ContractOpening />,
          },
          {
            label: "edit/View",
            components: <EditAndView setGoToTab={setGoToTab} />,
          },
          {
            label: "Amendment",
            components: <Amendment />,
          },
          {
            label: "other",
            components: <Other />,
          },
          {
            label: "Cancelled",
            components: <Cancelled />,
          },
        ]}
        activeTab={goToTab}
        setActiveTab={setGoToTab}
      />
    </>
  );
};

export default Contract;
