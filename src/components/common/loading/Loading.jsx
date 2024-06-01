import React from "react";
import styles from "./loading.style.module.css";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
