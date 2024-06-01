import React, { useEffect, useState } from "react";
import PrintInput from "./PrintInput";
import { initialState } from ".";
import { Box, Stack } from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";
import { useSelector } from "react-redux";
import { useSavePrintEmbroideryMutation } from "../../redux/features/cutting/printAndEmbroidery/mutationPrintAndEmbroidery";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../common/toaster/toaster";
import { useGetPrintAndEmbroideryViewQuery } from "../../redux/features/cutting/printAndEmbroidery/queryPrintAndEmbroidery";
import PrintSizeInfo from "./PrintSizeInfo";

const PrintAndEmbroideryContainer = () => {
  const { user } = useSelector((state) => state.auth);
  const [localState, setLocalState] = useState(initialState);
  const [finalSizeInfo, setFinalSizeInfo] = useState([]);
  const { style, po, country, color, floor, date, line, stage, sendReceive } =
    localState;

  // Save PrintEmbroidery Mutation
  const [
    savePrintEmbroidery,
    {
      data: saveData,
      isSuccess: isSaveSuccess,
      isLoading: isSaveLoading,
      isError: isSaveError,
    },
  ] = useSavePrintEmbroideryMutation();

  // Get PrintAndEmbroidery View Query
  const {
    data: viewData,
    isLoading,
    isSuccess,
    refetch,
  } = useGetPrintAndEmbroideryViewQuery(
    {
      id: user?.companyID,
      style: style?.nStyleID,
      po: po?.cOrderNu,
      country: country?.nConCode,
      color: color?.nColNo,
      peType: stage?.st_id,
      sendReceive: sendReceive?.sr_id,
    },
    { refetchOnMountOrArgChange: true }
  );

  //   handleSave function
  const handleSave = (e) => {
    e.preventDefault();
    const payload = finalSizeInfo
      ?.filter((e) => e.receiveQuantity || e.sentQuantity)
      .map((el) => ({
        comID: user?.companyID,
        styleID: style?.nStyleID,
        style: style?.cStyleNo,
        stageID: stage?.st_id,
        stage: stage?.st_des,
        po: po?.cPoNum,
        country: country?.cConDes,
        countryID: country?.nConCode,
        lot: po?.cOrderNu,
        colorID: color?.nColNo,
        color: color?.cColour,
        lineID: line?.line_Code,
        line: line?.line_No,
        hour: 0,
        inputdate: date,
        pesendrcvd: sendReceive?.sr_id,
        sizeID: el?.sizeID,
        size: el?.cSize,
        inputqty: el.sentQuantity | el.receiveQuantity,
        userName: user?.userName,
      }));
    if (payload.length === 0) {
      return warningToast("Input Quantity Empty");
    }
    savePrintEmbroidery(payload);
  };

  const sizeInfoView = viewData?.map((row, i) => ({ ...row, id: i }));

  useEffect(() => {
    if (isSuccess) {
      setFinalSizeInfo(sizeInfoView);
    }
  }, [viewData, isSuccess]);
  // toaster
  useEffect(() => {
    if (isSaveError) errorToast("Something Went Wrong");
    if (isSaveSuccess) {
      successToast(saveData?.message);
      refetch();
    }
  }, [isSaveError, isSaveSuccess, saveData]);

  return (
    <>
      <form onSubmit={handleSave}>
        <PrintInput localState={localState} setLocalState={setLocalState} />
        <PrintSizeInfo
          isLoading={isLoading}
          localState={localState}
          finalSizeInfo={finalSizeInfo}
          setFinalSizeInfo={setFinalSizeInfo}
        />

        <Box sx={{ mb: 0, border: "1px dashed grey" }}>
          <Stack
            direction={"row"}
            p={0.5}
            spacing={2}
            justifyContent="space-between"
          >
            <span></span>

            <span>
              <SubmitButton
                title={"Save PNTR"}
                type="submit"
                loading={isSaveLoading}
              />
            </span>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default PrintAndEmbroideryContainer;
