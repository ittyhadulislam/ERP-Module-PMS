import React, { useEffect } from "react";
import { Box } from "@mui/system";
import CustomTable from "../../table/CustomTable";
import CustomAppBar from "../../common/CustomAppBar";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetComAvailableStyleQuery } from "../../../redux/features/commercial/contract/queryContract";
import {
  selectAndDelete,
  setTableData,
} from "../../../redux/features/commercial/contract/contractSlice";
import { LoadingButton } from "@mui/lab";
import { FaCheck } from "react-icons/fa";

const AvailableStyle = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const { contract, buyer, saveCount, tableDataInRedux, company } = useSelector(
    (state) => state.contract
  );

  const [
    getAvailableData,
    { data: availableData, isLoading: availableLoading },
  ] = useLazyGetComAvailableStyleQuery();

  //
  useEffect(() => {
    if (contract && buyer) {
      getAvailableData({
        contract,
        buyerID: buyer?.buyer_ID,
        compid: company?.company_ID,
      });
    }
  }, [contract, buyer, saveCount]);

  // handleClick fn
  const handleClick = (row) => {
    dispatch(selectAndDelete(row));
  };

  const viewColumns = [
    {
      field: "id",
      headerName: "Action",
      accessor: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Box>
            <LoadingButton
              variant="outlined"
              size="small"
              color="success"
              title="SELECT"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                handleClick(row?.row);
              }}
            >
              <FaCheck size={20} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 50,
      maxWidth: 55,
    },
    {
      field: "cDispStyleNo",
      headerName: "Contract",
      minWidth: 100,
      flex: 1,
      rowSpan: { cDispStyleNo: 2 },
    },
    { field: "cStyleNo", headerName: "Style", minWidth: 100, flex: 1 },
    { field: "cPoNum", headerName: "PO", minWidth: 150, flex: 1 },
    { field: "nOrdQty", headerName: "PO Qty", minWidth: 100, flex: 1 },
    { field: "nfob", headerName: "FOB", minWidth: 100, flex: 1 },
    { field: "dXfty", headerName: "x-Fac Date", minWidth: 85, flex: 1 },
  ];

  useEffect(() => {
    if (availableData) {
      dispatch(setTableData(availableData.data));
    }
  }, [availableData]);

  const tableData = tableDataInRedux
    .map((e) => ({ ...e, id: e.nOID }))
    .filter((row) => !row.lcuse);
  return (
    <Box sx={{ mb: 1 }}>
      <CustomAppBar title={"Available Styles"} />
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        loading={availableLoading}
        height={tableData?.length > 0 ? "auto" : "170px"}
        overlay={false}
        toolbarOptions={{ columns: true, filter: true }}
      />
    </Box>
  );
};

export default AvailableStyle;
