import React from "react";
import styles from "./PageLoading.module.css";

const PageLoading = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default PageLoading;
