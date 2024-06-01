import React, { useEffect, useState } from "react";
import TabPanel from "../../components/tabPannel/TabPanel";
import ViewGatePass from "../../components/createMerchantGatePass/ViewGatePass";
import { useSelector } from "react-redux";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import { Box, Grid } from "@mui/material";
import { useGetCompanyQuery } from "../../redux/features/gatePass/createGeneralGatePass/createGeneralGatePassQuery";
import CheckBy from "../../components/forApprovalMerchant/CheckBy";
import ConfirmBy from "../../components/forApprovalMerchant/ConfirmBy";
import ApproveBy from "../../components/forApprovalMerchant/ApproveBy";
import DisposeBy from "../../components/forApprovalMerchant/DisposeBy";
import ViewDetails from "../../components/forApprovalMerchant/ViewDetails";

const ForApprovalMerchant = () => {
  const { userName } = useSelector((state) => state.auth.user);
  const [company, setCompany] = useState(null);

  // get company
  const { data: companyData, isLoading: companyLoading } = useGetCompanyQuery();
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
      controller: "R2m_Gate_PassForApp_Mer.aspx",
      isShow: true,
      userName: userName,
    }));
    buttonPermission(payload);
  }, []);
  return (
    <>
      <Box sx={{ p: 1, border: "1px solid #17a2b8" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={5}>
            <CustomAutocomplete
              label={"Company"}
              name="company"
              options={companyData ?? []}
              value={company}
              optionLabel={"cCmpName"}
              optionId={"nCompanyID"}
              loading={companyLoading}
              setSelectedValue={setCompany}
              required={true}
            />
          </Grid>
        </Grid>
      </Box>
      <TabPanel
        tabData={[
          {
            label: "check By",
            components: <CheckBy buttonData={buttonData} company={company} />,
          },
          {
            label: "Confirm By",
            components: <ConfirmBy buttonData={buttonData} company={company} />,
          },
          {
            label: "Approve By",
            components: <ApproveBy buttonData={buttonData} company={company} />,
          },
          {
            label: "dispose By",
            components: <DisposeBy buttonData={buttonData} company={company} />,
          },
          {
            label: "View Details",
            components: <ViewDetails company={company} />,
          },
        ]}
      />
    </>
  );
};

export default ForApprovalMerchant;
