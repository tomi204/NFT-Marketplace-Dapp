import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./navbar.module.css";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className={styles.mainDiv}>
      <li>
        <Link href="/">
          <a className={styles.link}>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/sell">
          <a className={styles.link}>Sell NFT</a>
        </Link>
      </li>
      <li>
        <Link href="/wallet">
          <a className={styles.link}>Wallet</a>
        </Link>
      </li>

      <ConnectButton />
    </div>
  );
};

export default Navbar;
