import React, { useEffect } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import {
  useLazyGetForeignPiListQuery,
  useLazyGetForeignPiSelectedListQuery,
} from "../../../redux/features/commercial/importInvoiceForeign/queryforeign";
import { useSelector } from "react-redux";

const PIList = () => {
  const { b2bLc } = useSelector((state) => state.foreignInvoice);

  // get pi list
  const [getData, { data, isLoading }] = useLazyGetForeignPiListQuery();
  // get pi selected list
  const [getPiData, {}] = useLazyGetForeignPiSelectedListQuery();

  useEffect(() => {
    if (b2bLc) {
      getData(b2bLc?.b2BLC_Slno);
    }
  }, [b2bLc]);

  // handleClick fn
  const handleClick = (pi) => {
    getPiData(pi);
  };

  const viewColumns = [
    {
      field: "id",
      headerName: "Selects",
      renderCell: (row) => {
        const { pI_NO } = row?.row;
        return (
          <span
            onClick={() => handleClick(pI_NO)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            select
          </span>
        );
      },
      minWidth: 100,
      flex: 1,
    },
    { field: "pO_No", headerName: "PO", minWidth: 100, flex: 1 },
    { field: "pI_NO", headerName: "PI", minWidth: 100, flex: 1 },
  ];

  const tableData = data?.data?.map((e, i) => ({ ...e, id: i + 1 }));
  return (
    <>
      <CustomAppBar title={"pi list"} />
      <CustomTable
        columns={viewColumns}
        rows={b2bLc ? tableData ?? [] : []}
        loading={isLoading}
        height={tableData?.length > 0 && b2bLc ? "auto" : "270px"}
      />
    </>
  );
};

export default PIList;
