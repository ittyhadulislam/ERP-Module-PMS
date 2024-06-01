import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import SubmitButton from "../../buttons/SubmitButton";
import ReportButton from "../../buttons/ReportButton";
import { useLazyNextImportForeignQuery } from "../../../redux/features/commercial/importInvoiceForeign/queryforeign";
import { errorToast, successToast } from "../../../common/toaster/toaster";
import { useSelector } from "react-redux";

const InvoiceForeignButton = ({ setGoToTab }) => {
  const { supplier, b2bLc, ref, invoice, date, adjustments, addGrnList } =
    useSelector((state) => state.foreignInvoice);
  // get next api
  const [getNext, { data, isLoading, error }] = useLazyNextImportForeignQuery();

  // handle click
  const handleClick = () => {
    getNext({ b2bLc: b2bLc?.b2BLC_Slno, invNo: invoice });
  };
  console.log(b2bLc);
  useEffect(() => {
    if (data) {
      successToast(data?.message);
      setGoToTab(1);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      errorToast(error?.data?.message);
    }
  }, [error]);
  return (
    <>
      <Box sx={{ my: 1, mb: "1px", border: "1px dashed grey", mr: "1px" }}>
        <Stack
          direction={"row"}
          p={0.5}
          spacing={2}
          justifyContent="space-between"
        >
          <span></span>

          <span style={{ margin: 0 }}>
            <ReportButton title={"Print invoice"} />
            <SubmitButton
              title={"Next"}
              handleClick={handleClick}
              loading={isLoading}
              disabled={addGrnList?.length == 0 || b2bLc === null}
            />
            {/* <Button
              variant="contained"
              size="small"
              //   onClick={() => setSubCatOpen(true)}
              sx={{
                paddingY: "0.42em",
                margin: "2px",
              }}
            >
              More Details
            </Button> */}
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default InvoiceForeignButton;
