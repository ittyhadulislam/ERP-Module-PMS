// http://192.168.101.250:8020/api/AssetMaster/
const assetManagement_base_url = "http://192.168.101.250:8020/api"
// const assetManagementLocalBaseURL = "http://192.168.100.186:8081/api"

// ===================================== Asset Master ==================================

export const getCompany = `${assetManagement_base_url}/AssetMaster/GetGetCompany`
// export const getCompany = `${assetManagementLocalBaseURL}/AssetMaster/GetGetCompany`
export const getDepartment = `${assetManagement_base_url}/AssetMaster/GetDepartment`
export const getSection = `${assetManagement_base_url}/AssetMaster/GetSection`
export const getFloor = `${assetManagement_base_url}/AssetMaster/GetFloor`
export const getLine = `${assetManagement_base_url}/AssetMaster/GetLine`
export const getAssetCategory = `${assetManagement_base_url}/AssetMaster/GetAssetCategory`
export const getAssetSpecialFeature = `${assetManagement_base_url}/AssetMaster/GetAsstSpecialFeature`
export const getAssetStatus = `${assetManagement_base_url}/AssetMaster/GetAssetStatus`
export const getMachineName = `${assetManagement_base_url}/AssetMaster/GetMachineName`
export const getSupplierName = `${assetManagement_base_url}/AssetMaster/GetSupplierName`
export const getBrand = `${assetManagement_base_url}/AssetMaster/GetBrand`
export const getCurrency = `${assetManagement_base_url}/AssetMaster/GetCurrency`
export const getCurrentHolder = `${assetManagement_base_url}/AssetMaster/BindCURRENTHOLDER`
export const getViewList = `${assetManagement_base_url}/AssetMaster/GetAll_AssetMaster_List`
export const getAssetList = `${assetManagement_base_url}/AssetMaster/Mr_Asset_Master_`
// ----- Post -----
export const saveAsset = `${assetManagement_base_url}/AssetMaster/SaveAsset`
// ===== Update =====
export const updateAsset = `${assetManagement_base_url}/AssetMaster/UpdateAssetInfo`


// ============================== Rented Asset ==============================

export const getCurrentHolderForRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetCURRENT_HOLDER`
export const getFloorRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetBind_Floor`
export const getLineRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetBind_Line`
export const getAssetCategoryRentedAsset = `${assetManagement_base_url}/Rent_Asset/Get_Asset_Category`
export const getAssetSpecialFeatureRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetAsstSpecialFeature`
export const getAssetStatusRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetAssetStatus`
export const getMachineNameRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetMachine_Name`
export const getBrandRentedAsset = `${assetManagement_base_url}/Rent_Asset/Get_Brand`
export const getSupplierRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetSupplierName`
export const getCurrencyRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetCurrency`
export const getViewRentedAsset = `${assetManagement_base_url}/Rent_Asset/GetAssetRentSelect`
// ----- Post -----
export const saveRentedAsset = `${assetManagement_base_url}/Rent_Asset/Rent_Asset_Save`
// ===== Update =====
export const updateRentedAsset = `${assetManagement_base_url}/Rent_Asset/Update_Asset_Rent`



// ============================== Rented Asset Return ==============================
export const getCurrentHolderRentedAssetReturn = `${assetManagement_base_url}/RentedAssetReturn/GetCurrentHolder`
export const getSupplierRentedAssetReturn = `${assetManagement_base_url}/RentedAssetReturn/GetSupplier`
export const getViewInTableRentedAssetReturnDetails = `${assetManagement_base_url}/RentedAssetReturn/GetRentAssetList`
export const getAddViewInTableRentedAssetReturnDetails = `${assetManagement_base_url}/RentedAssetReturn/GetReturnAddView`

// ----- post -----
export const saveRentedReturnAdd = `${assetManagement_base_url}/RentedAssetReturn/PutReturnAdd`
export const saveRentedAssetReturnComplete = `${assetManagement_base_url}/RentedAssetReturn/PutAssetRent`


// ===================================== Rented Asset Return Approval ==================================
export const getDataForApproval = `${assetManagement_base_url}/RentedAssetReturn/ForApproval_Asset_ReturnView`
export const getDataApprovedRentedAssetReturnApproval = `${assetManagement_base_url}/RentedAssetReturn/GetApproval`

// -- Update --
export const updateDataForApproval = `${assetManagement_base_url}/RentedAssetReturn/ForApproval_Asset_Return`



// ===================================== Fixed Asset Transfer ==================================
export const getCompanyFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/Get_Company_CH`
export const getFloorFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/BindFloor`
export const getLineFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/GetLine`
export const getInternalAssetNoFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/IGet_Asst_No`
export const getExternalAssetNoFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/EGet_Asst_No`

export const getViewListInternalFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/GetInternalTransferView`
export const getViewListExternalFixedAssetTransfer = `${assetManagement_base_url}/Asset_Transfer/GetExternalTransferView`

// ----- Post -----
export const saveAssetMasterInternal = `${assetManagement_base_url}/Asset_Transfer/Internal_Transfer_Save`
export const saveAssetMasterExternal = `${assetManagement_base_url}/Asset_Transfer/External_Transfer_Save`

// ===================================== Fixed Asset Transfer Approval ==================================
export const getDataForInternalTransfer = `${assetManagement_base_url}/Asset_Transfer/GetInternalTransferAddView`
export const getDataForExternalTransfer = `${assetManagement_base_url}/Asset_Transfer/GetExternalTransferAddView`
export const getDataFixedAssetTransferApprovalForApproved = `${assetManagement_base_url}/Asset_Transfer/GetTransferView`

// ===================================== Running Repair ==================================

export const getAssetNoRunningRepair = `${assetManagement_base_url}/Asset_Running_Repair/GetAssetNo`
export const getDetailsBasedOnAssetNoRunningRepair = `${assetManagement_base_url}/Asset_Running_Repair/GetAsset_Master_List`
export const getViewInTableRunningRepair = `${assetManagement_base_url}/Asset_Running_Repair/GetMachineRunningRepair_View`

// ----- Post -----
export const saveRunningRepair = `${assetManagement_base_url}/Asset_Running_Repair/Machine_Running_Repairsave`

// ===================================== Schedule Maintenance ==================================
export const getAssetNoScheduleMaintenance = `${assetManagement_base_url}/Schedule_Maintenance/GetAssetNo`
export const getDetailsBasedOnAssetNoScheduleMaintenance = `${assetManagement_base_url}/Schedule_Maintenance/GetAsset_Master_List`

// ----- Post -----
export const saveScheduleMaintenance = `${assetManagement_base_url}/Schedule_Maintenance/ScheduleMaintenanceSave`

// console.log(getLineFixedAssetTransfer)