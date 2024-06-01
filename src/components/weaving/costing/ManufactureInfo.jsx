import React, { useEffect, useState } from "react";
import CustomAppBar from "../../common/CustomAppBar";
import { Box, Grid } from "@mui/material";
import CustomTable from "../../table/CustomTable";
import CustomTextInput from "../../inputs/CustomTextInput";
import AddButtonSmall from "../../merchandisingUI/AddButtonSmall";
import { warningToast } from "../../../common/toaster/toaster";
import {
  useGetCostingYarnCountQuery,
  useGetCostingYarnTypeQuery,
} from "../../../redux/features/weaving/costing/queryCosting";
import { LoadingButton } from "@mui/lab";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCostingState } from "../../../redux/features/weaving/costing/costingSlice";
import CustomTextInputSmall from "../../merchandisingUI/CustomTextInputSmall";

const ManufactureInfo = ({ isSaveSuccess = 0 }) => {
  const dispatch = useDispatch();
  const [yarnInfo, setYarnInfo] = useState([
    { id: 1, usedFor: "", yarnType: "", yarnCount: "", yarnRate: "" },
  ]);

  useEffect(() => {
    if (isSaveSuccess) {
      setYarnInfo([
        { id: 1, usedFor: "", yarnType: "", yarnCount: "", yarnRate: "" },
      ]);
    }
  }, [isSaveSuccess]);

  const {
    orderNo,
    orderInfo,
    totalEnds,
    greigeWith,
    coverFactor,
    bwGSM,
    fillingLength,
    exchangeRate,
    processAllowance,
  } = useSelector((state) => state.costing);

  // get yarn type
  const { data: yarnTypeData, isLoading: yarnTypeLoading } =
    useGetCostingYarnTypeQuery();
  // get yarn count
  const { data: yarnCountData, isLoading: yarnCountLoading } =
    useGetCostingYarnCountQuery();

  // handle add click
  const handleAddClick = () => {
    const lastId = yarnInfo[yarnInfo.length - 1].id;
    const canAdd = yarnInfo.filter(
      (e) =>
        e.usedFor === "" ||
        e.yarnCount === "" ||
        e.yarnRate === "" ||
        e.yarnType === ""
    );
    if (canAdd.length > 0) {
      warningToast("You can not add empty row!");
      return;
    }
    setYarnInfo((prev) => [
      ...prev,
      {
        id: lastId + 1,
        usedFor: "",
        yarnType: "",
        yarnCount: "",
        yarnRate: "",
      },
    ]);
  };
  const handleTextFieldChange = (id, value, fieldName) => {
    setYarnInfo((prev) =>
      prev?.map((e) => {
        if (id === e.id) {
          return { ...e, [fieldName]: value };
        } else {
          return { ...e };
        }
      })
    );
  };

  // const warpYarnRate=yarnInfo.map((e)=>{
  //   if(e.usedFor==='warp'){
  //     return e.yarnRate
  //   }
  // })

  const warpYarnRate = yarnInfo
    .filter((e) => e.usedFor === "Warp")
    .reduce((prev, current) => {
      return prev + +current.yarnRate;
    }, 0);
  const weftYarnRate = yarnInfo
    .filter((e) => e.usedFor === "Weft")
    .reduce((prev, current) => {
      return prev + +current.yarnRate;
    }, 0);

  const requiredGreigeAllowance = Math.round(
    orderInfo?.fabricQty * (1 + +processAllowance / 100)
  );

  useEffect(() => {
    dispatch(setCostingState({ key: "warpYarnRate", value: warpYarnRate }));
    dispatch(setCostingState({ key: "weftYarnRate", value: weftYarnRate }));
  }, [warpYarnRate, weftYarnRate]);

  const Columns = [
    {
      field: "usedFor",
      headerName: "Used For",
      accessor: "action",
      minWidth: 60,
      flex: 1,
      renderCell: (row) => {
        const { id } = row?.row;
        return (
          <>
            {" "}
            <select
              onChange={(e) =>
                handleTextFieldChange(id, e.target.value, "usedFor")
              }
              placeholder="select used for"
              style={{
                border: 0,
                borderBottom: "1px solid gray",
                background: "transparent",
                //   outline: "none",
                width: "100%",
              }}
            >
              <option label=""></option>
              <option label="Warp" value={"Warp"}></option>
              <option label="Weft" value={"Weft"}></option>
            </select>
          </>
        );
      },
    },
    {
      field: "yarnType",
      headerName: "Yarn Type",
      minWidth: 60,
      flex: 1,
      renderCell: (row) => {
        const { id } = row?.row;
        return (
          <>
            {" "}
            <select
              onChange={(e) =>
                handleTextFieldChange(id, e.target.value, "yarnType")
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
              {yarnTypeLoading && (
                <option label="Loading...">Loading...</option>
              )}
              {yarnTypeData?.map((e) => (
                <option
                  label={e?.yt_description}
                  value={e?.yt_id}
                  key={e?.yt_id}
                >
                  {e?.yt_description}
                </option>
              ))}
            </select>
          </>
        );
      },
    },
    {
      field: "yarnCount",
      headerName: "Yarn Count",
      minWidth: 60,
      flex: 1,
      renderCell: (row) => {
        const { id } = row?.row;
        return (
          <>
            {" "}
            <select
              onChange={(e) =>
                handleTextFieldChange(id, e.target.value, "yarnCount")
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
              {yarnCountLoading && (
                <option label="Loading...">Loading...</option>
              )}
              {yarnCountData?.map((e) => (
                <option
                  label={e?.yc_description}
                  value={e?.yc_id}
                  key={e?.yc_id}
                >
                  {e?.yc_description}
                </option>
              ))}
            </select>
          </>
        );
      },
    },
    {
      field: "yarnRate",
      headerName: "Yarn Rate (USD)",
      minWidth: 60,
      flex: 1,
      renderCell: (row) => {
        const { id } = row?.row;
        return (
          <input
            type="number"
            // maxLength="4"
            // onInput={(e) => {
            //   if (isNaN(parseInt(e.target.value))) {
            //     e.target.value = 0;
            //     return warningToast("Please Enter a Number");
            //   } else {
            //     e.target.value = Math.max(0, parseInt(e.target.value))
            //       .toString()
            //       .slice(0, 4);
            //   }
            // }}
            placeholder="Type Yarn Rate"
            style={{
              border: 0,
              borderBottom: "1px solid gray",
              background: "transparent",
              //   outline: "none",
              width: "100%",
            }}
            // defaultValue={defaultTime}
            onChange={(e) =>
              handleTextFieldChange(id, e.target.value, "yarnRate")
            }
          />
        );
      },
    },
    {
      field: "id",
      headerName: "",
      accessor: "action",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="outlined"
              size="small"
              color="error"
              title="DELETE"
              sx={{ p: 0, minWidth: 10, maxWidth: 20 }}
              onClick={() => {
                yarnInfo.length <= 1
                  ? ""
                  : setYarnInfo((prev) =>
                      prev.filter((e) => e.id !== row?.row?.id)
                    );
              }}
            >
              <MdOutlineDelete size={18} />
            </LoadingButton>
          </Box>
        );
      },
      minWidth: 40,
      maxWidth: 40,
    },
  ];

  useEffect(() => {
    dispatch(setCostingState({ key: "YarnInfoTable", value: yarnInfo }));
  }, [yarnInfo]);

  return (
    <Box my={1}>
      <CustomAppBar title={"MANUFACTURING info"} />
      <Box
        sx={{
          p: 1,
          border: "1px dashed grey",
          mr: "1px",
          //   mt: 1.5,
          borderTop: 0,
          position: "relative",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <CustomTable
              columns={Columns}
              rows={yarnInfo ?? []}
              // loading={isLayRatioLoading}
              toolBar={false}
              search={true}
              hideFooter={true}
              height={yarnInfo?.length > 0 ? "auto" : "180px"}
              pagePerSize={99}
            />
            <Box
              sx={{
                mt: "2px",
                textAlign: "right",
                cursor: "pointer",
              }}
            >
              <AddButtonSmall handleClick={handleAddClick} title={"Add New"} />
              {/* <CiCirclePlus size={18} onClick={handleAddClick} color="green" /> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Exchange Rate of USD in BDT"}
                  name="exchangeRate"
                  type="number"
                  value={exchangeRate}
                  setReduxState={setCostingState}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Filling Length"}
                  name="fillingLength"
                  type="number"
                  value={fillingLength}
                  setReduxState={setCostingState}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Greige Width (inch)"}
                  name="greigeWith"
                  type="number"
                  value={greigeWith}
                  setReduxState={setCostingState}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Process Allowance %"}
                  name="processAllowance"
                  type="number"
                  value={processAllowance}
                  setReduxState={setCostingState}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Required Greige With Process Allowance %"}
                  value={orderNo ? requiredGreigeAllowance : ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"B/W GSM"}
                  value={orderNo ? bwGSM : ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Cover Factor"}
                  value={orderNo ? coverFactor : ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextInputSmall
                  label={"Total Ends"}
                  value={orderNo ? totalEnds : ""}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ManufactureInfo;
