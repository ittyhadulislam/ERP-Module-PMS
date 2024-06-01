import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCostingState } from "../../../redux/features/weaving/costing/costingSlice";

const CostingInfoTable = () => {
  const dispatch = useDispatch();
  const {
    orderNo,
    orderInfo,
    exchangeRate,
    consumpstionWarpkgyds,
    consumpstionWeftkgyds,
    warpYarnCostYds,
    weftYarnCostYds,
    processAllowance,
    ppiValue,
  } = useSelector((state) => state.costing);
  // const [processAllowance, setProcessAllowance] = useState("");
  const [btd1, setBtd1] = useState("");
  const [development, setDevelopment] = useState(0.03);
  const [customerCommission, setCustomerCommission] = useState("");
  const [depreciation, setDepreciation] = useState(0.9);
  const [marketingConst, setMarketingCost] = useState(0.03);
  const [piPrice, setPiPrice] = useState("");
  // --------
  console.log(ppiValue);

  const requiredGreigeAllowance = Math.round(
    orderInfo?.fabricQty * (1 + +processAllowance / 100)
  );

  const warpWeight = (
    consumpstionWarpkgyds *
    Math.round(orderInfo?.fabricQty * (1 + +processAllowance / 100))
  ).toFixed(2);

  const weftWeight = (
    consumpstionWeftkgyds *
    Math.round(orderInfo?.fabricQty * (1 + +processAllowance / 100))
  ).toFixed(2);

  const weavingCostWithProcess =
    (+warpYarnCostYds + +weftYarnCostYds + orderInfo?.fc_ppi * ppiValue) *
    (1 + processAllowance / 100);

  const totalCostPerYards =
    (+warpYarnCostYds + +weftYarnCostYds + orderInfo?.fc_ppi * ppiValue) *
      (1 + processAllowance / 100) +
    +btd1;

  const totalCost =
    ((+warpYarnCostYds + +weftYarnCostYds + orderInfo?.fc_ppi * ppiValue) *
      (1 + processAllowance / 100) +
      +btd1) /
      105 +
    +development +
    +customerCommission +
    +depreciation +
    +marketingConst;

  const weavingRateUsd = (
    (orderInfo?.fc_ppi * ppiValue) /
    +exchangeRate
  ).toFixed(2);
  const weavingCostWithProcessUsd = (
    ((+warpYarnCostYds + +weftYarnCostYds + orderInfo?.fc_ppi * ppiValue) *
      (1 + processAllowance / 100)) /
    +exchangeRate
  ).toFixed(2);

  const productCost = (
    ((+warpYarnCostYds + +weftYarnCostYds + orderInfo?.fc_ppi * ppiValue) *
      (1 + processAllowance / 100) +
      +btd1) /
    105
  ).toFixed(2);
  // --------
  const tableData = [
    {
      id: 1,
      firstCol: "Process Allowance %",
      secondCol: "",
      thirdCol: "Weaving Rate / yd",
      bdt: orderInfo?.fc_ppi * ppiValue,
      usd: weavingRateUsd,
      fourthCol: "Product Cost",
      usd2: productCost,
      fifthCol: "Marketing Cost & Transport",
      usd3: 0.03,
    },
    {
      id: 2,
      firstCol: "Required Greige With Allowance %",
      secondCol: requiredGreigeAllowance,
      thirdCol: "Weaving Cost With Process Allowance / yd",
      bdt: weavingCostWithProcess.toFixed(2),
      usd: weavingCostWithProcessUsd,
      fourthCol: "Development and Commercial",
      usd2: 0.03,
      fifthCol: "Total Cost",
      usd3: totalCost.toFixed(2),
    },
    {
      id: 3,
      firstCol: "Warp Weight",
      secondCol: warpWeight,
      thirdCol: "Process Cost / yd",
      bdt: "3",
      usd: (+btd1 / +exchangeRate).toFixed(2),
      fourthCol: "Customer Commission",
      usd2: "3",
      fifthCol: "PI Price",
      usd3: "3",
    },
    {
      id: 4,
      firstCol: "Weft Weight",
      secondCol: weftWeight,
      thirdCol: "Total Cost / yd",
      bdt: totalCostPerYards.toFixed(2),
      usd: (totalCostPerYards / +exchangeRate).toFixed(2),
      fourthCol: "Depreciation Cost",
      usd2: 0.09,
      fifthCol: "Total Profit / Loss",
      usd3: (+piPrice - totalCost).toFixed(2),
    },
  ];

  const Columns = [
    // { field: "firstCol", headerName: "", minWidth: 70, flex: 1 },
    // {
    //   field: "secondCol",
    //   headerName: "",
    //   accessor: "action",
    //   minWidth: 150,
    //   maxWidth: 150,
    //   flex: 1,
    //   renderCell: (row) => {
    //     const { id, secondCol } = row?.row;
    //     return (
    //       <>
    //         {id === 1 ? (
    //           <input
    //             type="number"
    //             placeholder="Type Allowance %"
    //             style={{
    //               border: 0,
    //               borderBottom: "1px solid gray",
    //               background: "transparent",
    //               //   outline: "none",
    //               width: "100%",
    //             }}
    //             onChange={(e) => setProcessAllowance(e.target.value)}
    //           />
    //         ) : (
    //           <input
    //             type="number"
    //             style={{
    //               border: 0,
    //               borderBottom: "1px solid gray",
    //               background: "transparent",
    //               //   outline: "none",
    //               width: "100%",
    //             }}
    //             value={isNaN(secondCol) ? "" : secondCol}
    //             disabled
    //           />
    //         )}
    //       </>
    //     );
    //   },
    // },
    { field: "thirdCol", headerName: "", minWidth: 70, flex: 1 },
    {
      field: "bdt",
      headerName: "BDT",
      minWidth: 150,
      maxWidth: 160,
      flex: 1,

      renderCell: (row) => {
        const { id, bdt } = row?.row;
        return (
          <>
            {id === 3 ? (
              <input
                type="number"
                placeholder="Type Process Cost / yd"
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                // disabled
                // value={row?.row?.bdt}
                onChange={(e) => setBtd1(e.target.value)}
              />
            ) : (
              <input
                type="text"
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                disabled
                value={isNaN(bdt) ? "" : bdt}
                // onChange={(e) =>
                //   handleTextFieldChange(id, e.target.value, "yarnRate")
                // }
              />
            )}
          </>
        );
      },
    },
    {
      field: "usd",
      headerName: "USD",
      minWidth: 80,
      maxWidth: 80,
      flex: 1,

      renderCell: (row) => {
        const { usd } = row?.row;
        return (
          <input
            type="text"
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            disabled
            value={isNaN(usd) || usd == Infinity ? "" : usd}
            // onChange={(e) =>
            //   handleTextFieldChange(id, e.target.value, "yarnRate")
            // }
          />
        );
      },
    },
    { field: "fourthCol", headerName: "", minWidth: 70, flex: 1 },
    {
      field: "usd2",
      headerName: "USD",
      minWidth: 150,
      maxWidth: 190,
      flex: 1,

      renderCell: (row) => {
        const { id, usd2 } = row.row;
        return (
          <>
            {id === 3 ? (
              <input
                type="number"
                placeholder="Type Customer Commission"
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                onChange={(e) => {
                  if (id === 3) {
                    setCustomerCommission(e.target.value);
                  }
                }}
              />
            ) : (
              <input
                type="text"
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                disabled
                value={isNaN(usd2) ? "" : usd2}
              />
            )}
          </>
        );
      },
    },
    { field: "fifthCol", headerName: "", minWidth: 70, flex: 1 },
    {
      field: "usd3",
      headerName: "USD",
      minWidth: 150,
      maxWidth: 150,
      flex: 1,

      renderCell: (row) => {
        const { id, usd3 } = row?.row;
        return (
          <>
            {" "}
            {id === 3 ? (
              <input
                type="number"
                placeholder={id === 1 ? "Type Marketing Cost" : "Type PI Price"}
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                onChange={(e) => {
                  // if (id === 1) {
                  //   setMarketingCost(e.target.value);
                  // }
                  if (id === 3) {
                    setPiPrice(e.target.value);
                  }
                }}
              />
            ) : (
              <input
                type="text"
                style={{
                  border: 0,
                  borderBottom: "1px solid gray",
                  background: "transparent",
                  //   outline: "none",
                  width: "100%",
                }}
                disabled
                value={isNaN(usd3) ? "" : usd3}
                // onChange={(e) =>
                //   handleTextFieldChange(id, e.target.value, "yarnRate")
                // }
              />
            )}
          </>
        );
      },
    },
  ];

  const costingInfoTableData = {
    processAllowPercentage: processAllowance,
    reqGreigeAllow: requiredGreigeAllowance,
    warpWeigth: warpWeight,
    weptWeigth: weftWeight,
    // weavingRateTk: orderInfo?.fc_ppi * ppiValue,
    weavingRateTk: orderInfo?.fc_ppi * ppiValue,
    weavingRateUSD: weavingRateUsd,
    weavingCostProcessAllowTk: weavingCostWithProcess.toFixed(2),
    weavingCostProcessAllowUSD: weavingCostWithProcessUsd,
    processCostTk: btd1,
    processCostUSD: (+btd1 / +exchangeRate).toFixed(2),
    totalCostTk: totalCostPerYards.toFixed(2),
    totalCostUSD: (totalCostPerYards / +exchangeRate).toFixed(2),
    productCost: productCost,
    devAndCommercialTk: (development * +exchangeRate).toFixed(2),
    devAndCommercialUSD: development,
    customerCommissionTk: customerCommission * +exchangeRate,
    customerCommissionUSD: customerCommission,
    depriciationCostTk: depreciation * +exchangeRate,
    depriciationCostUSD: depreciation,
    makeTransportCost: marketingConst,
    totalCost: totalCost.toFixed(2),
    piPrice: piPrice,
    totalProfitLoss: (+piPrice - totalCost).toFixed(2),
  };

  useEffect(() => {
    dispatch(
      setCostingState({
        key: "costingInfoTable",
        value: costingInfoTableData,
      })
    );
  }, [
    processAllowance,
    requiredGreigeAllowance,
    orderInfo,
    weftWeight,
    warpWeight,
    weavingCostWithProcess,
    btd1,
    totalCostPerYards,
    exchangeRate,
    development,
    customerCommission,
    depreciation,
    totalCost,
    piPrice,
  ]);

  return (
    <Box my={1}>
      <CustomAppBar title={"costing info view"} />
      <CustomTable
        columns={Columns}
        rows={orderNo ? tableData : []}
        // loading={isLayRatioLoading}
        toolBar={false}
        search={true}
        hideFooter={true}
        height={tableData?.length > 0 && orderNo ? "auto" : "180px"}
        pagePerSize={99}
      />
    </Box>
  );
};

export default CostingInfoTable;
