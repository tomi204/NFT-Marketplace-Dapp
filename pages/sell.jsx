import React from "react";
import { Sell } from "./../components/api/ListNFT";
import Navbar from "./../components/navbar/Navbar";
import { useIsMounted } from "./../components/utils/mounted";
import styles from "../styles/sell.module.css";
import Footer from "./../components/footer/Footer";
const SellNFT = () => {
  const mounted = useIsMounted();
  return (
    <div className={styles.pageSell}>
      <Navbar />
      <br />
      {mounted ? <Sell /> : null}
      <Footer />
    </div>
  );
};

export default SellNFT;
