import React, { useEffect } from "react";
import OrderReceivingInput from "./OrderReceivingInput";
import { Box, Grid, Stack } from "@mui/material";
import AddButton from "../../buttons/AddButton";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
import SubmitButton from "../../buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import {
  useCompleteOrderReceiveMutation,
  useDeleteOrderReceiveMutation,
  useSaveOrderReceiveMutation,
} from "../../../redux/features/weaving/orderReceive/mutationOrderReceive";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../common/toaster/toaster";
import { useGetWeavingOrderReceivingDataQuery } from "../../../redux/features/weaving/orderReceive/queryOrderReceive";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import {
  resetOrderReceive,
  setOrderReceive,
} from "../../../redux/features/weaving/orderReceive/orderReceiveSlice";
import { setEditState } from "./editState";
import ErrorButton from "../../buttons/ErrorButton";
import { useDebounce } from "../../../hooks/useDebounce";
import { useGetCostingOrderInfoByNameQuery } from "../../../redux/features/weaving/costing/queryCosting";

const OrderReceivingContainer = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const {
    orderType,
    customer,
    buyer,
    color,
    fabricType,
    fabricComposition,
    fabricConstruction,
    fabricColor,
    gsm,
    design,
    dia,
    unit,
    //-text input
    orderNo,
    gmtName,
    gmtQty,
    fabricConsumption,
    fabricQty,
    orderReceiveDate,
    deliveryDate,
    remarks,

    //-- others state
    selectedTableRow,
  } = useSelector((state) => state.orderReceive);

  // save order receive information
  const [saveOrderReceive, { data, error, isLoading, isSuccess }] =
    useSaveOrderReceiveMutation();
  // delete order receive information
  const [
    deleteOrderReceive,
    { data: deleteData, error: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteOrderReceiveMutation();

  //complete order receive
  const [
    completeOrderReceive,
    {
      data: completeData,
      error: completeError,
      isSuccess: completeSuccess,
      isLoading: completeLoading,
    },
  ] = useCompleteOrderReceiveMutation();
  // get table data
  const {
    data: tableData,
    isLoading: tableLoading,
    refetch,
  } = useGetWeavingOrderReceivingDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const text = useDebounce(orderNo, 700);

  // get order data
  const { data: orderInfoData } = useGetCostingOrderInfoByNameQuery(text, {
    refetchOnMountOrArgChange: true,
  });
  console.log(orderInfoData);
  useEffect(() => {
    if (orderInfoData?.length > 0) {
      warningToast("This Order Already Exists!");
      console.log("orderInfoData");
    }
  }, [orderInfoData]);

  // handle submit functionality
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ordType: orderType?.ordt_id,
      buyer: buyer?.buyer_ID,
      ordRcvdDate: orderReceiveDate,
      ordDeliveryDate: deliveryDate,
      customer: customer?.nBuyer_ID,
      fabricType: fabricType?.ft_id,
      gsm: gsm?.gsm_id,
      composition: fabricComposition?.fcom_id,
      construction: fabricConstruction?.fc_id,
      design: design?.fd_id,
      fabriccolor: fabricColor?.col_ID,
      finishedDia: dia?.dia_id,
      orderno: orderNo,
      gmtname: gmtName,
      color: color?.col_ID,
      gmtqty: +gmtQty,
      consumsion: +fabricConsumption,
      fabricQty: +fabricQty,
      unit: unit?.unit_id,
      remarks: remarks,
      createdby: userName,
    };
    console.log(payload);
    saveOrderReceive(payload);
  };

  //handle Complete fn
  const handleComplete = () => {
    const payload = {
      completedby: userName,
      remarks,
    };

    completeOrderReceive(payload);
  };

  // toaster
  useEffect(() => {
    if (data && isSuccess) {
      successToast(data.message);

      refetch();
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      errorToast(error?.data?.message);
    }
  }, [error]);
  useEffect(() => {
    // console.log(deleteData, deleteSuccess);
    if (deleteData && deleteSuccess) {
      successToast(deleteData.message);
      refetch();
    }
  }, [deleteData]);
  useEffect(() => {
    if (deleteError) {
      errorToast(deleteError?.data?.message);
    }
  }, [deleteError]);
  useEffect(() => {
    if (completeData && completeSuccess) {
      successToast(completeData.message);
      refetch();
    }
  }, [completeData]);
  useEffect(() => {
    if (completeError) {
      errorToast(completeError?.data?.message);
    }
  }, [completeError]);

  // edit state
  useEffect(() => {
    if (tableData?.length > 0) {
      setEditState(tableData[0], dispatch);
    } else {
      dispatch(resetOrderReceive());
    }
  }, [tableData]);
  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                dispatch(
                  setOrderReceive({
                    key: "selectedTableRow",
                    value: row?.row,
                  })
                );
              }}
            >
              <BiEdit size={20} />
            </LoadingButton> */}
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                deleteOrderReceive(row?.row?.or_id);
              }}
            >
              <MdOutlineDelete size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 55,
      flex: 1,
    },
    { field: "ordt_desc", headerName: "Order Type", minWidth: 80, flex: 1 },
    {
      field: "customer_name",
      headerName: "Customer Name",
      minWidth: 100,
      flex: 1,
    },
    { field: "or_style_no", headerName: "Order No", minWidth: 100, flex: 1 },
    // {
    //   field: "ft_description",
    //   headerName: "Gray Fabric Type",
    //   minWidth: 100,
    //   flex: 1,
    // },
    { field: "fd_design", headerName: "Design", minWidth: 100, flex: 1 },
    {
      field: "fcom_composition",
      headerName: "Fabric Composition",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "fc_construction",
      headerName: "Fabric Construction",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "finishedDia",
      headerName: "Finished Dia",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "fabric_color",
      headerName: "Fabric Color",
      minWidth: 100,
      flex: 1,
    },
    { field: "gsm_description", headerName: "GSM", minWidth: 100, flex: 1 },
    // {
    //   field: "or_consumption",
    //   headerName: "Fabric consumption",
    //   minWidth: 100,
    //   flex: 1,
    // },
    {
      field: "or_fabric_qty",
      headerName: "Fabric Qty",
      minWidth: 100,
      flex: 1,
    },
    { field: "unit_name", headerName: "Unit", minWidth: 100, flex: 1 },
    {
      field: "or_rcvd_date",
      headerName: "Received Date",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => formateDate(params.value),
    },
    {
      field: "or_deli_date",
      headerName: "Delivery Date",
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => formateDate(params.value),
    },
  ];

  const isDisabled = tableData?.length > 0;
  const tableViewData = tableData?.map((e) => ({ ...e, id: e.or_id }));
  return (
    <>
      <form onSubmit={handleSubmit}>
        <OrderReceivingInput isDisabled={isDisabled} />
        <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
          <Stack
            direction={"row"}
            p={1}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>
            <span>
              {/* <ErrorButton
                title={"clear"}
                type="button"
                handleClick={() => dispatch(resetOrderReceive())}
              /> */}
              <AddButton
                title={"add"}
                type="submit"
                loading={isLoading}
                disabled={orderInfoData?.length > 0}
              />
            </span>
          </Stack>
        </Box>
      </form>
      <CustomAppBar title={"View"} />
      <CustomTable
        // columns={sizeInfoColumns}
        // rows={color ? finalSizeInfo ?? [] : []}
        columns={columns}
        rows={tableViewData ?? []}
        toolBar={true}
        hideFooter={true}
        pagePerSize={99}
        loading={tableLoading}
        height={tableViewData?.length > 0 ? "auto" : "230px"}

        // checkboxSelection={true}
        // setSelectedRows={setSelectedRows}
        // isSuccess={isSuccess}
      />

      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>
          <SubmitButton
            title={"Complete"}
            type="button"
            handleClick={handleComplete}
            loading={completeLoading}
          />
        </Stack>
      </Box>
    </>
  );
};

export default OrderReceivingContainer;
