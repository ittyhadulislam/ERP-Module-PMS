import React, { useEffect } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";

import SupplierForApprovalView from "../../components/scm/supplierForApproval/SupplierForApprovalView";
import SupplierApprovedView from "../../components/scm/supplierForApproval/SupplierApprovedView";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";
import { useSelector } from "react-redux";

const SupplierForApproval = () => {
  const { user } = useSelector((state) => state.auth);

  const buttonArray = ["btncom", "BtnRtn"];
  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonArray.map((e) => ({
      buttonName: e,
      controller: "R2m_Supplier_Approval.aspx",
      isShow: true,
      userName: user?.userName,
    }));
    buttonPermission(payload);
  }, []);

  const showApproval = !buttonData?.find((e) => e?.buttonName === "btncom")
    ?.isShow;
  const showRevise = !buttonData?.find((e) => e?.buttonName === "BtnRtn")
    ?.isShow;
  return (
    <>
      <TabPanel
        tabData={[
          {
            label: "for approval",
            components: <SupplierForApprovalView showApproval={showApproval} />,
          },
          {
            label: "approved",
            components: <SupplierApprovedView showRevise={showRevise} />,
          },
        ]}
      />
    </>
  );
};

export default SupplierForApproval;
