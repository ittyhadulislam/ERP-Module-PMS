import React, { useEffect, useRef, useState } from "react";
import CustomTable from "../../table/CustomTable";
import CustomAppBar from "../../common/CustomAppBar";
import { useDispatch, useSelector } from "react-redux";
import { setCostingState } from "../../../redux/features/weaving/costing/costingSlice";
import { Grid } from "@mui/material";
const ManufactureInfoTable = () => {
  const dispatch = useDispatch();
  const {
    orderInfo,
    orderNo,
    greigeWith,
    totalEnds,
    fillingLength,
    exchangeRate,
    warpYarnRate,
    weftYarnRate,
    consumpstionWarpkgyds,
    consumpstionWeftkgyds,
    processAllowance,
  } = useSelector((state) => state.costing);

  const [crimpValue, setCrimpValue] = useState("");
  const [ppiValue, setPPIValue] = useState("");
  const [wastageValueRow1, setWastageValueRow1] = useState(2);
  const [wastageValueRow2, setWastageValueRow2] = useState(1);

  // calculation start

  const greige_fabric =
    +totalEnds / +greigeWith === Infinity
      ? "0"
      : Math.round(+totalEnds / +greigeWith);

  // rap for cover_factor
  const cover_factor_right_side =
    (orderInfo?.fc_ppi / Math.sqrt(orderInfo?.fc_weft_count)) * 0.72;
  const cover_factor_left_side =
    greige_fabric / Math.sqrt(orderInfo?.fc_warp_count);

  //---------

  const cover_factor = Math.round(
    cover_factor_right_side + cover_factor_left_side
  );

  // rap for b/w GSM
  const bwGSM_right_side = orderInfo?.fc_ppi / orderInfo?.fc_weft_count;
  const bwGSM_left_side = orderInfo?.fc_epi / orderInfo?.fc_warp_count;

  //---------
  const bw_GSM = Math.round((bwGSM_right_side + bwGSM_left_side) * 23.24);
  const warpConsumptions =
    (totalEnds / (1851.7 * orderInfo?.fc_warp_count)) *
    ((1 + +crimpValue / 100) * (1 + +wastageValueRow1 / 100));

  const consumption_row1 =
    1851.7 *
    orderInfo?.fc_warp_count *
    (1 + +crimpValue / 100) *
    (1 + +wastageValueRow1 / 100);
  // rap for consumption
  const consumption_row2 =
    ((orderInfo?.fc_ppi * +fillingLength) /
      (1851.7 * orderInfo?.fc_weft_count)) *
    (1 + +wastageValueRow2 / 100);

  //---------

  const warpWeight = (
    consumpstionWarpkgyds *
    Math.round(orderInfo?.fabricQty * (1 + +processAllowance / 100))
  ).toFixed(2);

  const weftWeight = (
    consumpstionWeftkgyds *
    Math.round(orderInfo?.fabricQty * (1 + +processAllowance / 100))
  ).toFixed(2);
  // calculation end

  const tableData = [
    {
      id: 1,
      particle: "Warp",
      count: orderInfo?.fc_warp_count,
      grayFabricCount: orderInfo?.fc_warp_count,
      consumption: warpConsumptions.toFixed(4),
      yarnRate: +exchangeRate * warpYarnRate,
      yarnCost: (warpConsumptions * (+exchangeRate * warpYarnRate)).toFixed(2),
      wastage: 2,
      Weight: warpWeight,
      crimp: crimpValue,
    },
    {
      id: 2,
      particle: "Weft",
      count: orderInfo?.fc_weft_count,
      grayFabricCount: orderInfo?.fc_weft_count,
      consumption: consumption_row2.toFixed(4),
      yarnRate: (weftYarnRate * +exchangeRate).toFixed(2),
      yarnCost: (consumption_row2 * weftYarnRate * +exchangeRate).toFixed(2),
      wastage: 1,
      Weight: weftWeight,
      crimp: null,
    },
    {
      id: 3,
      particle: "EPI",
      count: orderInfo?.fc_epi,
      grayFabricCount: greige_fabric,
      consumption: null,
      yarnRate: null,
      yarnCost: null,
      wastage: null,
      crimp: null,
    },
    {
      id: 4,
      particle: "PPI",
      count: orderInfo?.fc_ppi,
      grayFabricCount: orderInfo?.fc_ppi,
      consumption: null,
      yarnRate: null,
      yarnCost: null,
      wastage: null,
      crimp: null,
    },
  ];
  console.log("table data : ", tableData)

  const count = tableData.filter(item => item.consumption !== null).length;
  console.log(count);

  useEffect(() => {
    dispatch(
      setCostingState({
        key: "totalEnds",
        value: isNaN(orderInfo?.fc_epi * +orderInfo?.finishedDia)
          ? ""
          : orderInfo?.fc_epi * +orderInfo?.finishedDia,
      })
    );
    dispatch(
      setCostingState({
        key: "coverFactor",
        value: isNaN(cover_factor) ? "" : cover_factor,
      })
    );
    dispatch(
      setCostingState({
        key: "bwGSM",
        value: isNaN(bw_GSM) ? "" : bw_GSM,
      })
    );

    //---------rakibul--------
    dispatch(
      setCostingState({
        key: "ppiValue",
        value: isNaN(ppiValue) ? "" : ppiValue,
      })
    );
    //---------rakibul--------
  }, [orderInfo, cover_factor, ppiValue]);

  const Columns = [
    { field: "particle", headerName: "Particles", minWidth: 70, flex: 1 },
    {
      field: "count",
      headerName: "Count",
      minWidth: 60,
      flex: 1,

      renderCell: (row) => {
        return (
          <input
            type="number"
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            disabled
            value={row?.row?.count}
          // onChange={(e) =>
          //   handleTextFieldChange(id, e.target.value, "yarnRate")
          // }
          />
        );
      },
    },
    {
      field: "grayFabricCount",
      headerName: "Greige Fabric Count",
      minWidth: 120,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.grayFabricCount) {
          return (
            <input
              type="number"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              disabled
              value={row?.row?.grayFabricCount}
            // onChange={(e) =>
            //   handleTextFieldChange(id, e.target.value, "yarnRate")
            // }
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "consumption",
      headerName: "Consumption kg/yd",
      minWidth: 140,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.consumption) {
          return (
            <>
              {/* {
                 ?
                  
                  :
                  <input
                    type="number"
                    style={{
                      border: 0,
                      borderBottom: "1px solid gray",
                      background: "transparent",
                      //   outline: "none",
                      width: "100%",
                    }}
                    disabled
                    value={row?.row?.consumption}
                  // onChange={(e) =>
                  //   handleTextFieldChange(id, e.target.value, "yarnRate")
                  // }
                  />
              } */}
              <input
                type="number"
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                disabled
                value={row?.row?.consumption}
              // onChange={(e) =>
              //   handleTextFieldChange(id, e.target.value, "yarnRate")
              // }
              />
            </>
          );
        }
        else if (row?.row?.id === count + 1) {
          return (
            <input
              type="number"
              placeholder="Type PPI"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}

              value={row?.row?.consumption}
              onChange={(e) => setPPIValue(e.target.value)}
            // onChange={(e) =>
            //   handleTextFieldChange(id, e.target.value, "yarnRate")
            // }
            />
          )
        }
        else {
          return null;

        }
      },
    },
    {
      field: "yarnRate",
      headerName: "Yarn Rate / kg (BDT)",
      minWidth: 100,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.yarnRate !== null) {
          return (
            <input
              type="number"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              disabled
              value={row?.row?.yarnRate}
            // onChange={(e) =>
            //   handleTextFieldChange(id, e.target.value, "yarnRate")
            // }
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "yarnCost",
      headerName: "Yarn Cost / yd (BDT)",
      minWidth: 100,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.yarnCost) {
          return (
            <input
              type="number"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              disabled
              value={row?.row?.yarnCost}
              onChange={
                (e) => { }
                //handleTextFieldChange(id, e.target.value, "yarnRate")
              }
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "Weight",
      headerName: "Weight (kg)",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.wastage) {
          return (
            <input
              type="number"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              disabled
              value={row?.row?.Weight}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "wastage",
      headerName: "Wastage %",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.wastage) {
          return (
            <input
              type="number"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              disabled
              value={row?.row?.wastage}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "crimp",
      headerName: "Crimp %",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        if (row?.row?.crimp !== null) {
          return (
            <input
              type="number"
              placeholder="Type Crimp"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
              // value={crimpValue}
              onChange={(e) => setCrimpValue(e.target.value)}
            // value={row?.row?.crimp}
            // onChange={(e) =>
            //   handleTextFieldChange(id, e.target.value, "yarnRate")
            // }
            />
          );
        } else {
          return null;
        }
      },
    },
    //-------------rakibul--------------
    // {
    //   field: "ppi",
    //   headerName: "PPI",
    //   minWidth: 80,
    //   flex: 1,
    //   renderCell: (row) => {
    //     if (row?.row?.crimp !== null) {
    //       return (
    //         <input
    //           type="number"
    //           placeholder="Type PPI"
    //           style={{
    //             border: 0,
    //             borderBottom: "1px solid gray",
    //             background: "transparent",
    //             //   outline: "none",
    //             width: "100%",
    //           }}
    //           onChange={(e) => setPPIValue(e.target.value)}
    //         // }
    //         />
    //       );
    //     } else {
    //       return null;
    //     }
    //   },
    // },

    //-------------rakibul--------
  ];

  useEffect(() => {
    dispatch(
      setCostingState({
        key: "consumpstionWarpkgyds",
        value: warpConsumptions.toFixed(4),
      })
    );
    dispatch(
      setCostingState({
        key: "consumpstionWeftkgyds",
        value: consumption_row2.toFixed(4),
      })
    );
    dispatch(
      setCostingState({
        key: "warpYarnCostYds",
        value: warpConsumptions * (+exchangeRate * warpYarnRate),
      })
    );
    dispatch(
      setCostingState({
        key: "weftYarnCostYds",
        value: consumption_row2 * weftYarnRate * +exchangeRate,
      })
    );
  }, [consumption_row1, consumption_row2]);

  const manufactureInfoTableData = {
    warp: orderInfo?.fc_warp_count,
    weft: orderInfo?.fc_weft_count,
    epi: orderInfo?.fc_epi,
    ppi: orderInfo?.fc_ppi,
    warpGFcount: orderInfo?.fc_warp_count,
    weptGFcount: orderInfo?.fc_weft_count,
    epigFcount: greige_fabric,
    ppigFcount: orderInfo?.fc_ppi,
    warpConsumption: warpConsumptions.toFixed(4),
    weptConsumption: consumption_row2.toFixed(4),
    warpYarnRate: +exchangeRate * warpYarnRate,
    weptYarnRate: (weftYarnRate * +exchangeRate).toFixed(2),
    warpYarnCost: (warpConsumptions * (+exchangeRate * warpYarnRate)).toFixed(
      2
    ),
    weptYarnCost: (consumption_row2 * weftYarnRate * +exchangeRate).toFixed(2),
    warpWastagePercentage: 2,
    weptWastagePercentage: 1,
    warpCrimpPercentage: crimpValue,
  };

  // const [d, setD] = useState([]);

  useEffect(() => {
    dispatch(
      setCostingState({
        key: "manufactureInfoTable",
        value: manufactureInfoTableData,
      })
    );
  }, [
    orderInfo,
    greige_fabric,
    warpConsumptions,
    consumption_row2,
    warpYarnRate,
    exchangeRate,
    weftYarnRate,
    crimpValue,
  ]);
  // console.count("first");

  return (
    <>
      <CustomAppBar title={"MANUFACTURING info view"} />
      <CustomTable
        columns={Columns}
        rows={orderNo ? tableData : []}
        toolBar={false}
        search={true}
        hideFooter={true}
        height={tableData?.length > 0 && orderNo ? "auto" : "180px"}
        pagePerSize={99}
      />
    </>
  );
};

export default ManufactureInfoTable;
