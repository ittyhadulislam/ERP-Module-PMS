import React from "react";
import ReportModal from "../../report/ReportModal";
import CustomTable from "../../table/CustomTable";

const CsViewModal = ({
  open,
  setOpen,
  title = "",
  data = [],
  loading = false,
}) => {
  // view columns
  const viewColumns = [
    {
      field: "cMainCategory",
      headerName: "Main Category",
      minWidth: 100,
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
      headerName: "Construction",
      minWidth: 130,
      flex: 1,
    },
    { field: "cDimen", headerName: "Dimension", minWidth: 80, flex: 1 },
    { field: "cSupName", headerName: "Supplier Name", minWidth: 80, flex: 1 },
    { field: "cColour", headerName: "item color", minWidth: 110, flex: 1 },
    { field: "order_qty", headerName: "quantity", minWidth: 70, flex: 1 },
    { field: "final_price", headerName: "final price", minWidth: 80, flex: 1 },
    { field: "cfr", headerName: "Effective CFR Price", minWidth: 120, flex: 1 },
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

export default CsViewModal;
