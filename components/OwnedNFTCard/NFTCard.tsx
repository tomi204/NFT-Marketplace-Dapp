import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Container,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { GetAllItems } from "./../api/ListedTokens";
import styles from "./NFTCard.module.css";
import { Spinner } from "@chakra-ui/react";
import contractAdress from "../api/ContractAdress";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
const NFTCard = (data: any) => {
  const { address } = useAccount();
  const [price, setPrice] = useState("");
  const [sellModal, setSellModal] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  const [item, setItem] = useState();

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
  } /// Parse price to wei
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
      item?.contract.address,
      item?.tokenId,
      parsePrice(),
      item?.title,
      item?.description,
      item?.rawMetadata.image,
    ],
    functionName: "listNFT",
  });
  const { write, isLoading } = useContractWrite(config);

  const { loadingOwner, nfts: userNFTs } = GetAllItems();

  if (loadingOwner) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h1>No NFTs</h1>
      </div>
    );
  }

  const nfts = userNFTs?.ownedNfts;
  console.log(item, "item setted");
  console.log(sellModal, "set item");
  if (sellModal) {
    return (
      <Card
        display={"flex"}
        marginTop={"20"}
        alignItems={"center"}
        justifyItems={"center"}
        flexDirection={"column"}
      >
        <CardBody
          display={"flex"}
          flexDirection={"column"}
          justifyItems={"center"}
          alignItems={"center"}
          width={"50%"}
        >
          <img
            src={item?.rawMetadata.image}
            alt={item?.name}
            borderRadius="lg"
            width={"50%"}
            className={styles.imgCard}
          />
          <br />
          <Container
            color="blue.600"
            className={styles.precio}
            width={"100%"}
            fontSize={[15, 17, 18, 23]}
          >
            {item.title}
          </Container>
          <br />
          <Container
            color="blue.600"
            className={styles.precio}
            width={"100%"}
            fontSize={[15, 17, 18, 23]}
          >
            # {item?.tokenId}
          </Container>
          <br />
          <Container
            color="blue.600"
            className={styles.precio}
            width={"100%"}
            fontSize={[15, 17, 18, 23]}
            _hover={{
              color: "blue.600",
              cursor: "pointer",
            }}
          >
            {item.contract.address.slice(0, 6) +
              "..." +
              item.contract.address.slice(
                item.contract.address.length - 4,
                item.contract.address.length
              )}
          </Container>

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
          <br />
          <Button
            colorScheme="blue"
            variant="solid"
            width={"50%"}
            onClick={() => write?.()}
          >
            Sell NFT
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div>
      {loadingOwner ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className={styles.mainCard}>
          {nfts?.map((item: any) => (
            <Card
              maxW="sm"
              key={item.id}
              justifyContent={"center"}
              margin={"10%"}
              borderRadius={"lg"}
              boxShadow={"dark-lg"}
            >
              <img
                src={item.rawMetadata.image}
                alt={item.name}
                borderRadius="lg"
                className={styles.imgCard}
              />

              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{item.name}</Heading>
                </Stack>
                <br />
                <Container
                  color="blue.600"
                  className={styles.precio}
                  width={"100%"}
                  fontSize={[15, 17, 18, 23]}
                >
                  {item.title}
                </Container>
                <br />
                <Container
                  color="blue.600"
                  className={styles.precio}
                  width={"100%"}
                  fontSize={[15, 17, 18, 23]}
                >
                  # {item.tokenId}
                </Container>
                <br />
                <Container
                  color="blue.600"
                  className={styles.precio}
                  width={"100%"}
                  fontSize={[15, 17, 18, 23]}
                >
                  {item.contract.address.slice(0, 6) +
                    "..." +
                    item.contract.address.slice(
                      item.contract.address.length - 4,
                      item.contract.address.length
                    )}
                </Container>
              </CardBody>
              <Divider />
              <CardFooter
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyItems={"center"}
              >
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width={"75%"}
                  onClick={() => {
                    setItem(item);
                    setSellModal(true);
                  }}
                >
                  Sell in marketplace
                </Button>
                <br />
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width={"85%"}
                  onClick={() => {
                    window.open(
                      "https://testnets.opensea.io/es/assets/goerli/" +
                        item.contract.address +
                        "/" +
                        item.tokenId
                    );
                  }}
                >
                  View on OpenSea
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTCard;
