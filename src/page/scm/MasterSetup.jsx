import { Grid } from "@mui/material";
import React from "react";
import { FaCity, FaCompressArrowsAlt, FaHospitalUser } from "react-icons/fa";
import {
  MdConstruction,
  MdFormatColorFill,
  MdOutlineDashboardCustomize,
  MdOutlineDesignServices,
  MdOutlineHomeWork,
} from "react-icons/md";
import { GiYarn } from "react-icons/gi";
import { CgSmartphoneChip } from "react-icons/cg";
import { TbDimensions } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import SetupCard from "../../components/MasterSetting/SetupCard";
import Supplier from "../../components/MasterSetting/scm/Supplier";
import SupplierCode from "../../components/MasterSetting/scm/SupplierCode";
import CustomerName from "../../components/MasterSetting/weaving/CustomerName";
import Buyer from "../../components/MasterSetting/weaving/Buyer";
import GMTColor from "../../components/MasterSetting/weaving/GMTColor";
import Design from "../../components/MasterSetting/weaving/Design";
import FabricConsumption from "../../components/MasterSetting/weaving/FabricConsumption";
import FabricConstruction from "../../components/MasterSetting/weaving/FabricConstruction";
import FinishedDia from "../../components/MasterSetting/weaving/FinishedDia";
import FabricColor from "../../components/MasterSetting/weaving/FabricColor";
import GSM from "../../components/MasterSetting/weaving/GSM";
import YarnType from "../../components/MasterSetting/weaving/YarnType";
import YarnCount from "../../components/MasterSetting/weaving/YarnCount";

const MasterSetup = () => {
  const MASTER_ROUTES = [
    {
      id: 1,
      // route: divisions,
      icon: <FaCity fontSize={20} />,
      routeName: "Supplier",
      element: <Supplier />,
    },
    {
      id: 2,
      // route: districts,
      icon: <MdOutlineHomeWork fontSize={20} />,
      routeName: "Supplier Code",
      element: <SupplierCode />,
    },

    {
      id: 3,
      // route: districts,
      icon: <MdOutlineDashboardCustomize fontSize={20} />,
      routeName: "Customer Name",
      element: <CustomerName />,
    },
    {
      id: 4,
      // route: districts,
      icon: <FaHospitalUser fontSize={20} />,
      routeName: "Buyer",
      element: <Buyer />,
    },
    {
      id: 5,
      // route: districts,
      icon: <IoIosColorPalette fontSize={20} />,
      routeName: "Color",
      element: <GMTColor />,
    },
    {
      id: 6,
      // route: districts,
      icon: <MdOutlineDesignServices fontSize={20} />,
      routeName: "Design",
      element: <Design />,
    },
    {
      id: 7,
      // route: districts,
      icon: <FaCompressArrowsAlt fontSize={20} />,
      routeName: "Fabric Composition",
      element: <FabricConsumption />,
    },
    {
      id: 8,
      // route: districts,
      icon: <MdConstruction fontSize={20} />,
      routeName: "Fabric Construction",
      element: <FabricConstruction />,
    },
    {
      id: 9,
      // route: districts,
      icon: <TbDimensions fontSize={20} />,
      routeName: "Finished Dia",
      element: <FinishedDia />,
    },
    // {
    //   id: 10,
    //   // route: districts,
    //   icon: <MdFormatColorFill fontSize={20} />,
    //   routeName: "Fabric Color",
    //   element: <FabricColor />,
    // },
    {
      id: 11,
      // route: districts,
      icon: <CgSmartphoneChip fontSize={20} />,
      routeName: "GSM",
      element: <GSM />,
    },
    {
      id: 12,
      // route: districts,
      icon: <GiYarn fontSize={20} />,
      routeName: "yarn Type",
      element: <YarnType />,
    },
    {
      id: 13,
      // route: districts,
      icon: <CgSmartphoneChip fontSize={20} />,
      routeName: "yarn Count",
      element: <YarnCount />,
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
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5} key={item.id}>
            <SetupCard masterItem={item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MasterSetup;
