const base_url = "http://192.168.101.250:8096/commercial_service/api";

export const company = `${base_url}/AllDropdown/GetAccessCompanyByUser`;
export const buyer = `${base_url}/AllDropdown/GetBuyerByCompany`;
export const bank = `${base_url}/AllDropdown/GetBank`;
export const notifyParty = `${base_url}/AllDropdown/GetBuyerAndNotifyParty`;
export const paymentMode = `${base_url}/AllDropdown/GetPaymentMode`;
export const currency = `${base_url}/AllDropdown/GetCurrencyType`;
export const partialShipment = `${base_url}/AllDropdown/GetPartialShipment`;
export const paymentTerm = `${base_url}/AllDropdown/GetPaymentTerm`;
export const shipmentMode = `${base_url}/AllDropdown/GetShippingMode`;
export const status = `${base_url}/AllDropdown/GetContractStatus`;
export const getBackToBackLc = `${base_url}/AllDropdown/GetBackToBackByMLC`;
export const getUnitUrl = `${base_url}/AllDropdown/GetUnit`;

// get contract details
export const getContractDetails = `${base_url}/Contract/GetContractNoDetails`;
export const getAvailableStyle = `${base_url}/Contract/GetAvailableStyleForContract`;
export const getEditAndViewData = `${base_url}/Contract/GetContractEditDetails`;
export const getAmendmentData = `${base_url}/Contract/GetContractAmandmentDetails`;
export const getOtherData = `${base_url}/Contract/GetOldContractNo`;
export const getContractDetailsAmendmentView = `${base_url}/Contract/GetContractDetailAmdHistory`;
export const getContractCancelledView = `${base_url}/Contract/GetContractCancelDetails`;

// save contract details
export const saveContractDetails = `${base_url}/Contract/SaveContractInfo`;
export const contractRename = `${base_url}/Contract/UpdateContractRename`;
export const contractCancel = `${base_url}/Contract/ContractCancelSave`;

// MasterSetup
// ----------------------------------------------------------------
export const addOrEditBank = `${base_url}/MasterSetup/AddOrEditBankInfo`;
export const getAllBankInfo = `${base_url}/MasterSetup/GetAllBankInfo`;
export const saveCurrency = `${base_url}/MasterSetup/SaveCurrencyType`;
export const getAllCurrency = `${base_url}/MasterSetup/GetAllCurrencyType`;
export const addOrEditPaymentTerm = `${base_url}/MasterSetup/AddOrEditPaymentTerm`;
export const getAllPaymentTerm = `${base_url}/MasterSetup/GetAllPaymentTerm`;
export const addOrEditPaymentMode = `${base_url}/MasterSetup/AddOrEditPaymentMode`;
export const getAllPaymentMode = `${base_url}/MasterSetup/GetAllPaymentMode`;

// ----------------------------------------------------------------

// back to back lc api's
export const getLcIssuingBankInfo = `${base_url}/AllDropdown/GetLcIssueBank`;
export const getMasterLcNo = `${base_url}/AllDropdown/GetMasterLcNo`;
export const getSupplier = `${base_url}/AllDropdown/GetSupplier`;
export const GetMasterLcChangeData = `${base_url}/BackToBack/GetMasterLcChangeData`;
export const GetAvailablePIDetails = `${base_url}/BackToBack/GetAvailablePIDetails`;
export const GetB2bOtherCharge = `${base_url}/BackToBack/GetB2B_OtherChargeTbl`;
export const B2bOtherChargeSave = `${base_url}/BackToBack/B2bOtherChargeSave`;
export const saveB2BLC = `${base_url}/BackToBack/Save_B2BLC`;
export const getB2BSelectedData = `${base_url}/BackToBack/GetsB2BSelectedData`;
export const GetOtherChargeByB2B = `${base_url}/BackToBack/GetOtherChargeByB2B`;

export const getAllB2BForEdit = `${base_url}/BackToBack/GetBackToBackAll`;
export const getAllAmendment = `${base_url}/BackToBack/GetAmandmentAll`;
export const getCancelB2b = `${base_url}/BackToBack/GetBackToBackAll_Cancel`;
export const cancelB2B = `${base_url}/BackToBack/SaveBackToBackCancel`;
export const getAmendmentDetails = `${base_url}/BackToBack/GetAmandmentDetailsInfo`;
export const getPiDetailsForModal = `${base_url}/BackToBack/GetStyleInfoByPONum`;
export const getB2bInfoByMaserLc = `${base_url}/BackToBack/GetB2BInfoByMasterLC`;
export const b2bTransferSave = `${base_url}/BackToBack/B2bTransferSave`;
export const renameB2b = `${base_url}/BackToBack/SaveB2BRename`;
// import invoice foreign
export const getForeignSupplier = `${base_url}/AllDropdown/GetForeignSupplier`;
export const getForeignB2b = `${base_url}/AllDropdown/GetBackToBackForImpInvoice`;
export const getForeignPiList = `${base_url}/ImportInvoiceForeign/GetImportFB2bChangeData`;
export const getForeignPiSelected = `${base_url}/ImportInvoiceForeign/GetImportPiSelectedData`;
export const selectGrn = `${base_url}/ImportInvoiceForeign/Save_Import_Foreign`;
export const getDeleteImportForeign = `${base_url}/ImportInvoiceForeign/Get_Delete_Import_Foreign`;
export const importForeignNext = `${base_url}/ImportInvoiceForeign/Import_Foreign_Next`;
export const saveImportForeign = `${base_url}/ImportInvoiceForeign/SaveImport_Foreign_All`;
export const getImportForeign = `${base_url}/ImportInvoiceForeign/Get_Import_ForeignAll`;

// import invoice local
export const getLocalSupplier = `${base_url}/AllDropdown/GetLocalSupplier`;
export const getLocalB2b = `${base_url}/AllDropdown/GetBackToBackForImpInvoice`;
export const getLocalPiList = `${base_url}/ImportInvoiceLocal/GetImportLB2bChangeData`;
export const getLocalPiSelected = `${base_url}/ImportInvoiceLocal/GetImportLocalPiSelectedData`;
export const selectLocalGrn = `${base_url}/ImportInvoiceLocal/Save_Import_Local`;
export const getDeleteImportLocal = `${base_url}/ImportInvoiceLocal/Delete_Import_Local`;
export const importLocalNext = `${base_url}/ImportInvoiceLocal/Import_Local_Next`;
export const saveImportLocal = `${base_url}/ImportInvoiceLocal/SaveImport_Local_All`;
export const getImportLocal = `${base_url}/ImportInvoiceLocal/Get_Import_LocalAll`;

// acceptance
export const getAcceptanceSupplier = `${base_url}/AllDropdown/GetAcceptanceSupplier`;
export const getAcceptanceB2b = `${base_url}/AllDropdown/GetAcceptanceBackToBack`;
export const getInvoiceNo = `${base_url}/AllDropdown/GetAcceptanceInvoiceNo`;
export const getMasterLcByB2b = `${base_url}/AllDropdown/GetAcceptanceMLByB2b`;
export const getAcceptanceInvoiceInfo = `${base_url}/Acceptance/GetAcceptance_InvoiceChange`;
export const getAcceptancePaymentChange = `${base_url}/Acceptance/GetAcceptance_PaymentChange`;
export const saveAcceptance = `${base_url}/Acceptance/Save_Acceptance`;
export const deleteAcceptance = `${base_url}/Acceptance/AcceptanceAddDelete`;
export const getAcceptanceForApp = `${base_url}/Acceptance/GetAcceptance_ForApp`;
export const getAcceptanceForAppEdit = `${base_url}/Acceptance/GetAcceptance_ForAppSelect`;
export const confirmAcceptanceForApp = `${base_url}/Acceptance/AcceptanceConfirmToApp`;
export const getAcceptanceConApp = `${base_url}/Acceptance/GetAcceptance_ConfToApp`;
export const approveAcceptanceForApp = `${base_url}/Acceptance/AcceptanceApprove`;
export const reviseAcceptanceForApp = `${base_url}/Acceptance/AcceptanceRevise`;
export const getAcceptanceApproved = `${base_url}/Acceptance/GetAcceptance_App`;

// export invoice
export const getAllCompany = `${base_url}/AllDropdown/GetAllCompany`;
export const getPortOfLoading = `${base_url}/AllDropdown/GetPortofLoading`;
export const GetFinalDestination = `${base_url}/AllDropdown/GetFinalDestination`;
