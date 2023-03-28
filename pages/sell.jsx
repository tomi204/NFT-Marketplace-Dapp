import React from "react";
import { Sell } from "./../components/api/ListNFT";
import Navbar from "./../components/navbar/Navbar";
import { useIsMounted } from "./../components/utils/mounted";
import styles from "../styles/sell.module.css";
import Footer from "./../components/footer/Footer";
import MobileNav from "./../components/mobileNav/MobileNav";
import { GetAllItems } from "../components/api/ListedTokens";
import NFTCard from "../components/OwnedNFTCard/NFTCard";
const SellNFT = () => {
  const mounted = useIsMounted();
  const { itemsFind, isLoading } = GetAllItems();

  return (
    <div className={styles.pageSell}>
      <Navbar />
      <MobileNav />
      {mounted ? <NFTCard /> : null}
      {/* <div className={styles.sellDiv}>{mounted ? <Sell /> : null}</div> */}
    </div>
  );
};

export default SellNFT;
