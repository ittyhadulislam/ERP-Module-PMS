import React from "react";
import {
  GridPagination,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
export const Pagination = ({ props }) => {
  return <GridPagination ActionsComponent={PaginationNumber} {...props} />;
};

function PaginationNumber({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}
