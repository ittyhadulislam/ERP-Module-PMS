/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { dataGridStyle } from "./tableStyle";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "./CustomOverlay";
import { Pagination } from "./Pagination";
import { Box } from "@mui/material";
const CustomTable = ({
  rows = [],
  columns = [],
  setSelectedRows,
  toolBar = true,
  search = true,
  loading = false,
  checkboxSelection = false,
  isSuccess = false,
  hideFooter = false,
  height = "300px",
  groupModel = [],
  pagePerSize = 10,

  toolbarOptions = {
    columns: true,
    filter: true,
    density: true,
    exports: true,
  },
  overlay = true,
}) => {
  const [checkBox, setCheckBox] = useState([]);

  // const [searchValue, setSearchValue] = useState("");
  // const temp = rows?.find((row) => row.pc_ref_no == searchValue);
  // useEffect(() => {
  //   // setCheckBox((prev) => prev.filter((e) => e !== temp?.id));

  //   if (checkBox.some((e) => e === temp.id)) {
  //     setCheckBox((prev) => prev.filter((e) => e !== temp?.id));
  //   } else {
  //     setCheckBox((prev) => [...prev, temp?.id]);
  //   }
  // }, [temp, searchValue]);
  // // console.log({ searchValue }, "checkBox :", checkBox, temp);

  const handleCheck = (index) => {
    setCheckBox(index);
    const selectedIDs = new Set(index);
    const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRows);
  };
  useEffect(() => {
    setCheckBox([]);
  }, [isSuccess]);

  const handleGridKeyDown = (event) => {
    const isDataGridCell = event.target.classList.contains("MuiDataGrid-cell");
    const isSpaceKey = event.key === " ";

    if (isDataGridCell && (event.key.startsWith("Arrow") || isSpaceKey)) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleGridKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGridKeyDown);
    };
  }, []);

  return (
    <div style={{ width: "auto", height: height, marginRight: "0px" }}>
      <DataGrid
        columnGroupingModel={groupModel}
        experimentalFeatures={{ columnGrouping: true }}
        loading={loading}
        autoHeight={false}
        sx={dataGridStyle}
        // style={{ minHeight: "180px" }}
        density="compact"
        columns={columns}
        rows={rows}
        disableColumnMenu
        onCellKeyDown={handleGridKeyDown}
        // getRowId={(row) => (row[rowId] === undefined | null ? null : row[rowId])}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        rowHeight={40}
        columnHeaderHeight={45}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pagePerSize,
            },
          },
        }}
        onRowSelectionModelChange={handleCheck}
        rowSelectionModel={checkBox}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        hideFooter={hideFooter}
        slots={{
          toolbar:
            toolBar &&
            function () {
              return (
                <CustomToolbar
                  toolbarOptions={toolbarOptions}
                  // setSearchValue={setSearchValue}
                />
              );
            },
          noRowsOverlay: overlay
            ? CustomNoRowsOverlay
            : () => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  No Rows
                </Box>
              ),
          pagination: Pagination,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: search,
          },
        }}
      />
    </div>
  );
};

export default CustomTable;

function CustomToolbar({ toolbarOptions }) {
  const { columns, filter, density, exports } = toolbarOptions;
  return (
    <GridToolbarContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "-webkit-fill-available",
        }}
      >
        <div>
          {columns && <GridToolbarColumnsButton />}
          {filter && <GridToolbarFilterButton />}
          {density && <GridToolbarDensitySelector />}
          {exports && <GridToolbarExport />}
        </div>
        <GridToolbarQuickFilter
        // onKeyDown={(e) => {
        //   if (e.code === "Enter") {
        //     console.log("first");
        //     setSearchValue(e.target.value);
        //   }
        // }}
        />
      </div>
    </GridToolbarContainer>
  );
}
