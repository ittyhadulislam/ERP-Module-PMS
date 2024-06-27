import { lazy } from "react";
// import Practice from "../page/Practice";

const AssetMaster = lazy(() => import("../page/assetManagement/AssetMaster"))
const FixedAssetTransfer = lazy(() => import("../page/assetManagement/FixedAssetTransfer"))
const FixedAssetTransferApproval = lazy(() => import("../page/assetManagement/FixedAssetTransferApproval"))
const RentedAsset = lazy(() => import("../page/assetManagement/RentedAsset"))
const RentedAssetReturn = lazy(() => import("../page/assetManagement/RentedAssetReturn"))
const RentedAssetReturnApproval = lazy(() => import("../page/assetManagement/RentedAssetReturnApproval"))
const RunningRepair = lazy(() => import("../page/assetManagement/RunningRepair"))
const ServiceDescription = lazy(() => import("../page/assetManagement/ServiceDescription"))
const ScheduleMaintenance = lazy(() => import("../page/assetManagement/ScheduleMaintenance"))
const PermanentTransfer = lazy(() => import("../page/assetManagement/PermanentTransfer"))
const AssetManagementReports = lazy(() => import("../page/assetManagement/AssetManagementReports"))
const GenerateQrCode = lazy(() => import("../page/assetManagement/GenerateQrCode"))
const AssetReport = lazy(() => import("../page/assetManagement/AssetReport"))

export const assetManagementRoutes = [
    {
        path: "/asset-master",
        pageName: "Asset Master",
        element: <AssetMaster />
    },
    {
        path: "/fixed-asset-transfer",
        pageName: "Fixed Asset Transfer",
        element: <FixedAssetTransfer />
    },
    {
        path: "/fixed-asset-transfer-approval",
        pageName: "Fixed Asset Transfer Approval",
        element: <FixedAssetTransferApproval />
    },
    {
        path: "/rented-asset",
        pageName: "Rented Asset",
        element: <RentedAsset />
    },
    {
        path: "/rented-asset-return",
        pageName: "Rented Asset Return",
        element: <RentedAssetReturn />
    },
    {
        path: "/rented-asset-return-approval",
        pageName: "Rented Asset Return Approval",
        element: <RentedAssetReturnApproval />
    },
    {
        path: "/running-repair",
        pageName: "Running Repair",
        element: <RunningRepair />
    },
    {
        path: "/service-description",
        pageName: "Service Description",
        element: <ServiceDescription />
    },
    {
        path: "/schedule-maintenance",
        pageName: "Schedule Maintenance",
        element: <ScheduleMaintenance />
    },
    {
        path: "/permanent-transfer",
        pageName: "Permanent Transfer",
        element: <PermanentTransfer />
    },
    {
        path: "/asset-management-report",
        pageName: "Asset Management Report",
        element: <AssetManagementReports />
    },
    {
        path: "/generate-qr-code",
        pageName: "Generate QR Code",
        element: <GenerateQrCode />
    },
    {
        path: "/generate-qr-code",
        pageName: "Generate QR Code",
        element: <GenerateQrCode />
    },
    {
        path: "/asset-report",
        pageName: "AssetReport",
        element: <AssetReport />
    },
    // {
    //     path: "/practice",
    //     pageName: "Practice",
    //     element: <Practice />
    // }

]