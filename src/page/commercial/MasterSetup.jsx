import { Grid } from "@mui/material";
import React from "react";
import SetupCard from "../../components/MasterSetting/SetupCard";
import { FaCity } from "react-icons/fa";
import { MdCurrencyExchange, MdOutlinePayments } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import AddBank from "../../components/contract/contractOpening/masterItem/AddBank";
import { BsBank } from "react-icons/bs";
import AddCurrency from "../../components/contract/contractOpening/masterItem/AddCurrency";
import PaymentTerm from "../../components/contract/contractOpening/masterItem/PaymentTerm";
import PaymentMode from "../../components/contract/contractOpening/masterItem/PaymentMode";
import Company from "../../components/commercial/masterSetup/Company";

const MasterSetup = () => {
  const MASTER_ROUTES = [
    {
      id: 1,
      // route: divisions,
      icon: <FaCity fontSize={20} />,
      routeName: "Company Access",
      element: <Company />,
    },
    {
      id: 2,
      // route: divisions,
      icon: <BsBank fontSize={20} />,
      routeName: "Bank",
      element: <AddBank />,
    },
    {
      id: 3,
      // route: divisions,
      icon: <MdCurrencyExchange fontSize={20} />,
      routeName: "Currency",
      element: <AddCurrency />,
    },
    {
      id: 4,
      // route: divisions,
      icon: <MdOutlinePayments fontSize={20} />,
      routeName: "Payment Term",
      element: <PaymentTerm />,
    },
    {
      id: 5,
      // route: divisions,
      icon: <RiSecurePaymentFill fontSize={20} />,
      routeName: "Payment Mode",
      element: <PaymentMode />,
    },
  ];
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      spacing={1}
      p={2}
    >
      {MASTER_ROUTES.map((item) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5} key={item.id}>
            <SetupCard masterItem={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MasterSetup;
