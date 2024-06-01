import React from "react";
import CreatePriceComparison from "../../components/scm/CreatePriceComparison";
import TabPanel from "../../components/tabPannel/TabPanel";
import EditPriceComparison from "../../components/scm/EditPriceComparison";
import { useDispatch } from "react-redux";
import { resetAllFields } from "../../redux/features/scm/priceComparison/priceComparisonSlice";

const PriceComparison = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetAllFields());
  };

  return (
    <>
      <TabPanel
        tabData={[
          {
            handleClick,
            label: "create price comparison",
            components: <CreatePriceComparison />,
          },
          {
            handleClick,
            label: "edit price comparison",
            components: <EditPriceComparison />,
          },
        ]}
      />
    </>
  );
};

export default PriceComparison;
