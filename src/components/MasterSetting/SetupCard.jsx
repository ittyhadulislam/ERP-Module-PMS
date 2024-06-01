import React, { useState } from "react";
import styles from "./SetupCard.module.css";
import SetupModal from "./SetupModal";

const SetupCard = ({ masterItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setOpen(true)}>
        <div className={styles.card_main}>
          {masterItem.icon}
          <div className={styles.card_description}>{masterItem.routeName}</div>
        </div>
      </div>
      {open && (
        <SetupModal
          open={open}
          onClose={() => setOpen(false)}
          title={masterItem?.routeName}
        >
          {masterItem?.element}
        </SetupModal>
      )}
    </>
  );
};

export default SetupCard;
