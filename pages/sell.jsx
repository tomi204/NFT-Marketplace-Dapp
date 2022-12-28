import React from "react";
import { Sell } from "./../components/api/ListNFT";
import Navbar from "./../components/navbar/Navbar";
import { useIsMounted } from "./../components/utils/mounted";
import styles from "../styles/sell.module.css";
const SellNFT = () => {
  const mounted = useIsMounted();
  return (
    <div className={styles.pageSell}>
      <Navbar />
      {mounted ? <Sell /> : null}
    </div>
  );
};

export default SellNFT;
