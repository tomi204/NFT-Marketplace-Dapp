import React from "react";
import {
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import styles from "./footer.module.css";
import { Link } from "next/link";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/tomi204">
        <FaGithub className={styles.icon} />
      </a>
      <a href="https://twitter.com/tomiioliver">
        <FaTwitter className={styles.icon} />
      </a>
      <a target="_blank" rel="noopener noreferrer">
        Made with ❤️ by Tomi204
      </a>
      <a href="https://www.linkedin.com/in/tomi204/">
        <FaLinkedinIn className={styles.icon} />
      </a>
      <a href="https://www.instagram.com/tomi204_/">
        <FaInstagram className={styles.icon} />
      </a>
    </footer>
  );
};

export default Footer;
