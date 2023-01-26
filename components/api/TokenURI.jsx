import { useContractRead, useContractReads } from "wagmi";
import React from "react";
import { erc721ABI } from "wagmi";
export default function TokenURI(tokenId, contractAddress) {
  const contractConfig = {
    address: contractAddress,
    chainId: 5,
    abi: erc721ABI,
  };

  const { data, isSuccess } = useContractReads({
    cacheKey: "tokenURI",
    enabled: [tokenId, contractAddress],
    contracts: [
      {
        ...contractConfig,
        functionName: "_baseURI",
        args: [tokenId],
        abi: erc721ABI,
      },
      {
        ...contractConfig,
        functionName: "tokenURI",
        args: [tokenId],
      },
    ],
  });
  return data[1];
}
