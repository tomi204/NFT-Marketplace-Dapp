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
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);
  const [nft, setNft] = useState("0x0000000000000000000000000000000000000000");
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleChangeToken = (number) => setNumber(number);
  const handleChangeName = (name) => setName(name);
  const handleChangeDesc = (desc) => setDesc(desc);
  const handleChangeURI = (tokenURI) => setTokenURI(tokenURI);
  const handleChangeAddress = (nft) => setNft(nft);
  const handleChangePrice = (price) => setPrice(price);

  console.log(number);

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
    args: [
      ethers.utils.getAddress(nft),
      ethers.BigNumber.from(number),
      ethers.BigNumber.from(price),
      name,
      desc,
      tokenURI,
    ],

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
            <h1>Sell NFT</h1>
            <br />
            {/* address form */}
            <InputGroup size="sm" className={styles.input}>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              ></InputLeftElement>
              <Input
                placeholder="0x0000000000000000000000000000000000"
                min={0}
                value={nft}
                defaultValue={nft}
                onChange={handleChangeAddress}
              />
              <InputRightElement>
                <CheckIcon color="green.500" />
              </InputRightElement>
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
                type={"number"}
                placeholder="Enter amount"
                value={price}
                defaultValue={1}
                onChange={handleChangePrice}
              />
              <InputRightElement>
                <CheckIcon color="green.500" />
              </InputRightElement>
            </InputGroup>
            {/* token id */}
            <br />
            <InputGroup size="sm" className={styles.input}>
              <NumberInput
                size="xs"
                maxW={16}
                type={"number"}
                defaultValue={15}
                value={number}
                onChange={handleChangeToken}
                min={10}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            {/* https form */}
            <br />
            <InputGroup size="sm" className={styles.input}>
              <InputLeftAddon>https://</InputLeftAddon>
              <Input
                placeholder="ipfs.io"
                onChange={handleChangeURI}
                value={tokenURI}
              />
              <InputRightAddon>.com</InputRightAddon>
            </InputGroup>
            <br />
            {/* name form */}
            <InputGroup size="sm" className={styles.input}>
              <Input
                placeholder="name"
                value={name}
                onChange={handleChangeName}
              />
            </InputGroup>
            <br />
            <InputGroup size="sm">
              <Input
                placeholder="desc"
                value={desc}
                onChange={handleChangeDesc}
              />
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
              sell NFT
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
