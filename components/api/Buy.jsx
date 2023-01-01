import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

export const Buy = (id, token) => {
  const { address, isConnected } = useAccount();
  const itemId = id.id.id;
  console.log(token);
  const tokenId = id.id.tokenId;
  const price = id.id.price;
  const priceInt = parseInt(price);

  const { config } = usePrepareContractWrite({
    address: "0x88Ab79411cDc6A17cA1D8233A505FC4d41BC7f80",
    chainId: 5,

    overrides: {
      from: address,
      value: priceInt,
    },
    functionName: "buyNFT",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_itemId",
            type: "uint256",
          },
        ],
        name: "buyNFT",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    args: [itemId],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      {isConnected && (
        <button
          className="custom-btn btn-9"
          disabled={isSuccess}
          style={{ borderRadius: "20px" }}
          onClick={() => write?.()}
        >
          Buy
        </button>
      )}
    </>
  );
};
