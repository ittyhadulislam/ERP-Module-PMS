import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";

const AvailablePO = () => {
  const viewColumns = [
    { field: "dpt_nm", headerName: "Select", minWidth: 100, flex: 1 },
    { field: "com_nm", headerName: "PO No", minWidth: 60, flex: 1 },
  ];
  return (
    <div>
      <CustomAppBar title={"available po"} />

      <CustomTable
        columns={viewColumns}
        rows={[]?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        // loading={addViewLoading}
        height={[]?.length > 0 ? "auto" : "135px"}
        checkboxSelection
        toolBar={false}
        search={false}
        hideFooter={true}
        overlay={false}
      />
    </div>
  );
};

export default AvailablePO;
