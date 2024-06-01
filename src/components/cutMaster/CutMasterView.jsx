import { Box } from "@mui/material";
import React, { useEffect } from "react";
import CustomAppBar from "../common/CustomAppBar";
import CustomTable from "../table/CustomTable";
import { formateDate } from "../../utils/formateDate";
import { useSelectMutation } from "../../redux/features/cutting/cutMaster/mutationCutMaster";
import { useLazyGetViewQuery } from "../../redux/features/cutting/cutMaster/queryCutMaster";
import { useSelector } from "react-redux";
import { BiSelectMultiple } from "react-icons/bi";
import { successToast } from "../../common/toaster/toaster";

const CutMasterView = () => {
  const { user } = useSelector((state) => state.auth);
  const { company, style } = useSelector((state) => state.cutMaster);
  const [getView, { data, isLoading }] = useLazyGetViewQuery();
  const [select, { data: selectData, isSuccess: isSelectSuccess }] =
    useSelectMutation();
  useEffect(() => {
    if (style) {
      getView(style?.nStyleID);
    }
  }, [style]);

  useEffect(() => {
    if (isSelectSuccess) {
      successToast(selectData?.message);
      getView(style?.nStyleID);
    }
  }, [isSelectSuccess, selectData]);

  const handleSelect = (row) => {
    const currentYear = new Date().getFullYear();
    const payload = {
      styleID: style?.nStyleID,
      po: row?.cPoNum,
      poid: row?.cOrderNu,
      companyID: company?.nCompanyID,
      year: currentYear,
      userName: user?.userName,
      cutCompanyID: user?.companyID,
    };
    select(payload);
  };

  const columns = [
    {
      field: "id",
      headerName: "action",
      accessor: "action",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <span
              onClick={() => handleSelect(row?.row)}
              style={{ color: "#1976d2", cursor: "pointer" }}
            >
              Select
              <BiSelectMultiple
                color="green"
                style={{ marginLeft: "4px", marginTop: "-4px" }}
              />
            </span>
          </Box>
        );
      },
      minWidth: 75,
      maxWidth: 75,
      flex: 1,
    },
    // {
    //   field: "cSupName",
    //   headerName: "name",
    //   hideable: false,
    //   minWidth: 120,
    //   flex: 1,
    // },
    { field: "cOrderNu", headerName: "Lot No", minWidth: 100, flex: 1 },
    { field: "nCutNum", headerName: "Cut No", minWidth: 200, flex: 1 },
    { field: "cPoNum", headerName: "PO No", minWidth: 200, flex: 1 },
    { field: "nOrdQty", headerName: "PO Qty", minWidth: 60, flex: 1 },
    {
      field: "dXfty",
      headerName: "Shipment Date",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 180,
      flex: 1,
    },
    {
      field: "dbpcdate",
      headerName: "BPCD",
      valueGetter: (params) => formateDate(params.value),

      minWidth: 180,
      flex: 1,
    },
    {
      field: "nYear",
      headerName: "Year",
      minWidth: 70,
      flex: 1,
    },
  ];
  const rows = data?.map((row, i) => ({ ...row, id: i }));
  return (
    <Box sx={{ p: 1, border: "1px dashed grey" }}>
      <CustomAppBar title={"PO Details"} />
      <CustomTable
        columns={columns}
        rows={style ? rows : []}
        loading={isLoading}
        height={style && rows?.length > 0 ? "auto" : "280px"}
      />
    </Box>
  );
};

export default CutMasterView;
