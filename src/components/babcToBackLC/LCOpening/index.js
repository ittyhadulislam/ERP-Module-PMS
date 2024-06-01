import { setBackToBack } from "../../../redux/features/commercial/backToBackLC/backToBackLcSlice";

export const setExistingData = (dispatch, data) => {
  const {
    issuing_Bank,
    issuing_Bank_Name,
    masterLCCode,
    masterLCNo,
    benificiery,
    benificiery_Name,
    receiving_Bank,
    receiving_Bank_Name,
    opening_Date,
    lastShipment_Date,
    doc_Receive_Date,
    expire_Date,
    b2BLC_Value,
    amendment_Date,
    payTerm,
    payTerm_Name,
    currency,
    exRate,
    status,
    udAmendment,
    itemDescription,
    remarks,
    lcValue,
    bblC_Amandment,
  } = data[0];
  dispatch(
    setBackToBack({
      key: "lcIssuingBank",
      value: { bank_Code: issuing_Bank, bank_Name: issuing_Bank_Name },
    })
  );
  dispatch(
    setBackToBack({
      key: "contract",
      value: { cContractNo: masterLCNo, contract_Slno: masterLCCode },
    })
  );
  dispatch(
    setBackToBack({
      key: "beneficiary",
      value: { nCode: benificiery, cSupName: benificiery_Name },
    })
  );
  dispatch(
    setBackToBack({
      key: "receiveBank",
      value: { bank_Code: receiving_Bank, bank_Name: receiving_Bank_Name },
    })
  );
  dispatch(
    setBackToBack({
      key: "openingDate",
      value: opening_Date,
    })
  );
  dispatch(
    setBackToBack({
      key: "deliveryDate",
      value: lastShipment_Date,
    })
  );
  dispatch(
    setBackToBack({
      key: "docRecvDate",
      value: doc_Receive_Date,
    })
  );
  dispatch(
    setBackToBack({
      key: "expiryDate",
      value: expire_Date,
    })
  );
  dispatch(
    setBackToBack({
      key: "amendmentDate",
      value: amendment_Date,
    })
  );
  dispatch(
    setBackToBack({
      key: "paymentTerm",
      value: { payment_ID: payTerm, payment_Name: payTerm_Name },
    })
  );
  dispatch(
    setBackToBack({
      key: "currency",
      value: { currency_Name: currency },
    })
  );
  dispatch(
    setBackToBack({
      key: "lcStatus",
      value: { status_name: status },
    })
  );
  dispatch(
    setBackToBack({
      key: "exchangeRate",
      value: exRate,
    })
  );
  dispatch(
    setBackToBack({
      key: "udAmendment",
      value: udAmendment,
    })
  );
  dispatch(
    setBackToBack({
      key: "itemDescription",
      value: itemDescription,
    })
  );
  dispatch(
    setBackToBack({
      key: "remarks",
      value: remarks,
    })
  );
  dispatch(
    setBackToBack({
      key: "amendmentValue",
      value: bblC_Amandment,
    })
  );
};
export const reSetExistingData = (dispatch) => {
  dispatch(
    setBackToBack({
      key: "lcIssuingBank",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "contract",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "beneficiary",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "receiveBank",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "openingDate",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "deliveryDate",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "docRecvDate",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "expiryDate",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "amendmentDate",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "paymentTerm",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "currency",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "lcStatus",
      value: null,
    })
  );
  dispatch(
    setBackToBack({
      key: "exchangeRate",
      value: "",
    })
  );
  dispatch(
    setBackToBack({
      key: "udAmendment",
      value: "",
    })
  );
  dispatch(
    setBackToBack({
      key: "itemDescription",
      value: "",
    })
  );
  dispatch(
    setBackToBack({
      key: "remarks",
      value: "",
    })
  );
  dispatch(
    setBackToBack({
      key: "amendmentValue",
      value: "",
    })
  );
};
