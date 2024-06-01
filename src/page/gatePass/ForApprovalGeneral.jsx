import React, { useEffect } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import CheckBy from "../../components/forApprovalGeneral/CheckBy";
import ConfirmBy from "../../components/forApprovalGeneral/ConfirmBy";
import ApproveBy from "../../components/forApprovalGeneral/ApproveBy";
import GiftApproveBy from "../../components/forApprovalGeneral/GiftApproveBy";
import DisposeBy from "../../components/forApprovalGeneral/DisposeBy";
import ViewDetails from "../../components/forApprovalGeneral/ViewDetails";
import { useSelector } from "react-redux";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";

const ForApprovalGeneral = () => {
  const { userName } = useSelector((state) => state.auth.user);

  const buttonArray = [
    "BtnChk",
    "btnreturn",
    "BtnCNF",
    "BtnApp",
    "BtnDisp",
    "btnChkCancel",
    "btnCnfCancel",
    "btnAppCancel",
  ];
  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonArray.map((e) => ({
      buttonName: e,
      controller: "R2m_Gate_PassForApp_Gen.aspx",
      isShow: true,
      userName: userName,
    }));
    buttonPermission(payload);
  }, []);
  return (
    <TabPanel
      tabData={[
        {
          label: "check By",
          components: <CheckBy buttonData={buttonData} />,
        },
        {
          label: "Confirm By",
          components: <ConfirmBy buttonData={buttonData} />,
        },
        {
          label: "Approve By",
          components: <ApproveBy buttonData={buttonData} />,
        },
        {
          label: "Gift Approve By",
          components: <GiftApproveBy buttonData={buttonData} />,
        },
        {
          label: "dispose By",
          components: <DisposeBy buttonData={buttonData} />,
        },
        {
          label: "View Details",
          components: <ViewDetails />,
        },
      ]}
    />
  );
};

export default ForApprovalGeneral;
