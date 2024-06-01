import React from "react";
import EstimateBomInput from "../../components/merchandising/estimateBom/EstimateBomInput";
import CreateButton from "../../components/merchandising/estimateBom/CreateButton";
import TableInput from "../../components/merchandising/estimateBom/TableInput";

const EstimateBom = () => {
  return (
    <>
      <EstimateBomInput />
      <TableInput />
      <CreateButton />
    </>
  );
};

export default EstimateBom;
