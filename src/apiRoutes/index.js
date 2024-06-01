// api base url
// dev server
// const pms_base_url = "http://192.168.101.250:8070/api"; //development server
// main server local ip
// const pms_base_url = "http://192.168.1.42:8070/api";   // local ip
// live server
const pms_base_url = "http://203.202.240.228:8070/api"; // live ip, real ip

// login endpoint
export const login = `${pms_base_url}/Login/LoginUser`;

// menu permissions
export const menu_permissions = `${pms_base_url}/Login/GetPermitedMenu`;
// button permissions
export const button_permissions = `${pms_base_url}/Login/GetPermitedButton`;

//--------------------------- Dashboard START -------------------------------------
export const get_dashboard_style = `${pms_base_url}/DashBoardManager/GetStyleCounts`;
export const get_dashboard_pie = `${pms_base_url}/DashBoardManager/GetCurrentMonthPieChartCutting`;
export const get_dashboard_bar = `${pms_base_url}/DashBoardManager/GetCurrentMonthBarChartCutting`;
//--------------------------- Dashboard END ---------------------------------------

//--------------------------- Cut Master QUERY START -------------------------------
export const company = `${pms_base_url}/Cutting/GetCompany`;
export const cut_year = `${pms_base_url}/Cutting/GetYear`;
export const cut_buyer = `${pms_base_url}/Cutting/GetBuyer`;
export const cut_style = `${pms_base_url}/Cutting/GetStyle`;
export const cut_garments = `${pms_base_url}/Cutting/GetStyleInfo`;
export const cut_view = `${pms_base_url}/Cutting/GetCutMasterView`;
export const cut_size_ratio = `${pms_base_url}/Cutting/GetCuttingSizeRatio`;
export const cut_lay_details = `${pms_base_url}/Cutting/GetCuttingColor`;
export const cut_lay_report = `${pms_base_url}/CuttingReport/Cut_Style_CountryReport?reportType=pdf`;

//--------------------------- Cut Master QUERY END ----------------------------------

//--------------------------- Cut Master MUTATION START -----------------------------
export const cut_select = `${pms_base_url}/Cutting/SaveCutMaster`;
//--------------------------- Cut Master MUTATION END -------------------------------

//--------------------------- Cutting Lay Ratio QUERY START -------------------------
export const lay_year = `${pms_base_url}/Cutting/GetCuttingYear`;
export const lay_style = `${pms_base_url}/Cutting/GetCuttingStyle`;
export const lay_po = `${pms_base_url}/Cutting/GetCuttingPO`;
export const lay_country = `${pms_base_url}/Cutting/GetCuttingCountry`;
export const lay_cut_no = `${pms_base_url}/Cutting/GetCuttingCutNo`;
export const lay_auto_lay = `${pms_base_url}/Cutting/GetCuttingLayNo`;
//--------------------------- Cutting Lay Ratio QUERY END  --------------------------

//--------------------------- Cutting Lay Ratio MUTATION START ----------------------
export const lay_save_cutting = `${pms_base_url}/Cutting/SaveCutting`;
export const lay_save_ratio = `${pms_base_url}/Cutting/SaveCuttingLaySize`;
//--------------------------- Cutting Lay Ratio MUTATION END  -----------------------

// -------------------------- Cutting Approval Query Start --------------------------
export const cutting_for_approval_view = `${pms_base_url}/Cutting/ForApprovalCuttingView`;
export const cutting_approved_view = `${pms_base_url}/Cutting/ApprovalCuttingView`;
export const cutting_approval_report = `${pms_base_url}/CuttingReport/LayWiseReport?reportType=pdf`;

// -------------------------- Cutting Approval Query End ----------------------------

// -------------------------- Cutting Approval Mutation Start ------------------------
export const cutting_approval = `${pms_base_url}/Cutting/ForApprovalCutting`;
export const cancel_cutting = `${pms_base_url}/Cutting/CancelCutting`;
// -------------------------- Cutting Approval Mutation End --------------------------

// -------------------------- Print and Embroidery Query Start -----------------------
export const print_embroidery_style = `${pms_base_url}/PrintEmb/PrintEmbStyle`;
export const print_embroidery_po = `${pms_base_url}/PrintEmb/PrintEmbPO`;
export const print_embroidery_country = `${pms_base_url}/PrintEmb/PrintEmbCountry`;
export const print_embroidery_color = `${pms_base_url}/PrintEmb/PrintEmbColor`;
export const print_embroidery_floor = `${pms_base_url}/PrintEmb/PrintEmbFloor`;
export const print_embroidery_line = `${pms_base_url}/PrintEmb/PrintEmbLine`;
export const print_embroidery_stage = `${pms_base_url}/PrintEmb/PrintEmbStage`;
export const print_embroidery_send_receive = `${pms_base_url}/PrintEmb/PrintEmbSendReceived`;
export const print_embroidery_view = `${pms_base_url}/PrintEmb/PrintEmbEMBView`;
export const print_embroidery_save = `${pms_base_url}/PrintEmb/SavePrintEmbEMBData`;
// -------------------------- Print and Embroidery Query End -------------------------

// -------------------------- Input Cut panel Query Start ----------------------------
export const get_input_style = `${pms_base_url}/Input/GetInputStyle`;
export const get_input_po = `${pms_base_url}/Input/GetInputPO`;
export const get_input_country = `${pms_base_url}/Input/GetInputCountry`;
export const get_input_color = `${pms_base_url}/Input/GetInputColor`;
export const get_input_floor = `${pms_base_url}/Input/GetInputFloor`;
export const get_input_line = `${pms_base_url}/Input/GetInputLine`;
export const get_input_cut_no = `${pms_base_url}/Input/GetInputCutNo`;
export const get_input_cut_panel_view = `${pms_base_url}/Input/GetInputCutPanel`;
export const get_input_cut_panel_add_view = `${pms_base_url}/Input/GetInputCutPanelAddView`;
export const get_input_cut_panel_report = `${pms_base_url}/InputReport/LineWiseInputReport?reportType=pdf`;
// -------------------------- Input Cut panel Query End ------------------------------

// -------------------------- Input Cut panel Mutation Start--------------------------
export const save_input_cut_panel = `${pms_base_url}/Input/SaveInputCutPanel`;
export const delete_input_cut_panel = `${pms_base_url}/Input/DeleteInputCutPanel`;
export const complete_input_cut_panel = `${pms_base_url}/Input/CompleteInputCutPanel`;
// -------------------------- Input Cut panel Mutation End----------------------------

// -------------------------- Input Approval Query Start -----------------------------
export const get_input_for_approval = `${pms_base_url}/Input/GetInputForApproval`;
export const get_input_approval = `${pms_base_url}/Input/GetInputApproval`;
export const get_input_for_approval_report = `${pms_base_url}/InputReport/LineWiseInputChallanReport?reportType=pdf`;
export const get_input_approval_report = `${pms_base_url}/InputReport/LineWiseInputChallanReport?reportType=pdf`;
// -------------------------- Input Approval Query End -------------------------------

// -------------------------- Input Approval Mutation Start --------------------------
export const input_approval = `${pms_base_url}/Input/InputCutPanelApproval`;
export const input_cancel = `${pms_base_url}/Input/InputCutPanelCancel`;
// -------------------------- Input Approval Mutation End ----------------------------

// -------------------------- Input Barcode Query Start ------------------------------
export const get_input_barcode_add_view = `${pms_base_url}/Input/GetInputCutPanelBarcodeAddView`;

// -------------------------- Input Barcode Query End --------------------------------

// -------------------------- Input Barcode Mutation Start ---------------------------
export const save_input_barcode = `${pms_base_url}/Input/SaveInputCutPanelForBarCode`;
export const delete_input_barcode = `${pms_base_url}/Input/DeleteInputCutPanelBarcode`;
export const complete_input_barcode = `${pms_base_url}/Input/CompleteInputCutPanelBarcode`;
// -------------------------- Input Barcode Mutation End ----------------------------

// -------------------------- Barcode Approval Query Start ---------------------------
export const get_barcode_for_approval = `${pms_base_url}/Input/GetInputBarcodeForApproval`;
export const get_barcode_approval = `${pms_base_url}/Input/GetInputBarcodeApproval`;
// -------------------------- Barcode Approval Query End -----------------------------

// -------------------------- Barcode Approval Mutation Start ------------------------
export const barcode_approval = `${pms_base_url}/Input/InputCutPanelBarcodeApproval`;
export const barcode_cancel = `${pms_base_url}/Input/InputCutPanelBarcodeCancel`;
// -------------------------- Barcode Approval Mutation End --------------------------

// -------------------------- Fabric Query Start -------------------------------------
export const get_fabric_buyer = `${pms_base_url}/FabricClosing/GetBuyer`;
export const get_fabric_style = `${pms_base_url}/FabricClosing/GetStyle`;
export const get_fabric_color = `${pms_base_url}/FabricClosing/GetColor`;
export const get_fabric = `${pms_base_url}/FabricClosing/GetFabricName`;
export const get_order_qty = `${pms_base_url}/FabricClosing/GetGMTOrdQty`;
export const get_cut_qty = `${pms_base_url}/FabricClosing/GetCutQty`;
// -------------------------- Fabric Query End ---------------------------------------

// -------------------------- Fabric Mutation Start -----------------------------------
export const save_fabric = `${pms_base_url}/FabricClosing/SaveFabricClosing`;
// -------------------------- Fabric Mutation End -------------------------------------

// -------------------------- sewing line details query start--------------------------
export const get_line_details_view = `${pms_base_url}/LineDetails/GetLineDetails`;
export const get_line_details_for_update = `${pms_base_url}/LineDetails/GetLineDetailsForEdit`;
export const get_line_details_report = `${pms_base_url}/LineDetails/DailyLineDetailsReport?reportType=pdf`;
// -------------------------- sewing line details query end----------------------------

// -------------------------- sewing line details mutation start------------------------
export const save_line_details = `${pms_base_url}/LineDetails/SaveLineDetail`;
export const update_line_details = `${pms_base_url}/LineDetails/UpdateLineDetail`;
// -------------------------- sewing line details mutation end--------------------------

// -------------------------- sewing production query start-----------------------------
export const get_sewing_style = `${pms_base_url}/Sewing/GetSewingStyle`;
export const get_sewing_po = `${pms_base_url}/Sewing/GetSewingPO`;
export const get_sewing_country = `${pms_base_url}/Sewing/GetSewingCountry`;
export const get_sewing_color = `${pms_base_url}/Sewing/GetSewingColor`;
export const get_sewing_line = `${pms_base_url}/Sewing/GetSewingLine`;
export const get_sewing_size = `${pms_base_url}/Sewing/GetSewingSize`;
export const get_sewing_hourly_prod = `${pms_base_url}/Sewing/GetSewingHourlyProduction`;
export const get_sewing_report_daily_line_stage = `${pms_base_url}/SewingReport/DailyLineStageWiseSewingReport?reportType=pdf`;
export const get_sewing_ship_out = `${pms_base_url}/Sewing/GetShiptOutStyle`;

// -------------------------- sewing production query end ------------------------------

// -------------------------- sewing production mutation end ---------------------------
export const save_sewing_production = `${pms_base_url}/Sewing/SaveSewingData`;
export const active_sewing_production = `${pms_base_url}/Sewing/ActiveShipOut`;
export const inActive_sewing_production = `${pms_base_url}/Sewing/InActiveShipOut`;
// -------------------------- sewing production mutation end ---------------------------

// -------------------------- sewing hourly production query start----------------------
export const get_hourly_production_dashboard = `${pms_base_url}/Sewing/GetHourlyProductionDashBoard`;
export const get_hourly_production_report = `${pms_base_url}/SewingReport/HourlyProductionReport?reportType=pdf`;
// -------------------------- sewing hourly production query end------------------------

// -------------------------- SMV query start ------------------------------------------
export const get_smv_buyer = `${pms_base_url}/ProductionSMV/GetBuyerForSMV`;
export const get_smv_style = `${pms_base_url}/ProductionSMV/GetStyleForSMV`;
export const get_smv_styleIfo_for_SMV = `${pms_base_url}/ProductionSMV/GetStyleInfoForSMV`;
// -------------------------- SMV query end --------------------------------------------
// -------------------------- SMV mutation start ---------------------------------------
export const save_smv = `${pms_base_url}/ProductionSMV/SaveSMVData`;
// -------------------------- SMV mutation end -----------------------------------------

// -------------------------- Finishing query start ------------------------------------
export const get_finish_style = `${pms_base_url}/Finishing/GetFinishingStyle`;
export const get_finish_po = `${pms_base_url}/Finishing/GetFinishingPO`;
export const get_finish_country = `${pms_base_url}/Finishing/GetFinishingCountry`;
export const get_finish_color = `${pms_base_url}/Finishing/GetFinishingColor`;
export const get_finish_floor = `${pms_base_url}/Finishing/GetFinishingFloor`;
export const get_finish_line = `${pms_base_url}/Finishing/GetFinishingLine`;
export const get_finish_size = `${pms_base_url}/Finishing/GetFinishingSize`;
export const get_finish_hourly_production = `${pms_base_url}/Finishing/GetFinishingHourlyProduction`;
// -------------------------- Finishing query end --------------------------------------

// -------------------------- Finishing mutation start ---------------------------------
export const save_finishing_production = `${pms_base_url}/Finishing/SaveFinishingData`;
// -------------------------- Finishing mutation end -----------------------------------

// -------------------------- Finishing query start ------------------------------------
export const get_packing_style = `${pms_base_url}/Packing/GetPackingStyle`;
export const get_packing_po = `${pms_base_url}/Packing/GetPackingPO`;
export const get_packing_country = `${pms_base_url}/Packing/GetPackingCountry`;
export const get_packing_color = `${pms_base_url}/Packing/GetPackingColor`;
export const get_packing_floor = `${pms_base_url}/Packing/GetPackingFloor`;
export const get_packing_line = `${pms_base_url}/Packing/GetPackingLine`;
export const get_packing_size = `${pms_base_url}/Packing/GetPackingSize`;
export const get_packing_hourly_production = `${pms_base_url}/Packing/GetPackingHourlyProduction`;

export const get_packing_report_country = `${pms_base_url}/PackingReport/GetPackingCountry`;

export const get_packing_daily_report = `${pms_base_url}/PackingReport/DailyPackingReport?reportType=pdf`;
export const get_packing_report_country_wise = `${pms_base_url}/PackingReport/CountryWisePackingReport?reportType=pdf`;

// -------------------------- Finishing query end --------------------------------------

// -------------------------- Finishing mutation start ---------------------------------
export const save_packing_production = `${pms_base_url}/Packing/SavePackingData`;
// -------------------------- Finishing mutation end -----------------------------------

// -------------------------- Finishing Report start -----------------------------------
export const daily_finishing_report = `${pms_base_url}/FinishingReport/DailyFinishingReport?reportType=pdf`;
// -------------------------- Finishing Report end -------------------------------------

// -------------------------- Export challan query start -------------------------------
export const get_export_sewing_factory = `${pms_base_url}/Export/GetExportCompany`;
export const get_export_buyer = `${pms_base_url}/Export/GetExportBuyer`;
export const get_export_style = `${pms_base_url}/Export/GetExportStyle`;
export const get_export_delivery_to = `${pms_base_url}/Export/GetExportDeliveryTo`;
export const get_export_depo_name = `${pms_base_url}/Export/GetExportDepoName`;
export const get_export_po_no = `${pms_base_url}/Export/GetExportPO`;
export const get_export_production_country = `${pms_base_url}/Export/GetExportCountry`;
export const get_export_ship_country = `${pms_base_url}/Export/GetExportShiptCountry`;
export const get_export_color = `${pms_base_url}/Export/GetExportColor`;
export const get_export_company = `${pms_base_url}/Export/GetExportShiftOutFrom`;
export const get_export_floor = `${pms_base_url}/Export/GetExportFloor`;
export const get_export_ship_mode = `${pms_base_url}/Export/GetExportShipMode`;
export const get_export_gmt_qty = `${pms_base_url}/Export/GetExportGMTUnit`;
export const get_export_unit = `${pms_base_url}/Export/GetExportUnit`;
export const get_export_data = `${pms_base_url}/Export/GetExportData`;
export const get_export_add_view_data = `${pms_base_url}/Export/GetExportAddView`;
// -------------------------- Export challan query end --------------------------------

// -------------------------- Export challan Mutation Start ---------------------------
export const save_export_data = `${pms_base_url}/Export/SaveExportData`;
export const delete_export_data = `${pms_base_url}/Export/DeleteExportAddData`;
export const complete_export_data = `${pms_base_url}/Export/CompleteExportData`;
// -------------------------- Export challan Mutation end -----------------------------

// -------------------------- Export for approval query start -------------------------
export const get_export_for_approval_data = `${pms_base_url}/ExportApproval/GetExportForApproval`;
export const get_export_approval_data = `${pms_base_url}/ExportApproval/GetExportApproval`;
export const get_export_for_approval_report = `${pms_base_url}/ExportReport/ExportRefWiseReport?reportType=pdf`;
export const approve_export_data = `${pms_base_url}/ExportApproval/ApproveExportData`;
export const cancel_export_data = `${pms_base_url}/ExportApproval/CancelExportData`;
// -------------------------- Export for approval query end ---------------------------

// -------------------------- Export report query start -------------------------------
export const get_daily_export_report = `${pms_base_url}/ExportReport/ExportDailyReport?reportType=pdf`;
export const get_export_style_wise_report = `${pms_base_url}/ExportReport/ExportStyleWiseReport?reportType=pdf`;
// -------------------------- Export report query end ---------------------------------

//--------------------------- SCM QUERY START -----------------------------------------
export const style = `${pms_base_url}/PriceComparisonManager/GetStyle`;
export const currency = `${pms_base_url}/PriceComparisonManager/GetCurrency`;
export const style_details = `${pms_base_url}/PriceComparisonManager/GetByStyle`;
export const master_category = `${pms_base_url}/PriceComparisonManager/GetMaterCategory`;
export const main_category = `${pms_base_url}/PriceComparisonManager/GetMainCategoryByMasterCate`;
export const sub_category = `${pms_base_url}/PriceComparisonManager/GetSubcateroryByMainCate`;
export const constriction = `${pms_base_url}/PriceComparisonManager/GetConstructionByMainCate`;
export const dimension = `${pms_base_url}/PriceComparisonManager/GetDimensionByMainCate`;
export const finishing = `${pms_base_url}/PriceComparisonManager/GetFinishingTypeByMainCate`;
export const unit = `${pms_base_url}/PriceComparisonManager/GetUnitBySubCate`;
export const color = `${pms_base_url}/PriceComparisonManager/GetColor`;
export const suppler = `${pms_base_url}/PriceComparisonManager/GetSupplierByMainCate`;
export const payment = `${pms_base_url}/PriceComparisonManager/GetPaymentType`;
export const price = `${pms_base_url}/PriceComparisonManager/GetPriceTerms`;
export const ship = `${pms_base_url}/PriceComparisonManager/GetShipMode`;
export const cost = `${pms_base_url}/PriceComparisonManager/GetTestCost`;
export const quality = `${pms_base_url}/PriceComparisonManager/GetQulityStatus`;
export const csAddView = `${pms_base_url}/PriceComparisonManager/GetCSAddView`;
export const csNo = `${pms_base_url}/PriceComparisonManager/GetCSNO`;
export const infoByStyleEdit = `${pms_base_url}/PriceComparisonManager/GetInfoByStyleEdit`;
export const for_approval_price_view = `${pms_base_url}/PriceComparisonManager/ForApprovalPriceComparisionView`;
export const scm_view = `${pms_base_url}/PriceComparisonManager/SCMApprovalView`;
export const concern_view = `${pms_base_url}/PriceComparisonManager/MerchantApprovalView`;
export const mm_view = `${pms_base_url}/PriceComparisonManager/MMApprovalView`;
export const dmm_view = `${pms_base_url}/PriceComparisonManager/DMMApprovalView`;
export const ia_view = `${pms_base_url}/PriceComparisonManager/IAApprovalView`;
export const md_view = `${pms_base_url}/PriceComparisonManager/MDApprovalView`;
export const get_main_category = `${pms_base_url}/PriceComparisonManager/GetMainCategoryWithoutMasterCate`;
export const get_unit_price_comparison = `${pms_base_url}/PriceComparisonManager/GetUnit`;
export const get_sub_cat_view = `${pms_base_url}/PriceComparisonManager/GetSubCatetoryView`;
export const get_construction_view = `${pms_base_url}/PriceComparisonManager/GetConstructionView`;
export const get_dimension_view = `${pms_base_url}/PriceComparisonManager/GetDimensionView`;
export const get_finish_view = `${pms_base_url}/PriceComparisonManager/GetFinishedView`;
export const get_cs_view = `${pms_base_url}/PriceComparisonManager/CheckApprovalView`;

//---------------------------------SCM QUERY END ----------------------------------

// --------------------------------SCM MUTATION START------------------------------
export const create_post_cost_comparison = `${pms_base_url}/PriceComparisonManager/PostPriceComparision`;
export const update_post_cost_comparison = `${pms_base_url}/PriceComparisonManager/UpdatePriceComparision`;
export const delete_post_cost_comparison = `${pms_base_url}/PriceComparisonManager/DeletePriceComparision`;
export const complete_post_cost_comparison = `${pms_base_url}/PriceComparisonManager/CompletePriceComparision`;
export const scm_approval = `${pms_base_url}/PriceComparisonManager/SCMApprovePriceComparision`;
export const rework_price = `${pms_base_url}/PriceComparisonManager/SCMReworkPriceComparision`;
export const concern_approval = `${pms_base_url}/PriceComparisonManager/MerchantApprovePriceComparision`;
export const mm_approval = `${pms_base_url}/PriceComparisonManager/MMApprovePriceComparision`;
export const dmm_approval = `${pms_base_url}/PriceComparisonManager/DMMApprovePriceComparision`;
export const Ia_approval = `${pms_base_url}/PriceComparisonManager/IAApprovePriceComparision`;
export const md_approval = `${pms_base_url}/PriceComparisonManager/MDApprovePriceComparision`;
export const save_sub_category = `${pms_base_url}/PriceComparisonManager/SaveSubCategory`;
export const save_construction = `${pms_base_url}/PriceComparisonManager/SaveConstruction`;
export const save_dimension = `${pms_base_url}/PriceComparisonManager/SaveDimension`;
export const save_finish = `${pms_base_url}/PriceComparisonManager/SaveFinished`;

// ----------------------------SCM MUTATION END------------------------------------------
// ----------------------------Gate Pass Query Start-------------------------------------
export const get_gate_pass_type = `${pms_base_url}/GeneralGatePass/GetGatePassType`;
export const get_gate_pass_company = `${pms_base_url}/GeneralGatePass/GetCompany`;
export const get_gate_pass_department = `${pms_base_url}/GeneralGatePass/GetDepartment`;
export const get_gate_pass_section = `${pms_base_url}/GeneralGatePass/GetSection`;
export const get_gate_pass_store = `${pms_base_url}/GeneralGatePass/GetStore`;
export const get_gate_pass_unit = `${pms_base_url}/GeneralGatePass/GetUnit`;
export const get_gate_pass_status = `${pms_base_url}/GeneralGatePass/GetGPStatus`;
export const get_gate_pass_add_view = `${pms_base_url}/GeneralGatePass/GetGatePassAddView`;
export const get_gate_pass_add_view_details = `${pms_base_url}/GeneralGatePass/GetGatePassViewDetails`;
export const get_gate_pass_add_view_report = `${pms_base_url}/GatePassReport/GeneralGatePassReport?reportType=pdf`;
// ----------------------------Gate Pass Query End---------------------------------------
// ----------------------------Merchant Gate Pass Query Start----------------------------
export const get_merchant_gate_pass_buyer = `${pms_base_url}/MarchantGatePass/GetBuyer`;
export const get_merchant_gate_pass_style = `${pms_base_url}/MarchantGatePass/GetStyle`;
export const get_merchant_gate_pass_item_type = `${pms_base_url}/MarchantGatePass/GetItemType`;
export const get_merchant_gate_pass_deliver_to = `${pms_base_url}/MarchantGatePass/GetDeliveryTo`;
export const get_merchant_gate_pass_add_view = `${pms_base_url}/MarchantGatePass/GetMarchantGatePassAddView`;
export const get_merchant_gate_pass_add_view_details = `${pms_base_url}/MarchantGatePass/GetMarchantGatePassViewDetails`;
export const get_merchant_gate_pass_add_view_report = `${pms_base_url}/GatePassReport/MerchantGatePassReport?reportType=pdf`;
export const get_merchant_gate_pass_delivery_destination = `${pms_base_url}/MarchantGatePass/GetDeliveryInfoView`;
export const get_merchant_gate_pass_item_type_view = `${pms_base_url}/MarchantGatePass/GetItemTypeView`;
// ----------------------------Merchant Gate Pass Query End------------------------------

// ----------------------------Gate Pass Mutation start----------------------------------
export const save_gate_pass_data = `${pms_base_url}/GeneralGatePass/SaveGatePassData`;
export const delete_gate_pass_data = `${pms_base_url}/GeneralGatePass/DeleteGatePassData`;
export const complete_gate_pass_data = `${pms_base_url}/GeneralGatePass/CompleteGatePass`;
// ----------------------------Gate Pass Mutation End------------------------------------
// ----------------------------Merchant Gate Pass Mutation start-------------------------
export const save_merchant_gate_pass_data = `${pms_base_url}/MarchantGatePass/SaveMarchantGatePass`;
export const delete_merchant_gate_pass_data = `${pms_base_url}/MarchantGatePass/DeleteMarchantGatePass`;
export const complete_merchant_gate_pass_data = `${pms_base_url}/MarchantGatePass/CompleteMarchantGatePassGatePass`;
export const save_merchant_delivery_information = `${pms_base_url}/MarchantGatePass/SaveDeliveryInformation`;
export const update_merchant_delivery_information = `${pms_base_url}/MarchantGatePass/UpdateDeliveryInformation`;
export const save_merchant_item_type = `${pms_base_url}/MarchantGatePass/SaveItemType`;
export const update_merchant_item_type = `${pms_base_url}/MarchantGatePass/UpdateItemType`;
export const cancel_merchant_item_type = `${pms_base_url}/MarchantGatePass/CancelGatePass`;
// ---------------------------- Merchant Gate Pass Mutation End---------------------------

// ---------------------------- Gate Pass For Approval General Query Start ---------------
export const get_general_check_by_view = `${pms_base_url}/GeneralGatePassManagerForApproval/GetCheckByView`;
export const get_general_confirm_by_view = `${pms_base_url}/GeneralGatePassManagerForApproval/GetConfirmByView`;
export const get_general_approve_by_view = `${pms_base_url}/GeneralGatePassManagerForApproval/GetApproveByView`;
export const get_general_gift_approve_by_view = `${pms_base_url}/GeneralGatePassManagerForApproval/GetGiftApproveByView`;
export const get_general_dispose_by_view = `${pms_base_url}/GeneralGatePassManagerForApproval/GetDisposeApproveByView`;
export const get_general_view_details = `${pms_base_url}/GeneralGatePassManagerForApproval/GetViewDetails`;

// ---------------------------- Gate Pass For Approval General Query End -----------------
// ---------------------------- Gate Pass For Approval Merchant Query Start ---------------
export const get_merchant_check_by_view = `${pms_base_url}/MerchantGatePassForApproval/GetMerchantCheckByView`;
export const get_merchant_confirm_by_view = `${pms_base_url}/MerchantGatePassForApproval/GetMerchantConfirmByView`;
export const get_merchant_approve_by_view = `${pms_base_url}/MerchantGatePassForApproval/GetMerchantApproveByView`;
export const get_merchant_dispose_by_view = `${pms_base_url}/MerchantGatePassForApproval/GetMerchantDisposeApproveByView`;
export const get_merchant_view_details = `${pms_base_url}/MerchantGatePassForApproval/GetMerchantViewDetails`;

// ---------------------------- Gate Pass For Approval General Query End -----------------

// ---------------------------- Gate Pass For Approval Button api start ------------------
export const check_by_general_for_approval = `${pms_base_url}/GeneralGatePassManagerForApproval/UpdateCheckByGP`;
export const return_general_for_approval = `${pms_base_url}/GeneralGatePassManagerForApproval/UpdateReturnByGP`;
export const cancel_general_for_approval = `${pms_base_url}/GeneralGatePassManagerForApproval/UpdateGiftCancelByGP`;
export const confirm_general_for_approval = `${pms_base_url}/GeneralGatePassManagerForApproval/UpdateConfirmByGP`;
export const approve_general_for_approval = `${pms_base_url}/GeneralGatePassManagerForApproval/UpdateApproveByGP`;
export const dispose_general_for_approval = `${pms_base_url}/GeneralGatePassManagerForApproval/UpdateDisposeByGP`;
// ---------------------------- Gate Pass For Approval Button api end --------------------

// ---------------------------- Gate Pass Return Goods Receive Query Start ---------------
export const get_return_goods_receive = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassCategory`;
export const get_return_goods_receive_section = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassSection`;
export const get_return_goods_receive_gate_pass = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassGPNo`;
export const get_return_goods_receive_view = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassView`;
export const get_return_goods_receive_view_after_add = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassAddView`;
export const ger_general_veiw_return_goods_receive_gate_pass = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassGeneralView`;
export const ger_merchant_veiw_return_goods_receive_gate_pass = `${pms_base_url}/ReturnGoodsReceivedNote/GetRtnGoodsRecvdGatePassMerchantView`;
export const ger_report_return_goods_receive_gate_pass = `${pms_base_url}/GatePassReport/ReturnGatePassReceivedReport?reportType=pdf`;
// ---------------------------- Gate Pass Return Goods Receive Query End -----------------

// ---------------------------- Gate Pass Return Goods Receive Mutation Start ------------
export const save_gate_pass_return_receive = `${pms_base_url}/ReturnGoodsReceivedNote/SaveGatePassReturnReceived`;
export const delete_gate_pass_return_receive = `${pms_base_url}/ReturnGoodsReceivedNote/DeleteGetRtnGoodsRecvdGatePassAddView`;
export const complete_gate_pass_return_receive = `${pms_base_url}/ReturnGoodsReceivedNote/CompleteRtnGoodsRecvdGatePass`;
// ---------------------------- Gate Pass REturn Goods Receive Mutation End --------------

// ---------------------------- Gate Pass Report  Query Start ----------------------------
export const gate_pass_general_report_daily = `${pms_base_url}/GatePassReport/DailyGenGatePassReport?reportType=pdf`;
export const gate_pass_general_report_date_to_data = `${pms_base_url}/GatePassReport/D2DGenGatePassReport?reportType=pdf`;
export const gate_pass_general_report_return_date_to_data = `${pms_base_url}/GatePassReport/D2DReturnGatePassReceivedReport?reportType=pdf`;
export const gate_pass_general_report_return_dpt_status = `${pms_base_url}/GatePassReport/D2DGenGatePassDPTSTSReport?reportType=pdf`;

export const gate_pass_merchant_report_daily = `${pms_base_url}/GatePassReport/DailyMerchantGatePassReport?reportType=pdf`;
export const gate_pass_merchant_report_date_to_data = `${pms_base_url}/GatePassReport/D2DMerchantGatePassReport?reportType=pdf`;
export const gate_pass_merchant_report_return_date_to_data = `${pms_base_url}/GatePassReport/D2DMerchantReturnGatePassReceivedReport?reportType=pdf`;
export const gate_pass_merchant_report_return_dpt_status = `${pms_base_url}/GatePassReport/D2DMerchantGatePassDPTSTSReport?reportType=pdf`;
export const gate_pass_merchant_report_style_wise = `${pms_base_url}/GatePassReport/StyleWiseGatePassReport?reportType=pdf`;
// api/GatePassReport/D2DMerchantReturnGatePassReceivedReport?reportType=pdf&comID=49&fdate=1%2F1%2F2024&tdate=1%2F1%2F2024&UserName=m
// api/GatePassReport/D2DMerchantGatePassReport?reportType=pdf&comID=49&fdate=1%2F1%2F2024&tdate=1%2F1%2F2024&UserName=1
// api/GatePassReport/D2DMerchantGatePassDPTSTSReport?reportType=pdf&comID=49&dept=1&status=1&fdate=1%2F1%2F2024&tdate=1%2F1%2F2024&UserName=1

// api/GatePassReport/StyleWiseGatePassReport?reportType=pdf&comID=49&buyer=1&style=1&UserName=1
// ---------------------------- Gate Pass Report  Query End ------------------------------

// ---------------------------- SUPPLIER PORTAL QUERY START ------------------------------
export const supplier_info = `${pms_base_url}/SupplierInfo/GetSupplierInfoByUID`;
export const supplier_info_by_sup = `${pms_base_url}/SupplierInfo/GetSupplierInfoBySup`;
export const supplier_category = `${pms_base_url}/SupplierInfo/GetCategory`;
export const supplier_type = `${pms_base_url}/SupplierInfo/GetSupplierType`;
export const business_type = `${pms_base_url}/SupplierInfo/GetBusinessType`;
export const country = `${pms_base_url}/SupplierInfo/GetCountry`;
export const supplier_info_status = `${pms_base_url}/SupplierInfo/GetSatus`;
export const BSCI_audit_rating = `${pms_base_url}/SupplierInfo/GetBSCIAuditRating`;
export const WRAP_audit_rating = `${pms_base_url}/SupplierInfo/GetWRAPAuditRating`;
export const get_unit = `${pms_base_url}/SupplierInfo/GetUnit`;
export const get_supplier_for_approval = `${pms_base_url}/SupplierInfo/GetSupplierForApproval`;
export const get_supplier_approved = `${pms_base_url}/SupplierInfo/GetSupplierApproved`;

// ------------------------------- SUPPLIER PORTAL QUERY END -----------------------------
// ------------------------------- SUPPLIER PORTAL MUTATION START ------------------------

export const supplier_info_save = `${pms_base_url}/SupplierInfo/SaveSupplierInfo`;
export const supplier_info_update = `${pms_base_url}/SupplierInfo/UpdateSupplierInfo`;
export const supplier_info_update_step2 = `${pms_base_url}/SupplierInfo/UpdateSupplierInfoStep02`;
export const supplier_info_update_step3 = `${pms_base_url}/SupplierInfo/UpdateSupplierInfoStep03`;
export const supplier_info_update_step4 = `${pms_base_url}/SupplierInfo/UpdateSupplierInfoStep04`;
export const supplier_info_update_step5 = `${pms_base_url}/SupplierInfo/UpdateSupplierInfoStep05`;
export const supplier_info_update_step6 = `${pms_base_url}/SupplierInfo/UpdateSupplierInfoStep06`;
export const supplier_info_for_approval = `${pms_base_url}/SupplierInfo/PutSupplierForApproval`;
export const supplier_info_approved = `${pms_base_url}/SupplierInfo/PutSupplierApproval`;
// -------------------------- SUPPLIER PORTAL MUTATION END ----------------------------------

// -------------------------- REPORT START---------------------------------------------------
export const cs_report = `${pms_base_url}/CSReport/CSReport?reportType=pdf`;
export const supplier_report = `${pms_base_url}/CSReport/SupplierReport?reportType=PDF`;
export const sewing_report_style_wise = `${pms_base_url}/SewingReport/StyleWiseSewingReport`;
export const sewing_closing_report_style_wise = `${pms_base_url}/SewingReport/StyleWiseClosingSewingReport`;
export const daily_sewing_report = `${pms_base_url}/SewingReport/DailySewingReport`;
export const sewing_report_po_wise = `${pms_base_url}/SewingReport/PoWiseSewingReport`;
export const sewing_report_country_wise = `${pms_base_url}/PackingReport/StylePOCountryWisePackingReport`; ///api/PackingReport/StylePOCountryWisePackingReport
export const sewing_report_style_and_po_wise = `${pms_base_url}/SewingReport/StyleWisePoWiseSewingReport`;
export const sewing_report_daily_variance = `${pms_base_url}/SewingReport/DailyProductionVarianceSewingReport`;
export const daily_input_report = `${pms_base_url}/InputReport/DailyInputReport`;
export const input_to_sewing_wip_report = `${pms_base_url}/InputReport/InputToSewingWIPReport`;
export const input_summery_by_D2D_report = `${pms_base_url}/InputReport/InputSummaryByD2DReport`;
export const input_report_style_wise = `${pms_base_url}/InputReport/InputStyleWiseReport`;
export const input_report_po_wise = `${pms_base_url}/InputReport/InputStylePOWiseReport`;
export const input_report_po_and_line_wise = `${pms_base_url}/InputReport/InputStylePOLineWiseReport`;
export const input_report_floor_line_wise = `${pms_base_url}/InputReport/DailyInputStylePOFloorWiseReport`;
export const cutting_report = `${pms_base_url}/CuttingReport/DailyCuttingReport`;
export const cutting_summery_D2D_report = `${pms_base_url}/CuttingReport/CuttingSummaryD2DReport`;
export const cutting_report_style_wise = `${pms_base_url}/CuttingReport/StyleWiseCuttingToInputReport`;
export const cutting_report_po_wise = `${pms_base_url}/CuttingReport/StylePOWiseCuttingToInputReport`;
export const cutting_report_style_wise_closing = `${pms_base_url}/CuttingReport/StyleWiseClosingCuttingToInputReport`;
export const cutting_report_style_po_lay_wise = `${pms_base_url}/CuttingReport/StylePOLayWiseReport`;
export const no_scan_barcode_report = `${pms_base_url}/SewingReport/NoScanBarcodeReport`;

// -------------------------- REPORT END-----------------------------------------------------

//get company by user Id
export const get_company_by_user_id = `${pms_base_url}/Cutting/GetCompanyUserWise`;
// get buyer by company
export const get_buyer_by_company = `${pms_base_url}/Sewing/GetBuyer`;
// get style by buyer
export const get_style_by_buyer = `${pms_base_url}/Sewing/GetStyle`;
export const get_style_by_buyer_cutting_report = `${pms_base_url}/Cutting/GetCuttingStyleReport`;
// get po by style
export const get_po_by_style = `${pms_base_url}/Sewing/GetPO`;
// get lay by style and po
export const get_lay_by_style_and_po = `${pms_base_url}/Cutting/GetLay`;

export const barcode_Approval = `${pms_base_url}/Barcode_Approval/GetBarcodeForApproval`;

// master setup api
export const getCompanyInfo = `${pms_base_url}/Master_Setup/GetCompany`;

// -------------------------------------scm master setup api --------------------------------
export const create_and_update_supplier = `${pms_base_url}/SupplierInfo/SaveSupplierName`;
export const get_supplier_details = `${pms_base_url}/SupplierInfo/GetSupplierNameView`;
export const get_supplier_name = `${pms_base_url}/SupplierInfo/GetSupplierName`;
export const generate_supplier_code = `${pms_base_url}/SupplierInfo/GenerateSupplierCode`;
