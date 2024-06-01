import React, { useEffect } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import ForApproval from "../../components/weaving/costingApproval/ForApproval";
import Scm from "../../components/weaving/costingApproval/Scm";
import Dmm from "../../components/weaving/costingApproval/Dmm";
import GM from "../../components/weaving/costingApproval/GM";
import IA from "../../components/weaving/costingApproval/IA";
import MD from "../../components/weaving/costingApproval/MD";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";
import { useSelector } from "react-redux";

const CostingApproval = () => {
  const { user } = useSelector((state) => state.auth);
  const buttonArray = [
    "BtnSCM",
    "BtnDMM",
    "BtnGM",
    "BtnIA",
    "BtnMD",
  ];

  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonArray.map((e) => ({
      buttonName: e,
      controller: "costing-approval",
      isShow: true,
      userName: user?.userName,
    }));
    buttonPermission(payload);
  }, []);

  const showSCMApproval = !buttonData?.find((e) => e?.buttonName === "BtnSCM")
    ?.isShow;
  const showDMM = !buttonData?.find((e) => e?.buttonName === "BtnDMM")
    ?.isShow;
  const showGM = !buttonData?.find((e) => e?.buttonName === "BtnGM")
    ?.isShow;
  const showIA = !buttonData?.find((e) => e?.buttonName === "BtnIA")
    ?.isShow;
  const showMD = !buttonData?.find((e) => e?.buttonName === "BtnMD")
    ?.isShow;

  return (
    <div>
      {" "}
      <TabPanel
        tabData={[
          { label: "For Approval", components: <ForApproval showSCMApproval={showSCMApproval}/> },
          { label: "SCM", components: <Scm showDMM={showDMM} /> },
          { label: "DMM", components: <Dmm showGM={showGM}/> },
          { label: "GM", components: <GM showIA={showIA} /> },
          { label: "IA", components: <IA showMD={showMD} /> },
          { label: "MD", components: <MD /> },
        ]}
      />
    </div>
  );
};

export default CostingApproval;
