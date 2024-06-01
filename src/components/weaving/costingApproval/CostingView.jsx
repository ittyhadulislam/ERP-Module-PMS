import React from "react";
import ReportModal from "../../report/ReportModal";
import CustomTable from "../../table/CustomTable";
import { formateDate } from "../../../utils/formateDate";
const CostingView = ({
  open,
  setOpen,
  title = "",
  data = [],
  loading = false,
}) => {
  // view columns
  const viewColumns = [
    {
      field: "buyer_name",
      headerName: "Buyer Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "cust_name",
      headerName: "Customer Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "created_by",
      headerName: "Created By",
      minWidth: 130,
      flex: 1,
    },
    { field: "created_date", headerName: "Created Date", minWidth: 80, flex: 1, valueGetter:(param)=>formateDate(param.value)},
    // { field: "cSupName", headerName: "Supplier Name", minWidth: 80, flex: 1 },
    // { field: "cColour", headerName: "item color", minWidth: 110, flex: 1 },
    // { field: "order_qty", headerName: "quantity", minWidth: 70, flex: 1 },
    // { field: "final_price", headerName: "final price", minWidth: 80, flex: 1 },
    // { field: "cfr", headerName: "Effective CFR Price", minWidth: 120, flex: 1 },
  ];

  return (
    <div>
      <ReportModal open={open} setOpen={setOpen} title={title}>
        <CustomTable
          // checkboxSelection={true}
          columns={viewColumns}
          rows={data ?? []}
          loading={loading}
          hideFooter
          pagePerSize={99}
          // setSelectedRows={setSelectedRows}
          // isSuccess={scmSuccess}
          height={data?.length > 0 ? "auto" : "280px"}
        />
      </ReportModal>
    </div>
  );
};

export default CostingView;


