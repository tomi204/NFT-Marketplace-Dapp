import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";

export const Cancel = (id, token) => {
  const { address, isConnected } = useAccount();
  const itemId = id.id;

  const { config } = usePrepareContractWrite({
    address: "0x88Ab79411cDc6A17cA1D8233A505FC4d41BC7f80",
    chainId: 5,

    overrides: {
      from: address,
    },
    functionName: "cancelSale",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_itemId",
            type: "uint256",
          },
        ],
        name: "cancelSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: [itemId],
    onError: (error) => {
      return (
        <>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </>
      );
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
        <Alert status="error" fontSize={{ base: "small", md: "md", lg: "lg" }}>
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
      fontSize={{ base: "small", md: "md", lg: "lg" }}
    >
      <AlertIcon />
      Cancelled sucessfully
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
          fontSize={{ base: "small", md: "md", lg: "lg" }}
          isLoading={isLoading}
          loadingText="Canceling"
          onClick={() => write?.()}
        >
          Cancel Sell
        </Button>
      )}
    </>
  );
};
