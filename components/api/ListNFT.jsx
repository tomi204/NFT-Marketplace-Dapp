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
import lighthouse from "@lighthouse-web3/sdk";
import ApproveMarketplace from "./ApproveMarketplace";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { CheckIcon } from "@chakra-ui/icons";
import styles from "../../styles/api.module.css";
import contractAdress from "./ContractAdress";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { parseEther } from "ethers/lib/utils.js";
import { calcLength } from "framer-motion";
const API = process.env.NEXT_PUBLIC_APIKEY;

export const Sell = () => {
  const { address, isConnected } = useAccount();
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState("");
  const [nft, setNft] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [ethPrice, setEthPrice] = useState(0);
  const getEthPrice = async () => {
    const response = await fetch("https://api.coinlore.net/api/ticker/?id=80");
    const data = await response.json(); // Extracting data as a JSON Object from the response
    const parseNumber1 = data[0].price_usd;

    setEthPrice(parseNumber1);
  };

  useEffect(() => {
    getEthPrice();
  }, []);
  function parsePrice() {
    if (price > "0") {
      const priceInWei = ethers.utils.parseEther(price);
      return priceInWei;
    }
  }
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async (e) => {
    // Push file to lighthouse node
    const output = await lighthouse.upload(e, API, progressCallback);
    console.log("File Status:", output.data.Hash);
    const uri = "https://gateway.lighthouse.storage/ipfs/" + output.data.Hash;
    setTokenURI(uri);
  };

  const { config } = usePrepareContractWrite({
    address: contractAdress,
    chainId: 5,
    overrides: {
      from: address,
      gasLimit: 1000000,
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
    args: [nft, parseInt(number), parsePrice(), name, desc],
    enabled: [nft, number, price, name, desc, tokenURI],
    functionName: "listNFT",
  });
  const { write } = useContractWrite(config);

  return (
    <>
      {isConnected ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            height: "100%",
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
                textColor={"black"}
                value={nft}
                onChange={(e) => setNft(e.target.value)}
              />
            </InputGroup>
            {/* price form*/}
            <br />
            <InputGroup size="sm" className={styles.input}>
              <InputLeftElement
                pointerEvents="none"
                color="black"
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
                placeholder="NFT PRICE"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputRightElement
                alignItems={"center"}
                justifyContent={"center"}
                width={"25%"}
                pointerEvents="none"
                color="black"
                fontSize="1.2em"
              >
                <FaDollarSign />
                {(price * ethPrice)?.toFixed(0)}
              </InputRightElement>
            </InputGroup>
            {/* token id */}
            <br />
            <InputGroup size="sm" className={styles.input}>
              <InputLeftElement pointerEvents="none" color="black">
                ID
              </InputLeftElement>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                borderColor={"black"}
                type={"number"}
                placeholder="NFT TOKEN ID"
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
                placeholder="NFT NAME"
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
                placeholder="NFT DESCRIPTION"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </InputGroup>
            <br />
            {/* https form */}

            <InputGroup size="sm" className={styles.input}>
              <Input
                borderTop={"none"}
                borderRight={"none"}
                borderLeft={"none"}
                type={"file"}
                borderColor={"black"}
                onChange={(e) => deploy(e)}
              />
            </InputGroup>
            <br />
            <ApproveMarketplace NFT={nft} tokenID={number} />
            <br />
            <Button
              onClick={() => write?.()}
              colorScheme="blue"
              borderRadius={"10px"}
              size={"lg"}
            >
              LIST NFT
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Alert
            status="error"
            style={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <AlertIcon />
            <AlertTitle>Connect your wallet</AlertTitle>
            <br />
            <AlertDescription>
              connect your wallet to access this function
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};
