import { setAcceptance } from "../../redux/features/commercial/acceptance/acceptanceSlice";

export const setEditDataToRedux = (dispatch, data = {}) => {
  const {
    supplier_ID,
    cSupName,
    bblC_Code,
    bblC_No,
    invoiceNo,
    invoice_Value,
    submission_date,
    accept_Date,
    payment_Mode,
    payment_Mode_Name,
    maturity_Date,
    aType,
    aType_ref,
    accept_Value,
    exRate,
    remarks,
  } = data;
  console.log(data);
  dispatch(
    setAcceptance({
      key: "supplier",
      value: { supplier_ID: supplier_ID, cSupName: cSupName },
    })
  );
  setTimeout(() => {
    dispatch(
      setAcceptance({
        key: "b2bLc",
        value: { b2BLC_No: bblC_No, bblC_Code: bblC_Code },
      })
    );
    dispatch(
      setAcceptance({
        key: "invoiceNo",
        value: { imP_InvoiceNo: invoiceNo },
      })
    );
  }, 100);
  dispatch(
    setAcceptance({
      key: "invoiceValue",
      value: invoice_Value,
    })
  );
  dispatch(
    setAcceptance({
      key: "submissionDate",
      value: submission_date,
    })
  );
  dispatch(
    setAcceptance({
      key: "acceptedDate",
      value: accept_Date,
    })
  );
  dispatch(
    setAcceptance({
      key: "paymentTerm",
      value: { payment_ID: payment_Mode, payment_Name: payment_Mode_Name },
    })
  );
  dispatch(
    setAcceptance({
      key: "maturityDate",
      value: maturity_Date,
    })
  );
  dispatch(
    setAcceptance({
      key: "modeOfLC",
      value: { id: aType === "ABP" ? 1 : 2, text: aType },
    })
  );
  dispatch(
    setAcceptance({
      key: "ref",
      value: aType_ref,
    })
  );
  dispatch(
    setAcceptance({
      key: "acceptedAmount",
      value: accept_Value,
    })
  );
  dispatch(
    setAcceptance({
      key: "exchangeRate",
      value: exRate,
    })
  );
  dispatch(
    setAcceptance({
      key: "remarks",
      value: remarks,
    })
  );
};
