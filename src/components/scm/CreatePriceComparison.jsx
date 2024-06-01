import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { isEmpty } from "lodash";
import ReturnButton from "../buttons/ReturnButton";
import UpdateButton from "../buttons/UpdateButton";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../common/toaster/toaster";
import EditSupplerPriceDetails from "./EditSupplerPriceDetails";
import EditStyleDetails from "./EditStyleDetails";
import { formateDate } from "../../utils/formateDate";
import { useGetCsAddViewQuery } from "../../redux/features/scm/priceComparison/queryPriceComparison";
import {
  useCompletePriceComparisonMutation,
  useCreatePostPriceComparisonMutation,
  useDeletePostPriceComparisonMutation,
  useUpdatePostPriceComparisonMutation,
} from "../../redux/features/scm/priceComparison/mutationPriceComparison";
import AddButton from "../buttons/AddButton";
import CustomTable from "../table/CustomTable";
import SupplerPriceDetails from "./SupplerPriceDetails";
import ItemDetails from "./ItemDetails";
import StyleDetails from "./StyleDetails";
import SubmitButton from "../buttons/SubmitButton";
import CustomModal from "../common/CustomModal";
import MainCategory from "./priceComparison/MainCategory";
import Construction from "./priceComparison/Construction";
import Dimension from "./priceComparison/Dimension";
import Finish from "./priceComparison/Finish";
import { useButtonPermissionMutation } from "../../redux/features/permission/permissionApi";
import CustomTextInput from "../inputs/CustomTextInput";
import NewEditItemDetails from "./NewEditItemDetails";
import {
  resetAllFields,
  resetSupplierPriceDetails,
  setPriceComparison,
} from "../../redux/features/scm/priceComparison/priceComparisonSlice";
import { checkValidation } from "./priceComparison/numberValidation";

const CreatePriceComparison = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
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
  } = useSelector((state) => state.priceComparison);
  const isCreatePage = true;
  const [subCatOpen, setSubCatOpen] = useState(false);
  const [construction, setConstruction] = useState(false);
  const [dimensionModal, setDimensionModal] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const [isSubCatCreate, setIsSubCatCreate] = useState(false);
  const [isConstructionCreate, setIsConstructionCreate] = useState(false);
  const [isDimensionCreate, setIsDimensionCreate] = useState(false);
  const [isFinishCreate, setIsFinishCreate] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [
    createPostPriceComparison,
    { data, isSuccess, isLoading: isCreateLoading },
  ] = useCreatePostPriceComparisonMutation();
  const {
    data: row,
    error,
    isLoading,
    refetch,
  } = useGetCsAddViewQuery(user?.userName);

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

  const [completePriceComparison, { data: completeData }] =
    useCompletePriceComparisonMutation();

  const buttonName = [
    "btnConstruction",
    "btnDimension",
    "btnFinish",
    "btnSubCate",
  ];

  // button permission
  const [buttonPermission, { data: buttonData }] =
    useButtonPermissionMutation();

  useEffect(() => {
    const payload = buttonName.map((e) => ({
      buttonName: e,
      controller: "R2m_SCM_PC.aspx",
      isShow: true,
      userName: user?.userName,
    }));
    buttonPermission(payload);
  }, []);
  // set permission on button
  const showSubCat = !buttonData?.find((e) => e?.buttonName === "btnSubCate")
    ?.isShow;
  const showConstruction = !buttonData?.find(
    (e) => e?.buttonName === "btnConstruction"
  )?.isShow;
  const showDimension = !buttonData?.find(
    (e) => e?.buttonName === "btnDimension"
  )?.isShow;
  const showFinish = !buttonData?.find((e) => e?.buttonName === "btnFinish")
    ?.isShow;

  const handleAdd = (e) => {
    e.preventDefault();
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
      consumption: 0,
      order_qty: parseInt(itemOrderQty),
      supplier_id: supplier?.supplierID,
      payment_type_id: paymentType?.pt_id,
      price_mode_id: priceTerm?.pm_id,
      shipmode_id: shipMode?.sm_id,
      initial_price: initialPrice,
      final_price: finalPrice,
      upcharge: upCharge,
      amount: 0,
      production_lead_time: parseInt(productionLeadTime),
      testcost: testCost?.qca_id,
      qc_status: qualityStatus?.tc_id,
      moq: moq,
      price_validity: priceValidity,
      remarks: "",
      created_by: user?.userName,
    };

    createPostPriceComparison(payload);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
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
      remarks: "",
      update_by: user?.userName,
    };
    updatePostPriceComparison(payload);
    dispatch(setPriceComparison({ key: "selectedTableRow", value: null }));
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
      minWidth: 150,
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
      // valueGetter: (params) => params.value.toFixed(2),

      minWidth: 100,
      flex: 1,
    },
    {
      field: "cfr",
      headerName: "cfr price",
      // valueGetter: (params) => params.value.toFixed(2),

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
    dispatch(resetAllFields());
    setRemarks("");
  }, [deleteData, updateData, completeData]);
  useEffect(() => {
    refetch();
  }, [data]);

  // show toaster
  useEffect(() => {
    if (isDeleteSuccess) {
      errorToast("Delete Successful!");
      dispatch(setPriceComparison({ key: "selectedTableRow", value: null }));
      dispatch(resetAllFields());
    }
  }, [isDeleteSuccess]);
  // show toaster
  useEffect(() => {
    if (isUpdateSuccess) {
      successToast("Update Successfully!");
    }
  }, [isUpdateSuccess]);
  useEffect(() => {
    if (completeData) {
      successToast("Complete Successfully!");
    }
  }, [completeData]);
  useEffect(() => {
    if (isSuccess) {
      successToast("Insert Successfully!");
      dispatch(setPriceComparison({ key: "isDisabled", value: true }));
      dispatch(resetSupplierPriceDetails());
    }
  }, [isSuccess]);
  useEffect(() => {
    if (!updateData && isUpdateError) {
      warningToast("Something went wrong!");
    }
  }, [updateData, isUpdateError]);
  return (
    <>
      {isEmpty(selectedTableRow) ? (
        <form onSubmit={handleAdd}>
          <StyleDetails />
          <ItemDetails
            isSubCatCreate={isSubCatCreate}
            isConstructionCreate={isConstructionCreate}
            isDimensionCreate={isDimensionCreate}
            isFinishCreate={isFinishCreate}
          />
          <SupplerPriceDetails />
          {/* button container */}
          <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
            <Stack
              direction={"row"}
              p={1}
              spacing={2}
              justifyContent="space-between"
            >
              <span></span>
              <AddButton
                title={"add"}
                type="submit"
                loading={isCreateLoading}
              />
            </Stack>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleUpdate}>
          <EditStyleDetails isCreatePage={isCreatePage} />
          {/* <EditItemDetails
            setSelectedMainCategory={setSelectedMainCategory}
            selectedMainCategory={selectedMainCategory}
            register={register}
            setValue={setValue}
            selectedTableRow={selectedTableRow}
            watch={watch}
          /> */}
          <NewEditItemDetails isCreatePage={isCreatePage} />
          <EditSupplerPriceDetails />
          {/* button container */}
          <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
            <Stack
              direction={"row"}
              p={1}
              spacing={2}
              justifyContent="space-between"
            >
              <span></span>

              <span>
                <ReturnButton
                  title={"Return To Add"}
                  type="button"
                  loading={isUpdateLoading}
                  handleClick={() => {
                    // setSelectedTableRow(null);
                    dispatch(
                      setPriceComparison({
                        key: "selectedTableRow",
                        value: null,
                      })
                    );
                    dispatch(resetAllFields());
                  }}
                />

                <UpdateButton
                  title={"Update"}
                  type="submit"
                  loading={isUpdateLoading}
                />
              </span>
            </Stack>
          </Box>
        </form>
      )}

      {/* table  */}
      <CustomTable
        columns={columns}
        rows={rows ?? []}
        loading={isLoading}
        height={rows?.length > 0 ? "auto" : "280px"}
      />

      {/* under table button container */}

      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px", p: 2 }}>
        <Grid item xs={12}>
          <CustomTextInput
            multiline={true}
            label={"Remarks"}
            name="remarks"
            readOnly={false}
            value={remarks}
            setStateValue={setRemarks}
            // register={register}
            // value={watch("remarks")}
            // setValue={setValue}
            // required={true}
          />
        </Grid>
      </Box>
      <Box sx={{ my: 1, border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={1}
          spacing={2}
          justifyContent="space-between"
        >
          <span style={{ margin: "0px" }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setSubCatOpen(true)}
              sx={{ m: 0.1, width: "180px" }}
              disabled={showSubCat}
            >
              Sub Category
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={() => setConstruction(true)}
              sx={{ m: 0.1, width: "180px" }}
              disabled={showConstruction}
            >
              Construction
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setDimensionModal(true)}
              sx={{ m: 0.1, width: "180px" }}
              disabled={showDimension}
            >
              Dimension
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setFinishModal(true)}
              sx={{ m: 0.1, width: "180px" }}
              disabled={showFinish}
            >
              Finish
            </Button>
          </span>
          <span style={{ margin: "0px" }}>
            <SubmitButton
              fullWidth
              title={"Complete"}
              handleClick={() =>
                // completePriceComparison({
                //   completedby: user?.userName,
                // })
                completePriceComparison([
                  {
                    completedby: user?.userName,
                    remarks: remarks,
                  },
                ])
              }
            />
            {/* <AddButton title={"Add"} /> */}
          </span>
        </Stack>
      </Box>

      <CustomModal
        open={subCatOpen}
        setOpen={setSubCatOpen}
        title="Add/Edit Sub Category"
      >
        <MainCategory setIsSubCatCreate={setIsSubCatCreate} />
      </CustomModal>
      <CustomModal
        open={construction}
        setOpen={setConstruction}
        title="Add/Edit Construction"
      >
        <Construction setIsConstructionCreate={setIsConstructionCreate} />
      </CustomModal>
      <CustomModal
        open={dimensionModal}
        setOpen={setDimensionModal}
        title="Add/Edit Dimension"
      >
        <Dimension setIsDimensionCreate={setIsDimensionCreate} />
      </CustomModal>
      <CustomModal
        open={finishModal}
        setOpen={setFinishModal}
        title="Add/Edit Finish"
      >
        <Finish setIsFinishCreate={setIsFinishCreate} />
      </CustomModal>
    </>
  );
};

export default CreatePriceComparison;
