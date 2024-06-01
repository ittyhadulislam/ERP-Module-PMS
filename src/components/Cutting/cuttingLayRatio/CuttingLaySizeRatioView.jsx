import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import CustomTable from "../../table/CustomTable";
import {
  useGetLayDetailsQuery,
  useGetLaySizeRatioQuery,
} from "../../../redux/features/cutting/cuttingLayRatio/queryCuttngLayRatio";
import { useSelector } from "react-redux";

const CuttingLaySizeRatioView = ({
  finalRatio,
  setFinalRatio,
  finalDetails,
  setFinalDetails,
}) => {
  const { style, po } = useSelector((state) => state.cuttingLayRatio);

  //table ratio / size data
  const {
    data: layRatioData,
    isSuccess: layRatioSuccess,
    isLoading: isLayRatioLoading,
    refetch: layRatioRefetch,
  } = useGetLaySizeRatioQuery({
    style: style?.nStyleID,
    poId: po?.cOrderNu,
  });
  //table lay details data
  const {
    data: layDetailsData,
    isLoading: isLayDetailsLoading,
    refetch: layDetailsRefetch,
  } = useGetLayDetailsQuery({
    style: style?.nStyleID,
    poId: po?.cOrderNu,
  });

  const layDetailsColumns = [
    {
      field: "id",
      headerName: "color",
      //   maxWidth: 150,
      minWidth: 200,
      flex: 1,
      renderCell: (row) => {
        const { nColNo } = row?.row;
        return (
          <>
            <select
              onChange={(e) =>
                handleTextFieldChangeDetails(
                  nColNo,
                  e.target.value,
                  "detailsColor"
                )
              }
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
            >
              <option label=""></option>
              {layDetailsData?.map((e) => (
                <option label={e?.cColour} value={e?.nColNo} key={e?.cColour}>
                  {e?.cColour}
                </option>
              ))}
            </select>
          </>
        );
      },
    },
    {
      field: "nCutdsNum",
      headerName: "Shade",
      minWidth: 100,
      flex: 1,
      renderCell: (row) => {
        const { nColNo } = row?.row;
        return (
          <input
            type="text"
            maxLength={5}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChangeDetails(
                nColNo,
                e.target.value,
                "detailsShade"
              )
            }
          />
        );
      },
    },
    {
      field: "nCsutNum",
      headerName: "lot",
      minWidth: 100,
      flex: 1,
      renderCell: (row) => {
        const { nColNo } = row?.row;
        return (
          <input
            type="text"
            maxLength={5}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChangeDetails(nColNo, e.target.value, "detailsLot")
            }
          />
        );
      },
    },
    {
      field: "nCutsNum",
      headerName: "plies",
      minWidth: 60,
      flex: 1,
      renderCell: (row) => {
        const { nColNo } = row?.row;
        return (
          <input
            type="text"
            maxLength="4"
            onInput={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 4);
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            onChange={(e) => {
              handleTextFieldChangeDetails(
                nColNo,
                e.target.value,
                "detailsPlies"
              );
            }}
          />
        );
      },
    },
  ];
  const layRatioColumns = [
    {
      field: "sizeNo",
      headerName: "id",
      accessor: "action",
      minWidth: 45,
      maxWidth: 45,
      flex: 1,
    },

    { field: "orgSize", headerName: "size", maxWidth: 90, flex: 1 },
    {
      field: "nCutNum",
      headerName: "ratio",
      minWidth: 80,
      flex: 1,
      renderCell: (row) => {
        const { sizeNo } = row?.row;
        return (
          <input
            type="text"
            maxLength="4"
            onInput={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                e.target.value = 0;
                return warningToast("Please Enter a Number");
              } else {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 4);
              }
            }}
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChange(sizeNo, e.target.value, "ratioValue")
            }
          />
        );
      },
    },
  ];

  const layRatioRow = po
    ? layRatioData?.map((row, i) => ({ ...row, id: i }))
    : [];
  const layDetailsRow = po
    ? layDetailsData?.map((row, i) => ({ ...row, id: i }))
    : [];

  const handleTextFieldChange = (id, value, fieldName) => {
    setFinalRatio((prev) =>
      prev?.map((e) => {
        if (id === e.sizeNo) {
          return { ...e, [fieldName]: value };
        } else {
          return { ...e };
        }
      })
    );
  };

  const handleTextFieldChangeDetails = (id, value, fieldName) => {
    setFinalDetails((prev) =>
      prev?.map((e) => {
        if (id === e.nColNo) {
          return { ...e, [fieldName]: value };
        } else {
          return { ...e };
        }
      })
    );
  };

  useEffect(() => {
    if (layRatioData) {
      setFinalRatio(layRatioRow);
    }
    if (layDetailsData) {
      setFinalDetails(layDetailsRow);
    }
  }, [layRatioData, layDetailsData, layRatioSuccess]);

  useEffect(() => {
    if (po) {
      layRatioRefetch();
      layDetailsRefetch();
    }
  }, [po]);
  return (
    <Grid container spacing={0.5} mt={"5px"}>
      <Grid item xs={12} sm={4}>
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
          <CustomAppBar title={"Size/Ratio"} />
          <CustomTable
            columns={layRatioColumns}
            rows={finalRatio ?? []}
            loading={isLayRatioLoading}
            toolBar={false}
            search={true}
            hideFooter={true}
            height={finalRatio?.length > 0 ? "auto" : "180px"}
            pagePerSize={99}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box sx={{ p: 1, border: "1px dashed grey" }}>
          <CustomAppBar title={"Lay Details"} />
          <CustomTable
            columns={layDetailsColumns}
            rows={finalDetails ?? []}
            loading={isLayDetailsLoading}
            toolBar={false}
            search={false}
            hideFooter={true}
            height={finalDetails?.length > 0 ? "auto" : "180px"}
            pagePerSize={99}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CuttingLaySizeRatioView;
