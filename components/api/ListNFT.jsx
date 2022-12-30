import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { CheckIcon } from "@chakra-ui/icons";
import styles from "../../styles/api.module.css";
import contractAdress from "./ContractAdress";
export const Sell = () => {
  const { address, isConnected } = useAccount();
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState("");
  const [nft, setNft] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleChangeToken = (number) => setNumber(number);
  const handleChangeName = (name) => setName(name);
  const handleChangeDesc = (desc) => setDesc(desc);
  const handleChangeURI = (tokenURI) => setTokenURI(tokenURI);
  const handleChangeAddress = (nft) => setNft(nft);
  const handleChangePrice = (price) => setPrice(price);
  const { config } = usePrepareContractWrite({
    address: contractAdress,
    chainId: 5,
    overrides: {
      from: address,
    },
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_nft",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "string",
            name: "_image",
            type: "string",
          },
        ],
        name: "listNFT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: [nft, parseInt(number), parseInt(price), name, desc, tokenURI],
    enabled: [nft, number, price, name, desc, tokenURI],
    functionName: "listNFT",
  });
  const { write } = useContractWrite(config);

  return (
    <>
      {isConnected && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div className={styles.divForm}>
            <br />
            {/* address form */}
            <InputGroup size="sm" className={styles.input}>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                placeholder="NFT ADDRESS"
                value={nft}
                onChange={(e) => setNft(e.target.value)}
              />
            </InputGroup>
            {/* price form*/}
            <br />
            <InputGroup size="sm" className={styles.input}>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                <FaEthereum />
              </InputLeftElement>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                type={"number"}
                placeholder="ENTER NFT PRICE"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
            {/* token id */}
            <br />
            <InputGroup size="sm" className={styles.input}>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                type={"number"}
                placeholder="Token ID"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </InputGroup>

            <br />
            {/* name form */}
            <InputGroup size="sm" className={styles.input}>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                placeholder="NAME OF NFT"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <br />
            <InputGroup size="sm">
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                placeholder="DESCRIPTION OF NFT "
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputGroup>
            <br />
            {/* https form */}

            <InputGroup size="sm" className={styles.input}>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                placeholder="URL OF NFT IMAGE"
                onChange={(e) => setTokenURI(e.target.value)}
                value={tokenURI}
              />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>
            <br />
            <Button
              onClick={() => write?.()}
              style={{
                borderRadius: 50,
                backgroundColor: "black",
                color: "white",
                width: "50%",
                height: "50px",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              LIST NFT
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
