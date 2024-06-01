import { setEditOrderReceive } from "../../../redux/features/weaving/orderReceive/editOrderReceiveSlice";
import { setOrderReceive } from "../../../redux/features/weaving/orderReceive/orderReceiveSlice";

export const setEditState = (selectedTableRow, dispatch) => {
  if (selectedTableRow) {
    dispatch(
      setOrderReceive({
        key: "orderType",
        value: {
          ordt_id: selectedTableRow?.ordt_id,
          ordt_desc: selectedTableRow?.ordt_desc,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "customer",
        value: {
          nBuyer_ID: selectedTableRow?.customerID,
          cBuyer_Name: selectedTableRow?.customer_name,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "buyer",
        value: {
          buyer_ID: selectedTableRow?.buyer_ID,
          buyer_name: selectedTableRow?.buyer_name,
        },
      })
    );
    // dispatch(
    //   setOrderReceive({
    //     key: "color",
    //     value: {
    //       col_ID: selectedTableRow?.gmt_color_id,
    //       color: selectedTableRow?.gmt_color,
    //     },
    //   })
    // );
    dispatch(
      setOrderReceive({
        key: "fabricType",
        value: {
          ft_id: selectedTableRow?.ft_id,
          ft_description: selectedTableRow?.ft_description,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "design",
        value: {
          fd_id: selectedTableRow?.fd_id,
          fd_design: selectedTableRow?.fd_design,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "fabricComposition",
        value: {
          fcom_id: selectedTableRow?.fcom_id,
          fcom_composition: selectedTableRow?.fcom_composition,
        },
      })
    );

    dispatch(
      setOrderReceive({
        key: "fabricConstruction",
        value: {
          fc_id: selectedTableRow?.fc_id,
          fc_construction: selectedTableRow?.fc_construction,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "dia",
        value: {
          dia_id: selectedTableRow?.dia_id,
          dia_name: selectedTableRow?.finishedDia,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "fabricColor",
        value: {
          col_ID: selectedTableRow?.fabColor_ID,
          color: selectedTableRow?.fabric_color,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "gsm",
        value: {
          gsm_id: selectedTableRow?.gsm_id,
          gsm_description: selectedTableRow?.gsm_description,
        },
      })
    );
    dispatch(
      setOrderReceive({
        key: "unit",
        value: {
          unit_id: selectedTableRow?.unit_id,
          unit_name: selectedTableRow?.unit_name,
        },
      })
    );
    // dispatch(
    //   setOrderReceive({
    //     key: "design",
    //     value: {
    //       fcom_id: selectedTableRow?.fd_id,
    //       fcom_composition: selectedTableRow?.fd_design,
    //     },
    //   })
    // );
    dispatch(
      setOrderReceive({
        key: "fabricConsumption",
        value: selectedTableRow?.or_consumption,
      })
    );
    dispatch(
      setOrderReceive({
        key: "gmtName",
        value: selectedTableRow?.or_gmt_name,
      })
    );
    dispatch(
      setOrderReceive({
        key: "orderNo",
        value: selectedTableRow?.or_style_no,
      })
    );
    dispatch(
      setOrderReceive({
        key: "gmtQty",
        value: selectedTableRow?.or_gmt_qty,
      })
    );
    // dispatch(
    //   setOrderReceive({
    //     key: "fabricQty",
    //     value: selectedTableRow?.or_fabric_qty,
    //   })
    // );
    dispatch(
      setOrderReceive({
        key: "orderReceiveDate",
        value: selectedTableRow?.or_rcvd_date,
      })
    );
    dispatch(
      setOrderReceive({
        key: "deliveryDate",
        value: selectedTableRow?.or_deli_date,
      })
    );
    dispatch(
      setOrderReceive({
        key: "remarks",
        value: selectedTableRow?.or_remarks,
      })
    );
  }
};

export const setEditOrderReceiveState = (selectedTableRow, dispatch) => {
  if (selectedTableRow) {
    dispatch(
      setEditOrderReceive({
        key: "orderType",
        value: {
          ordt_id: selectedTableRow?.order_type_id,
          ordt_desc: selectedTableRow?.ordt_desc,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "customer",
        value: {
          nBuyer_ID: selectedTableRow?.customerID,
          cBuyer_Name: selectedTableRow?.customer_name,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "buyer",
        value: {
          buyer_ID: selectedTableRow?.buyer_ID,
          buyer_name: selectedTableRow?.buyer_name,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "color",
        value: {
          col_ID: selectedTableRow?.gmt_color_id,
          color: selectedTableRow?.gmt_color,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "fabricType",
        value: {
          ft_id: selectedTableRow?.ft_id,
          ft_description: selectedTableRow?.ft_description,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "design",
        value: {
          fd_id: selectedTableRow?.fd_id,
          fd_design: selectedTableRow?.fd_design,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "fabricComposition",
        value: {
          fcom_id: selectedTableRow?.fcom_id,
          fcom_composition: selectedTableRow?.fcom_composition,
        },
      })
    );

    dispatch(
      setEditOrderReceive({
        key: "fabricConstruction",
        value: {
          fc_id: selectedTableRow?.fc_id,
          fc_construction: selectedTableRow?.fc_construction,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "dia",
        value: {
          dia_id: selectedTableRow?.dia_id,
          dia_name: selectedTableRow?.finishedDia,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "fabricColor",
        value: {
          col_ID: selectedTableRow?.fab_color_id,
          color: selectedTableRow?.fabric_color,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "gsm",
        value: {
          gsm_id: selectedTableRow?.gsm_id,
          gsm_description: selectedTableRow?.gsm_description,
        },
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "unit",
        value: {
          unit_id: selectedTableRow?.unit_id,
          unit_name: selectedTableRow?.unit_name,
        },
      })
    );
    // dispatch(
    //   setEditOrderReceive({
    //     key: "design",
    //     value: {
    //       fcom_id: selectedTableRow?.fd_id,
    //       fcom_composition: selectedTableRow?.fd_design,
    //     },
    //   })
    // );
    dispatch(
      setEditOrderReceive({
        key: "fabricConsumption",
        value: selectedTableRow?.or_consumption,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "gmtName",
        value: selectedTableRow?.or_gmt_name,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "orderNo",
        value: selectedTableRow?.or_style_no,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "gmtQty",
        value: selectedTableRow?.or_gmt_qty,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "fabricQty",
        value: selectedTableRow?.or_fabric_qty,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "orderReceiveDate",
        value: selectedTableRow?.or_rcvd_date,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "deliveryDate",
        value: selectedTableRow?.or_deli_date,
      })
    );
    dispatch(
      setEditOrderReceive({
        key: "remarks",
        value: selectedTableRow?.or_remarks,
      })
    );
  }
};
