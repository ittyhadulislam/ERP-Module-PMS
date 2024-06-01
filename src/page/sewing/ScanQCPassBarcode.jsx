import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaFileLines } from "react-icons/fa6";
import { RiShirtFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiPurchaseTag } from "react-icons/bi";
import { AiOutlineBgColors, AiOutlineBarcode } from "react-icons/ai";
import { MdOutlineInput } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import CardDetails from "../../components/sewing/qcBarcode/CardDetails";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import CustomTable from "../../components/table/CustomTable";
const ScanQCPassBarcode = () => {
  const [scanValue, setScanValue] = useState("");
  const cardArray = [
    {
      title: "Challan:",
      amount: 987456,
      bgColor: "#015568",
      icon: <FaFileLines style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Style:",
      amount: "123654 1223 4569 1455",
      bgColor: "#a50471",
      icon: <RiShirtFill style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Line:",
      amount: 123654,
      bgColor: "#01682f",
      icon: (
        <BsGraphUpArrow style={{ marginTop: "-3px", marginRight: "4px" }} />
      ),
    },
    {
      title: "PO:",
      amount: 123654,
      bgColor: "#4f0537",
      icon: <BiPurchaseTag style={{ marginTop: "-3px", marginRight: "4px" }} />,
    },
    {
      title: "Color:",
      amount: 123654,
      bgColor: "#56006c",
      icon: (
        <AiOutlineBgColors style={{ marginTop: "-3px", marginRight: "4px" }} />
      ),
    },
    {
      title: "Input Quantity:",
      amount: 123654,
      bgColor: "#05114f",
      icon: (
        <MdOutlineInput style={{ marginTop: "-2px", marginRight: "4px" }} />
      ),
    },
    {
      title: "QC Pass Quantity:",
      amount: 123654,
      bgColor: "#323232",
      icon: (
        <AiOutlineBarcode style={{ marginTop: "-2px", marginRight: "4px" }} />
      ),
    },
    {
      title: "Balance Quantity:",
      amount: 123654,
      bgColor: "#076806",
      icon: (
        <FaMoneyCheckAlt style={{ marginTop: "-2px", marginRight: "4px" }} />
      ),
    },
  ];

  const columns = [
    { field: "id", headerName: "SL", width: 50 },
    { field: "Barcode", headerName: "Barcode", flex: 1 },
    {
      field: "cDimen",
      headerName: "Size",
      //   minWidth: 200,
      flex: 1,
    },
    {
      field: "lk",
      headerName: "Quantity",
      //   minWidth: 200,
      flex: 1,
    },
    // { field: "cUnitCode", headerName: "Unit", flex: 1 },
    { field: "createdBy", headerName: "Scan by", flex: 1 },
    {
      field: "dEntdate",
      headerName: "Scan Date&Time",
      // valueGetter: (params) => formateDate(params.value),

      //   minWidth: 120,
      flex: 1,
    },
  ];
  return (
    <div>
      <Box sx={{ p: 1, border: "1px dashed grey", mr: "1px" }}>
        <div style={{ margin: "10px 0px" }}>
          <CustomTextInput
            label={"scan bar code"}
            setStateValue={setScanValue}
            value={scanValue}
          />
        </div>
        <Grid container spacing={1}>
          {cardArray.map((e, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <CardDetails
                title={e.title}
                amount={e.amount}
                icon={e.icon}
                bgColor={e.bgColor}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={1}>
        <CustomTable columns={columns} rows={[]} />
      </Box>
    </div>
  );
};

export default ScanQCPassBarcode;
