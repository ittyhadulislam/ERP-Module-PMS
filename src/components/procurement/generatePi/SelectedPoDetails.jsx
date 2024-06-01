import React from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";

const SelectedPoDetails = () => {
  const viewColumns = [
    { field: "dpt_nm", headerName: "Select", minWidth: 100, flex: 1 },
    { field: "com_nm", headerName: "PO No", minWidth: 60, flex: 1 },
  ];
  return (
    <div>
      <CustomAppBar title={"selected po details"} />
      <CustomTable
        columns={viewColumns}
        rows={[]?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
        // loading={addViewLoading}
        height={[]?.length > 0 ? "auto" : "275px"}
        checkboxSelection
        toolBar={false}
        search={false}
        hideFooter={true}
      />
    </div>
  );
};

export default SelectedPoDetails;
