import React, { useEffect } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import ForApproval from "../../components/scm/csForApproval/ForApproval";
// import ScmView from "../../components/scm/csForApproval/ScmView";
// import ConcernApproval from "../../components/scm/csForApproval/ConcernApproval";
// import MM from "../../components/scm/csForApproval/MM";
// import DMM from "../../components/scm/csForApproval/DMM";
// import InternalAudit from "../../components/scm/csForApproval/InternalAudit";
// import MD from "../../components/scm/csForApproval/MD";
import { useSelector } from "react-redux";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";
import ScmView from "../../components/scm/csForApproval/ScmView";
import ConcernApproval from "../../components/scm/csForApproval/ConcernApproval";
import MM from "../../components/scm/csForApproval/MM";
import DMM from "../../components/scm/csForApproval/DMM";
import InternalAudit from "../../components/scm/csForApproval/InternalAudit";
import MD from "../../components/scm/csForApproval/MD";

const CSForApproval = () => {
  const { user } = useSelector((state) => state.auth);
  const buttonArray = [
    "BtnSCM",
    "BtnCSCM",
    "BtnCSSCMRw",
    "BtnCSMM",
    "BtnCSMMRw",
    "BtnCSDM",
    "BtnCSIA",
    "BtnCSDMRw",
    "BtnDMMRw",
    "BtnIARw",
    "BtnCSMD",
    "BtnMDRw",
  ];

  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonArray.map((e) => ({
      buttonName: e,
      controller: "R2m_SCM_PC_For_Approval.aspx",
      isShow: true,
      userName: user?.userName,
    }));
    buttonPermission(payload);
  }, []);

  const showSCMApproval = !buttonData?.find((e) => e?.buttonName === "BtnSCM")
    ?.isShow;
  const showConcernApproval = !buttonData?.find(
    (e) => e?.buttonName === "BtnCSCM"
  )?.isShow;
  const showSCMRW = !buttonData?.find((e) => e?.buttonName === "BtnCSSCMRw")
    ?.isShow;
  const showMMApproval = !buttonData?.find((e) => e?.buttonName === "BtnCSMM")
    ?.isShow;
  const showMMRW = !buttonData?.find((e) => e?.buttonName === "BtnCSMMRw")
    ?.isShow;
  const showDMApproval = !buttonData?.find((e) => e?.buttonName === "BtnCSDM")
    ?.isShow;
  const showDMRW = !buttonData?.find((e) => e?.buttonName === "BtnCSDMRw")
    ?.isShow;
  const showIAApproval = !buttonData?.find((e) => e?.buttonName === "BtnCSIA")
    ?.isShow;
  const showDMMRW = !buttonData?.find((e) => e?.buttonName === "BtnDMMRw")
    ?.isShow;
  const showIARW = !buttonData?.find((e) => e?.buttonName === "BtnIARw")
    ?.isShow;
  const showMDApproval = !buttonData?.find((e) => e?.buttonName === "BtnCSMD")
    ?.isShow;
  const showMDRW = !buttonData?.find((e) => e?.buttonName === "BtnMDRw")
    ?.isShow;

  return (
    <TabPanel
      tabData={[
        {
          label: "For Approval",
          components: <ForApproval showSCMApproval={showSCMApproval} />,
        },
        {
          label: "SCM Head",
          components: (
            <ScmView
              showConcernApproval={showConcernApproval}
              showSCMRW={showSCMRW}
            />
          ),
        },
        {
          label: "concern merchant",
          components: (
            <ConcernApproval
              showMMApproval={showMMApproval}
              showMMRW={showMMRW}
            />
          ),
        },
        {
          label: "MM/AGM/DGM",
          components: (
            <MM showDMApproval={showDMApproval} showDMRW={showDMRW} />
          ),
        },
        {
          label: "DMM",
          components: (
            <DMM showIAApproval={showIAApproval} showDMMRW={showDMMRW} />
          ),
        },
        {
          label: "Internal Audit",
          components: (
            <InternalAudit
              showMDApproval={showMDApproval}
              showIARW={showIARW}
            />
          ),
        },
        {
          label: "Approved by MD",
          components: <MD showMDRW={showMDRW} />,
        },
      ]}
    />
  );
};

export default CSForApproval;
