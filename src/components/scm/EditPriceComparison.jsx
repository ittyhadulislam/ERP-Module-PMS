import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import UpdateButton from "../buttons/UpdateButton";
import {
  errorToast,
  infoToast,
  successToast,
  warningToast,
} from "../../common/toaster/toaster";
import { formateDate } from "../../utils/formateDate";
import { useGetInfoByStyleEditQuery } from "../../redux/features/scm/priceComparison/queryPriceComparison";
import {
  useDeletePostPriceComparisonMutation,
  useUpdatePostPriceComparisonMutation,
} from "../../redux/features/scm/priceComparison/mutationPriceComparison";
import CustomTable from "../table/CustomTable";
import EditStyleDetails from "./EditStyleDetails";
import EditSupplerPriceDetails from "./EditSupplerPriceDetails";
import NewEditItemDetails from "./NewEditItemDetails";
import {
  resetAllFields,
  setPriceComparison,
} from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { checkValidation } from "./priceComparison/numberValidation";

const EditPriceComparison = () => {
  const dispatch = useDispatch();
  const {
    csNo,
    style,
    currency,
    bookingDate,
    sewingStartDate,
    mainCategory,
    subCategory,
    constriction,
    dimension,
    finish,
    color,
    lastSeasonPrice,
    targetPrice,
    gmtQty,
    itemOrderQty,
    unit,
    initialPrice,
    finalPrice,
    supplier,
    paymentType,
    priceTerm,
    shipMode,
    productionLeadTime,
    testCost,
    qualityStatus,
    moq,
    priceValidity,
    upCharge,
    selectedTableRow,
    remarks,
  } = useSelector((state) => state.priceComparison);

  const { user } = useSelector((state) => state.auth);

  const {
    data: row,
    error,
    isLoading,
    refetch,
  } = useGetInfoByStyleEditQuery(csNo?.pc_ref_no);

  const [
    deletePostPriceComparison,
    { data: deleteData, isSuccess: isDeleteSuccess },
  ] = useDeletePostPriceComparisonMutation();
  const [
    updatePostPriceComparison,
    {
      data: updateData,
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      isError: isUpdateError,
    },
  ] = useUpdatePostPriceComparisonMutation();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedTableRow === null) {
      return infoToast("please select a row");
    }
    if (
      checkValidation(lastSeasonPrice, 12, true).length > 0 ||
      checkValidation(targetPrice, 12).length > 0 ||
      checkValidation(gmtQty, 6).length > 0 ||
      checkValidation(itemOrderQty, 6).length > 0 ||
      checkValidation(initialPrice, 12).length > 0 ||
      checkValidation(finalPrice, 12).length > 0
    ) {
      warningToast("Please Solve these Error!!");
      return;
    }
    const payload = {
      pc_id: selectedTableRow?.pc_id,
      pc_ref_id: csNo?.pc_ref_no,
      pc_style_id: style?.nStyleID,
      booking_date: bookingDate,
      sewing_start_date: sewingStartDate,
      main_cate_id: mainCategory?.nMainCategory_ID,
      sub_cate_id: parseInt(subCategory?.nItemcode),
      dimention_id: dimension?.ndCode,
      construction_id: constriction?.nArtCode,
      finish_id: finish?.f_id,
      unit_id: unit?.nUnitID,
      currency: currency?.cCurCode,
      color_id: color?.nColNo,
      last_season_price: lastSeasonPrice,
      target_price: targetPrice,
      gmt_ord_qty: parseInt(gmtQty),
      order_qty: parseInt(itemOrderQty),
      supplier_id: supplier?.supplierID,
      payment_type_id: paymentType?.pt_id,
      price_mode_id: priceTerm?.pm_id,
      shipmode_id: shipMode?.sm_id,
      initial_price: initialPrice,
      final_price: finalPrice,
      upcharge: upCharge,
      production_lead_time: parseInt(productionLeadTime),
      testcost: testCost?.qca_id,
      qc_status: qualityStatus?.tc_id,
      moq: moq,
      price_validity: priceValidity,
      remarks: remarks,
      update_by: user?.userName,
    };
    updatePostPriceComparison(payload);
    dispatch(
      setPriceComparison({
        key: "selectedTableRow",
        value: null,
      })
    );
    // setSelectedTableRow(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="primary"
              title="EDIT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20, mr: 1 }}
              onClick={() => {
                // setSelectedMainCategory(row.original.nMainCategory_ID);
                dispatch(
                  setPriceComparison({
                    key: "selectedTableRow",
                    value: row?.row,
                  })
                );
                // setSelectedTableRow(row?.row);
              }}
              // title={"Edit"}
              // loading
            >
              <BiEdit size={20} />
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                deletePostPriceComparison(row?.row?.pc_id);
                // setSelectedMainCategory(row.original.nMainCategory_ID);
              }}
              // title={"Edit"}
              // loading
            >
              <MdOutlineDelete size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 70,
      flex: 1,
    },
    // {
    //   field: "cSupName",
    //   headerName: "name",
    //   hideable: false,
    //   minWidth: 120,
    //   flex: 1,
    // },
    { field: "cStyleNo", headerName: "style", minWidth: 200, flex: 1 },
    {
      field: "booking_date",
      headerName: "Booking Date",
      valueGetter: (params) => formateDate(params.value),
      minWidth: 120,
      flex: 1,
    },
    {
      field: "sewing_start_date",
      headerName: "Sewing ST Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 120,
      flex: 1,
    },
    {
      field: "cMainCategory",
      headerName: "Main Category",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "cDes",
      headerName: "Sub Category",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "cArticle",
      headerName: "Constriction",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "cDimen",
      headerName: "Dimension",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "cUnitDes",
      headerName: "Unit",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "currency",
      headerName: "Currency",
      minWidth: 100,
      flex: 1,
    },

    {
      field: "cColour",
      headerName: "Color",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "gmt_ord_qty",
      headerName: "gmt qty",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "order_qty",
      headerName: "item order qty",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "cSupName",
      headerName: "supplier",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "pt_desc",
      headerName: "payment term",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "pm_desc",
      headerName: "price term",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "sm_desc",
      headerName: "ship mode",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "qca_desc",
      headerName: "test cost",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "tc_desc",
      headerName: "quality status",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "initial_price",
      headerName: "initial price",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "final_price",
      headerName: "final price",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "upcharge",
      headerName: "up charge",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "cfr",
      headerName: "cfr price",
      minWidth: 100,
      flex: 1,
    },
    // { field: "cSupName", flex: 1 },
    { field: "created_by", headerName: "created by", minWidth: 150, flex: 1 },
    {
      field: "created_date",
      headerName: "created date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 120,
      flex: 1,
    },
  ];
  const rows = row?.map((row, i) => ({ ...row, id: i }));
  useEffect(() => {
    refetch();
    resetAllFields();
  }, [deleteData, updateData]);

  // state dependents on csNo
  useEffect(() => {
    if (!csNo) dispatch(resetAllFields());
    if (csNo) dispatch(resetAllFields({ key: "csNo", value: csNo }));
  }, [csNo]);

  // show toaster
  useEffect(() => {
    if (isDeleteSuccess) {
      errorToast("Delete Successful!");
    }
  }, [isDeleteSuccess]);
  // show toaster
  useEffect(() => {
    if (isUpdateSuccess) {
      successToast("Update Successful!");
    }
  }, [isUpdateSuccess]);
  // show toaster
  useEffect(() => {
    if (!updateData && isUpdateError) {
      warningToast("Something went wrong");
    }
  }, [updateData, isUpdateError]);

  return (
    <>
      <form onSubmit={handleUpdate}>
        <EditStyleDetails />
        {/* <EditItemDetails
          setSelectedMainCategory={setSelectedMainCategory}
          selectedMainCategory={selectedMainCategory}
          register={register}
          setValue={setValue}
          selectedTableRow={selectedTableRow}
          watch={watch}
          resetForm={isUpdateSuccess}
        /> */}
        <NewEditItemDetails />
        <EditSupplerPriceDetails />
        {/* button container */}
        <Box sx={{ my: 1, border: "1px dashed grey" }}>
          <Stack
            direction={"row"}
            p={1}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>

            <span>
              <UpdateButton
                title={"Update"}
                type="submit"
                loading={isUpdateLoading}
              />
            </span>
          </Stack>
        </Box>
      </form>
      {/* table  */}
      <CustomTable
        columns={columns}
        rows={csNo ? rows ?? [] : []}
        loading={isLoading}
        height={rows?.length > 0 && csNo ? "auto" : "280px"}
      />
    </>
  );
};

export default EditPriceComparison;
