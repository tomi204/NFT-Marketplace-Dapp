import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";

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
  const { data, isLoading, isSuccess, write, isError } =
    useContractWrite(config);

  if (isError) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          Error
          {data}
        </Alert>
      </>
    );
  }
  if (isSuccess) {
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon />
      Buyed successfully
    </Alert>;
  }

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
          fontSize={{ base: "small", md: "md", lg: "lg" }}
          onClick={() => write?.()}
        >
          BUY NFT
        </Button>
      )}
    </>
  );
};
