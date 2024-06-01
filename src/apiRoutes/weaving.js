const pms_base_url = "http://192.168.101.250:8070/api";

// const pms_base_url = "http://203.202.240.228:8070/api";

// order receiving api
export const get_order_type = `${pms_base_url}/WeavingOrderReceiving/GetOrderType`;
export const get_weaving_customer = `${pms_base_url}/WeavingOrderReceiving/GetCustomer`;
export const get_weaving_buyer = `${pms_base_url}/WeavingOrderReceiving/GetBuyer`;
export const get_weaving_color = `${pms_base_url}/WeavingOrderReceiving/GetColor`;
export const get_weaving_fabric_type = `${pms_base_url}/WeavingOrderReceiving/GetFabricType`;
export const get_weaving_composition = `${pms_base_url}/WeavingOrderReceiving/GetComposition`;
export const get_weaving_construction = `${pms_base_url}/WeavingOrderReceiving/Getconstruction`;
export const get_weaving_dia = `${pms_base_url}/WeavingOrderReceiving/GetDia`;
export const get_weaving_gsm = `${pms_base_url}/WeavingOrderReceiving/GetGSM`;
export const get_weaving_design = `${pms_base_url}/WeavingOrderReceiving/GetDesign`;
export const get_weaving_unit = `${pms_base_url}/WeavingOrderReceiving/GetUnit`;

export const get_order_receiving_view = `${pms_base_url}/WeavingOrderReceiving/GetOrderRecevingAddView`;

// save order receiving information
export const save_order_receiving = `${pms_base_url}/WeavingOrderReceiving/SaveOrderReceiving`;
// delete order receiving information
export const delete_order_receiving = `${pms_base_url}/WeavingOrderReceiving/DeleteOrderRecevingAddView`;
// complete order receiving information
export const complete_order_receiving = `${pms_base_url}/WeavingOrderReceiving/CompleteOrderReceving`;

//save costing data
export const save_costing_data = `${pms_base_url}/WeavingFabricCosting/SaveCosting`;

// costing api
export const get_order_info = `${pms_base_url}/WeavingFabricCosting/GetOrderNo`;
export const get_order_info_by_name = `${pms_base_url}/WeavingFabricCosting/GetOrderInfoForCosting`;
export const get_yarn_type = `${pms_base_url}/WeavingFabricCosting/GetYarnType`;
export const get_yarn_count = `${pms_base_url}/WeavingFabricCosting/GetYarnCount`;

// ---------------------------Master Setup Start-------------------------------------
export const weaving_master_setup_customer = `${pms_base_url}/WeavingFabricCosting/getCustomer`;
export const save_weaving_master_setup_customer = `${pms_base_url}/WeavingFabricCosting/SaveCustomer`;
export const weaving_master_setup_yarn_type = `${pms_base_url}/WeavingFabricCosting/SaveYarnType`;
export const get_weaving_yarn_type = `${pms_base_url}/WeavingFabricCosting/GetYarnType`;
export const weaving_master_setup_yarn_count = `${pms_base_url}/WeavingFabricCosting/SaveYarnCount`;
export const get_weaving_yarn_count = `${pms_base_url}/WeavingFabricCosting/GetYarnCount`;

export const weaving_master_setup_dia = `${pms_base_url}/WeavingFabricCosting/SaveDia`;
export const get_weaving_master_setup_dia = `${pms_base_url}/WeavingFabricCosting/GetDia`;

export const weaving_master_setup_composition = `${pms_base_url}/WeavingFabricCosting/SaveFabricComposition`;
export const get_weaving_master_setup_composition = `${pms_base_url}/WeavingFabricCosting/GetFabricComposition`;

export const weaving_master_setup_construction = `${pms_base_url}/WeavingFabricCosting/SaveFabricConstruction`;
export const get_weaving_master_setup_construction = `${pms_base_url}/WeavingFabricCosting/GetFabricConstruction`;

export const weaving_master_setup_design = `${pms_base_url}/WeavingFabricCosting/SaveFabricDesign`;
export const get_weaving_master_setup_design = `${pms_base_url}/WeavingFabricCosting/GetFabricDesign`;
export const weaving_master_setup_gsm = `${pms_base_url}/WeavingFabricCosting/SaveGSM`;
export const get_weaving_master_setup_gsm = `${pms_base_url}/WeavingFabricCosting/GetGSM`;
export const weaving_master_setup_buyer = `${pms_base_url}/WeavingFabricCosting/SaveBuyer`;
export const get_weaving_master_setup_buyer = `${pms_base_url}/WeavingFabricCosting/GetBuyer`;
export const weaving_master_setup_color = `${pms_base_url}/WeavingFabricCosting/SaveColor`;
export const get_weaving_master_setup_color = `${pms_base_url}/WeavingFabricCosting/GetColor`;
// ---------------------------Master Setup End --------------------------------------

// --------------------------- for Approval start -----------------------------------
export const get_weaving_for_approval_view = `${pms_base_url}/WeavingFabricCosting/GetCostingForApproval`;
// --------------------------- for Approval end --------------------------------
export const get_weaving_for_approval_report = `${pms_base_url}/WeavingReport/CostingReport?reportType=pdf`;
export const approve_costing_approval = `${pms_base_url}/WeavingFabricCosting/SCMCostingApprove`;
export const get_scm_data = `${pms_base_url}/WeavingFabricCosting/GetSCMCostingForApproval`;
export const approve_dmm_approval = `${pms_base_url}/WeavingFabricCosting/DMMCostingApprove`;
export const get_dmm_data = `${pms_base_url}/WeavingFabricCosting/GetDMMCostingForApproval`;
export const approve_gm_approval = `${pms_base_url}/WeavingFabricCosting/GMCostingApprove`;
export const get_gm_data = `${pms_base_url}/WeavingFabricCosting/GetGMCostingForApproval`;
export const approve_IA_approval = `${pms_base_url}/WeavingFabricCosting/IACostingApprove`;
export const get_IA_data=`${pms_base_url}/WeavingFabricCosting/GetIACostingForApproval`;
export const approve_MD_data=`${pms_base_url}/WeavingFabricCosting/MDCostingApprove`;
export const get_MD_data=`${pms_base_url}/WeavingFabricCosting/GetMDCostingForApproval`;
