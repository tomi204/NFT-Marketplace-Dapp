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
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { CheckIcon } from "@chakra-ui/icons";
import styles from "./api.module.css";
import contractAdress from "./ContractAdress";
export const Sell = () => {
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const [number, setNumber] = useState("0");
  const [price, setPrice] = useState("0");
  const [nft, setNft] = useState("0x0000000000000000000000000000000000000000");
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const onChangeValue2 = (event) => {
    if (event.target.value === "") {
      setNft("0x0000000000000000000000000000000000000000");
      return String.fromCharCode(parseInt("0x" + setNft, 16));
    } else {
      setNft(event.target.value);
      return String.fromCharCode(parseInt("0x" + setNft, 16));
    }
  };
  const onChangeValue4 = (event) => {
    if (event.target.value === "") {
      setName("");
    } else {
      setName(event.target.value);
    }
  };
  const onChangeValue5 = (event) => {
    if (event.target.value === "") {
      setDesc("");
    } else {
      setDesc(event.target.value);
    }
  };
  const onChangeValue3 = (event) => {
    if (event.target.value === "") {
      setTokenURI("");
    } else {
      setTokenURI(event.target.value);
    }
  };
  const onChangeValue = (event) => {
    if (event.target.value === "") {
      setNumber("1");
    } else {
      setNumber(event.target.value);
    }
  };
  const onChangeValue1 = (event) => {
    if (event.target.value === "") {
      setPrice("1");
    } else {
      setPrice(event.target.value);
    }
  };
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
          <h1>Sell NFT</h1>
          <br />

          <InputGroup size="sm" className={styles.input}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              NFT Address
            </InputLeftElement>
            <Input
              placeholder="0x0000000000000000000000000000000000"
              min={0}
              value={nft}
              onChange={onChangeValue2}
            />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>

          <InputGroup size="sm" className={styles.input}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <FaEthereum />
            </InputLeftElement>
            <Input placeholder="Enter amount" value={price} />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>

          <InputGroup size="sm" className={styles.input}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              TokenId
            </InputLeftElement>
            <Input
              placeholder="1"
              value={number}
              min={0}
              onChange={onChangeValue}
            />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>

          <InputGroup size="sm" className={styles.input}>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input
              placeholder="ipfs.io"
              onChange={onChangeValue3}
              value={tokenURI}
            />
            <InputRightAddon>.com</InputRightAddon>
          </InputGroup>
          <InputGroup size="sm" className={styles.input}>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="name" value={name} onChange={onChangeValue4} />
            <InputRightAddon>.com</InputRightAddon>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="desc" value={desc} onChange={onChangeValue5} />
            <InputRightAddon>.com</InputRightAddon>
          </InputGroup>
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
      )}
    </>
  );
};
