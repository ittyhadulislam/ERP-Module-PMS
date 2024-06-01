import {
  TbDeviceImacBolt,
  TbReportSearch,
  TbTruckDelivery,
} from "react-icons/tb";
import { FaCut, FaDiagnoses, FaTshirt, FaSwatchbook } from "react-icons/fa";
import { BsFillTagsFill } from "react-icons/bs";
import { SiCommerzbank, SiWearos } from "react-icons/si";
import { GiDungeonGate, GiSleevelessJacket } from "react-icons/gi";
import { LuShoppingCart } from "react-icons/lu";
import {
  QualityMenu,
  SMCMenu,
  assetManagement,
  commercial,
  cuttingMenu,
  exportMenu,
  finishingMenu,
  gatePass,
  merchandising,
  procurement,
  productionReportMenu,
  sewingMenu,
  weavingMenu,
} from "./submenu";
import { MdOutlineWebAsset } from "react-icons/md";


export const menuName = [
  {
    title: "Cutting",
    icon: <FaCut color="#FF5733" />,
    subMenu: cuttingMenu,
  },
  {
    title: "Sewing",
    icon: <FaTshirt color="#F1C40F" />,
    subMenu: sewingMenu,
  },
  {
    title: "Finishing",
    icon: <BsFillTagsFill color="#FC0172" />,
    subMenu: finishingMenu,
  },
  {
    title: "Export",
    icon: <TbTruckDelivery color="#2ECC71" />,
    subMenu: exportMenu,
  },
  {
    title: "Production Report",
    icon: <TbReportSearch color="#CCCCFF" />,
    subMenu: productionReportMenu,
  },
  {
    title: "Quality",
    icon: <FaDiagnoses color="#F50B52" />,
    subMenu: QualityMenu,
  },
  {
    title: "SCM",
    icon: <FaSwatchbook color="#FF5733" />,
    subMenu: SMCMenu,
  },
  {
    title: "Weaving",
    icon: <SiWearos color="green" />,
    subMenu: weavingMenu,
  },
  {
    title: "Gate Pass",
    icon: <GiDungeonGate color="#FF5733" />,
    subMenu: gatePass,
  },
  {
    title: "Commercial",
    icon: <SiCommerzbank color="#FC0172" />,
    subMenu: commercial,
  },
  {
    title: "Asset Management",
    icon: <MdOutlineWebAsset color="#2ECC71" />,
    subMenu: assetManagement
  }
  // {
  //   title: "Merchandising",
  //   icon: <GiSleevelessJacket color="#F1C40F" />,
  //   subMenu: merchandising,
  // },
  // {
  //   title: "procurement",
  //   icon: <LuShoppingCart color="#2ECC71" />,
  //   subMenu: procurement,
  // },
];
