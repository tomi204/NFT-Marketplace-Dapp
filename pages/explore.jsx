import React from "react";
import Product from "./../components/nftCard/Product";
import { useIsMounted } from "./../components/utils/mounted";
import Navbar from "./../components/navbar/Navbar";

const Explore = () => {
  const mounted = useIsMounted();
  return (
    <div>
      <Navbar />
      {mounted ? <Product /> : null}
    </div>
  );
};

export default Explore;
