import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "./../components/navbar/Navbar";
import Footer from "./../components/footer/Footer";
import { useIsMounted } from "./../components/utils/mounted";

const Home: NextPage = () => {
  const isMounted = useIsMounted();
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT MarketPlace</title>
        <meta name="description" content="NFT ERC721 Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
};

export default Home;
