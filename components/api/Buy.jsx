import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Button } from "@chakra-ui/react";

export const Buy = (id, token) => {
  const { address, isConnected } = useAccount();
  const itemId = id.id;
  const price = id.token;
  const { config } = usePrepareContractWrite({
    address: "0x88Ab79411cDc6A17cA1D8233A505FC4d41BC7f80",
    chainId: 5,

    overrides: {
      from: address,
      value: price,
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
        <Button
          className="custom-btn btn-9"
          disabled={isSuccess}
          colorScheme="blue"
          hoverColor="blue.1200"
          isLoading={isLoading}
          loadingText="Buying"
          onClick={() => write?.()}
        >
          BUY NFT
        </Button>
      )}
    </>
  );
};
