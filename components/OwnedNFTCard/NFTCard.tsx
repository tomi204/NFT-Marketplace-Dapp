import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Container,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { GetAllItems } from "./../api/ListedTokens";
import styles from "./NFTCard.module.css";
import { Spinner } from "@chakra-ui/react";
const NFTCard = (data: any) => {
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
  console.log(nfts, "nfts user lol");

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
          {nfts?.map((item) => (
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
              <CardFooter>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  width={"100%"}
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
