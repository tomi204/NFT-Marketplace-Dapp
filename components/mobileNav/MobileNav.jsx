import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import styles from "./mobileNav.module.css";
import {
  FaHome,
  FaMoneyBillAlt,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
const MobileNav = () => {
  return (
    <div className={styles.mobileNav}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <Link href="/">
            <MenuItem icon={<FaShoppingCart />}>Home</MenuItem>
          </Link>
          <Link href="/sell">
            <MenuItem icon={<FaMoneyBillAlt />}>Sell NFT</MenuItem>
          </Link>
          <Link href="/wallet">
            <MenuItem icon={<FaWallet />}>Wallet</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <div className={styles.connectBtn}>
        <ConnectButton />
      </div>
    </div>
  );
};

export default MobileNav;
