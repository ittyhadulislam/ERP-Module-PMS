import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import cutMasterReducer from "./features/cutting/cutMaster/cuttingSlice";
import cuttingLayRatioSlice from "./features/cutting/cuttingLayRatio/cuttingLayRatioSlice";
import commercialReportSlice from "./features/commercial/report/commercialReportSlice";
import priceComparisonSlice from "./features/scm/priceComparison/priceComparisonSlice";
import createGeneralGatePassSlice from "./features/gatePass/createGeneralGatePass/createGeneralGatePassSlice";
import merchantGatePassSlice from "./features/gatePass/createMerchantGatePass/createMerchantGatePassSlice";
import returnGoodsReceiveSlice from "./features/gatePass/returnGoodsReceive/returnGoodsReceiveSlice";
import contractSlice from "./features/commercial/contract/contractSlice";
import orderReceiveSlice from "./features/weaving/orderReceive/orderReceiveSlice";
import costingSlice from "./features/weaving/costing/costingSlice";
import editOrderReceiveSlice from "./features/weaving/orderReceive/editOrderReceiveSlice";
import backToBackLcSlice from "./features/commercial/backToBackLC/backToBackLcSlice";
import foreignSlice from "./features/commercial/importInvoiceForeign/foreignSlice";
import localSlice from "./features/commercial/importInvoiceLocal/localSlice";
import acceptanceSlice from "./features/commercial/acceptance/acceptanceSlice";
import exportInvoiceSlice from "./features/commercial/exportInvoice/exportInvoiceSlice";
import assetMasterSlice from "./features/assetManagement/assetMaster/assetMasterSlice";
import rentedAssetSlice from "./features/assetManagement/rentedAsset/rentedAssetSlice";
import rentedAssetReturnSlice from "./features/assetManagement/rentedAssetReturn/rentedAssetReturnSlice";
import fixedAssetTransferSlice from "./features/assetManagement/fixedAssetTransfer/fixedAssetTransferSlice";
import runningRepairSlice from "./features/assetManagement/runningRepair/runningRepairSlice";
import scheduleMaintenanceSlice from "./features/assetManagement/ScheduleMaintenance/scheduleMaintenanceSlice";
import rentedAssetApprovalSlice from "./features/assetManagement/rentedAssetApproval/rentedAssetApprovalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authReducer,
    cutMaster: cutMasterReducer,
    cuttingLayRatio: cuttingLayRatioSlice,
    commercialReport: commercialReportSlice,
    priceComparison: priceComparisonSlice,
    createGatePass: createGeneralGatePassSlice,
    merchantGatePass: merchantGatePassSlice,
    returnGoodsReceive: returnGoodsReceiveSlice,
    contract: contractSlice,
    backToBackLC: backToBackLcSlice,
    orderReceive: orderReceiveSlice,
    costing: costingSlice,
    editOrderReceive: editOrderReceiveSlice,
    foreignInvoice: foreignSlice,
    localInvoice: localSlice,
    acceptance: acceptanceSlice,
    exportInvoice: exportInvoiceSlice,
    assetMaster: assetMasterSlice,
    rentedAsset: rentedAssetSlice,
    rentedAssetReturn: rentedAssetReturnSlice,
    fixedAssetMaster: fixedAssetTransferSlice,
    runningRepair: runningRepairSlice,
    scheduleMaintenance: scheduleMaintenanceSlice,
    rentedAssetApproval: rentedAssetApprovalSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
