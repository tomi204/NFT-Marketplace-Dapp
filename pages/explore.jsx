import React from "react";
import Product from "./../components/nftCard/Product";
import { useIsMounted } from "./../components/utils/mounted";

const Explore = () => {
  const mounted = useIsMounted();
  return <div>{mounted ? <Product /> : null}</div>;
};

export default Explore;
