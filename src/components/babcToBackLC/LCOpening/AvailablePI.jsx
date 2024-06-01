import React, { useEffect, useState } from "react";
import CustomTable from "../../table/CustomTable";
import CustomAppBar from "../../common/CustomAppBar";
import {
  useLazyGetAvailablePIDetailsQuery,
  useLazyGetPiModalDataQuery,
} from "../../../redux/features/commercial/backToBackLC/queryBackToBackLC";
import { useDispatch, useSelector } from "react-redux";
import { formateDate } from "../../../utils/formateDate";
import { setBackToBack } from "../../../redux/features/commercial/backToBackLC/backToBackLcSlice";
import { errorToast } from "../../../common/toaster/toaster";
import CustomModal from "../../common/CustomModal";

const AvailablePI = () => {
  const dispatch = useDispatch();
  const {
    backToBackLC,
    beneficiary,
    company,
    existingAvailablePIData,
    availablePILoading,
  } = useSelector((state) => state.backToBackLC);
  const [tableData, setTableData] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // useLazyGetPiModalDataQuery
  const [
    getModalData,
    { data: modalData, error: modalError, isLoading: modalLoading },
  ] = useLazyGetPiModalDataQuery();
  // get available pi details
  const [getData, { data, isLoading, error }] =
    useLazyGetAvailablePIDetailsQuery();

  useEffect(() => {
    if (backToBackLC && beneficiary && company) {
      getData({
        bblcno: backToBackLC,
        supid: beneficiary?.nCode,
        compid: company?.company_ID,
      });
    }
  }, [backToBackLC, beneficiary, company]);

  useEffect(() => {
    if (existingAvailablePIData?.length > 0) {
      setTableData(
        existingAvailablePIData.map((e, i) => ({ ...e, id: i + 1 }))
      );
    } else {
      setTableData(data?.data?.map((e, i) => ({ ...e, id: i + 1 })));
    }
  }, [data, existingAvailablePIData]);
  useEffect(() => {
    if (error) {
      setTableData([]);
    }
  }, [error]);

  const handleCheck = (poNo) => {
    setTableData((prev) =>
      prev?.map((e) => {
        if (e.pO_No === poNo) {
          return { ...e, bblC_Status: !e.bblC_Status };
        } else return e;
      })
    );
  };
  const handleCheckAll = () => {
    setAllCheck((prev) => !prev);
    setTableData((prev) =>
      prev?.map((e) => {
        if (!allCheck) {
          return { ...e, bblC_Status: true };
        } else return { ...e, bblC_Status: false };
      })
    );
  };

  // handlePiClick fn
  const handlePiClick = (row) => {
    getModalData(row.pO_No);
    setViewModalOpen(true);
  };

  const viewColumns = [
    {
      field: "bblC_Status",
      // headerName: "Select",
      sortable: false,
      renderHeader: (element) => {
        return (
          <div style={{ width: "100%", marginLeft: "12px", marginTop: "5px" }}>
            <input
              type="checkbox"
              style={{
                width: "100%",
                cursor: "pointer",
              }}
              // checked={bblC_Status}
              onClick={() => handleCheckAll()}
            />
          </div>
        );
      },
      renderCell: (row) => {
        const { bblC_Status, pO_No } = row?.row;
        return (
          <>
            <input
              type="checkbox"
              style={{
                width: "100%",
                cursor: "pointer",
              }}
              checked={bblC_Status}
              onClick={() => handleCheck(pO_No)}
            />
          </>
        );
      },
      minWidth: 60,
      maxWidth: 60,
      flex: 1,
    },
    {
      field: "pI_No",
      headerName: "P.I #",
      renderCell: (row) => {
        return (
          <span
            style={{ color: "#007bffcf", cursor: "pointer" }}
            onClick={() => handlePiClick(row?.row)}
          >
            {row.row?.pI_No}
          </span>
        );
      },
      minWidth: 100,
      flex: 1,
    },
    { field: "value", headerName: "Value", minWidth: 100, flex: 1 },

    { field: "cSupName", headerName: "Supplier", minWidth: 150, flex: 1 },
    {
      field: "pI_date",
      headerName: "PI Date",
      minWidth: 100,
      valueGetter: (params) => formateDate(params.value),
      flex: 1,
    },
  ];

  useEffect(() => {
    if (modalError) {
      errorToast(modalError.data.message);
      setViewModalOpen(false);
    }
  }, [modalError]);

  const data1 = tableData?.filter((e) => e.bblC_Status);
  useEffect(() => {
    dispatch(setBackToBack({ key: "selectedRows", value: data1 ?? [] }));
  }, [tableData]);

  // modal columns
  const columns = [
    { field: "cDispStyleNo", headerName: "Style No", minWidth: 100, flex: 1 },
    { field: "cPoNum", headerName: "PO No", minWidth: 100, flex: 1 },
  ];
  return (
    <div style={{ position: "relative" }}>
      <CustomAppBar title={"available pi"} />
      <CustomTable
        columns={viewColumns}
        rows={beneficiary ? tableData ?? [] : []}
        loading={isLoading || availablePILoading}
        height={tableData?.length > 0 && beneficiary ? "auto" : "270px"}
      />
      <p
        style={{ position: "absolute", bottom: 0, left: 15, fontSize: "15px" }}
      >
        Total Selected Data: <b>{beneficiary ? data1?.length : 0}</b>
      </p>
      <CustomModal
        open={viewModalOpen}
        setOpen={setViewModalOpen}
        title={"PI Details"}
      >
        <CustomTable
          columns={columns}
          rows={modalData?.data?.map((e, i) => ({ ...e, id: i + 1 })) ?? []}
          loading={modalLoading}
          height={modalData?.length > 0 ? "auto" : "270px"}
        />
      </CustomModal>
    </div>
  );
};

export default AvailablePI;
