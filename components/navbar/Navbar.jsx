import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.mainDiv}>
      <ConnectButton />
    </div>
  );
};

export default Navbar;
