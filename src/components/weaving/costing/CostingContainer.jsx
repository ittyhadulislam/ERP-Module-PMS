import React, { useEffect } from "react";
import OrderInfo from "./OrderInfo";
import ManufactureInfo from "./ManufactureInfo";
import ManufactureInfoTable from "./ManufactureInfoTable";
import CostingInfoTable from "./CostingInfoTable";
import { Box, Stack, display } from "@mui/system";
import SubmitButton from "../../buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { useSaveCostingMutation } from "../../../redux/features/weaving/costing/mutationCosting";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { reSetCostingState } from "../../../redux/features/weaving/costing/costingSlice";

const CostingContainer = () => {
  const dispatch = useDispatch();
  const {
    orderInfo,
    exchangeRate,
    fillingLength,
    greigeWith,
    bwGSM,
    coverFactor,
    totalEnds,
    YarnInfoTable,
    manufactureInfoTable,
    costingInfoTable,
  } = useSelector((state) => state.costing);

  const { userName } = useSelector((state) => state.auth.user);

  const [saveCosting, { data, isSuccess, isLoading, isError, error }] =
    useSaveCostingMutation();

  const handleSave = () => {
    const payload = {
      orderId: orderInfo?.or_order_id,
      orderName: orderInfo?.or_style_no,
      version: 0,
      exchageRate: +exchangeRate,
      fillingLength: +fillingLength,
      greigeWidth: +greigeWith,
      gsm: bwGSM,
      coverFactor: coverFactor,
      totalEnds: +totalEnds,
      wrapCount: +manufactureInfoTable?.warp,
      weptCount: +manufactureInfoTable?.weft,
      epi: +manufactureInfoTable?.epi,
      ppi: +manufactureInfoTable?.ppi,
      warpGFcount: +manufactureInfoTable?.warpGFcount,
      weptGFcount: +manufactureInfoTable?.weptGFcount,
      epigFcount: +manufactureInfoTable?.epigFcount,
      ppigFcount: manufactureInfoTable?.ppigFcount,
      warpConsumption: +manufactureInfoTable?.warpConsumption,
      weptConsumption: +manufactureInfoTable?.weptConsumption,
      warpYarnRate: +manufactureInfoTable?.warpYarnRate,
      weptYarnRate: +manufactureInfoTable?.weptYarnRate,
      warpYarnCost: +manufactureInfoTable?.warpYarnCost,
      weptYarnCost: +manufactureInfoTable?.weptYarnCost,
      warpWastagePercentage: +manufactureInfoTable?.warpWastagePercentage,
      weptWastagePercentage: +manufactureInfoTable?.weptWastagePercentage,
      warpCrimpPercentage: +manufactureInfoTable?.warpCrimpPercentage,
      processAllowPercentage: +costingInfoTable?.processAllowPercentage,
      reqGreigeAllow: +costingInfoTable?.reqGreigeAllow,
      warpWeigth: +costingInfoTable?.warpWeigth,
      weptWeigth: +costingInfoTable?.weptWeigth,
      weavingRateTk: +costingInfoTable?.weavingRateTk,
      weavingRateUSD: +costingInfoTable?.weavingRateUSD,
      weavingCostProcessAllowTk: +costingInfoTable?.weavingCostProcessAllowTk,
      weavingCostProcessAllowUSD: +costingInfoTable?.weavingCostProcessAllowUSD,
      processCostTk: +costingInfoTable?.processCostTk,
      processCostUSD: +costingInfoTable?.processCostUSD,
      totalCostTk: +costingInfoTable?.totalCostTk,
      totalCostUSD: +costingInfoTable?.totalCostUSD,
      productCost: +costingInfoTable?.productCost,
      devAndCommercialTk: +costingInfoTable?.devAndCommercialTk,
      devAndCommercialUSD: +costingInfoTable?.devAndCommercialUSD,
      customerCommissionTk: +costingInfoTable?.customerCommissionTk,
      customerCommissionUSD: +costingInfoTable?.customerCommissionUSD,
      depriciationCostTk: +costingInfoTable?.depriciationCostTk,
      depriciationCostUSD: +costingInfoTable?.depriciationCostUSD,
      makeTransportCost: +costingInfoTable?.makeTransportCost,
      totalCost: +costingInfoTable?.totalCost,
      piPrice: +costingInfoTable?.piPrice,
      totalProfitLoss: +costingInfoTable?.totalProfitLoss,

      costingChild: YarnInfoTable?.map((e) => ({
        usedFor: e.usedFor,
        yarnType: +e.yarnType,
        yarnCount: +e.yarnCount,
        yarnRate: +e.yarnRate,
      })),
      createdBy: userName,
    };
    console.log(payload);
    saveCosting(payload);
  };
  let saveCount = 0;
  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      saveCount += 1;
      successToast(data.message);
      dispatch(reSetCostingState());
    }
  }, [data]);
  useEffect(() => {
    if (error && isError) {
      errorToast(error?.data?.message);
    }
  }, [error]);
  return (
    <div className="test">
      <OrderInfo />
      <ManufactureInfo isSaveSuccess={saveCount} />
      <ManufactureInfoTable />
      <CostingInfoTable />
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>
          <SubmitButton
            title={"Save"}
            type="button"
            handleClick={handleSave}
            loading={isLoading}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default CostingContainer;
