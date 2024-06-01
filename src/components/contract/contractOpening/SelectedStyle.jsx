import React from "react";
import { Box } from "@mui/system";
import CustomTable from "../../table/CustomTable";
import CustomAppBar from "../../common/CustomAppBar";
import { useDispatch, useSelector } from "react-redux";
import { selectAndDelete } from "../../../redux/features/commercial/contract/contractSlice";
import { LoadingButton } from "@mui/lab";
import { MdOutlineDelete } from "react-icons/md";

const SelectedStyle = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth.user);
  const { tableDataInRedux } = useSelector((state) => state.contract);

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
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                handleClick(row?.row);
              }}
            >
              <MdOutlineDelete size={20} />
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
    },
    { field: "cStyleNo", headerName: "Style", minWidth: 100, flex: 1 },
    { field: "cPoNum", headerName: "PO", minWidth: 150, flex: 1 },
    { field: "nOrdQty", headerName: "PO Qty", minWidth: 100, flex: 1 },
    { field: "nfob", headerName: "FOB", minWidth: 80, flex: 1 },
    // { field: "dXfty", headerName: "x-Fac Date", minWidth: 85, flex: 1 },
  ];

  const tableData = tableDataInRedux
    .map((e) => ({ ...e, id: e.nOID }))
    .filter((row) => row.lcuse);
  return (
    <Box sx={{ my: 1 }}>
      <CustomAppBar title={"Selected Styles"} />
      <CustomTable
        columns={viewColumns}
        rows={tableData ?? []}
        height={tableData?.length > 0 ? "auto" : "150px"}
        toolbarOptions={{ columns: true, filter: true }}
        overlay={false}
      />
    </Box>
  );
};

export default SelectedStyle;
