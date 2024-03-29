import React, { useEffect, useState } from "react";
import { useIsMounted } from "./../../components/utils/mounted";
import { GetAllItems } from "./../../components/api/ListedTokens";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar/Navbar";
import {
  Container,
  HStack,
  IconButton,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  TagLabel,
  Tag,
  useDisclosure,
  Popover,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import styles from "./id.module.css";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
import { Buy } from "../../components/api/Buy";
import MobileNav from "../../components/mobileNav/MobileNav";

const ItemID = () => {
  const mounted = useIsMounted();
  const { itemsFind } = GetAllItems();
  const router = useRouter();
  const { id } = router.query;
  const itemId = parseInt(id);
  const bool = itemsFind?.some((item) => {
    return item.id === itemId;
  });
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

  return (
    <div>
      <Navbar />
      <MobileNav />

      {bool ? (
        <div className={styles.containerID}>
          {itemsFind
            ?.filter((item) => {
              return item.id === itemId;
            })
            .map((nft) => {
              return (
                <div className={styles.idPage} key={nft.id}>
                  <div className={styles.NFTDiv}>
                    <br />
                    <img
                      className={styles.imgNft}
                      src={nft.tokenURI}
                      alt={nft.desc}
                      style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: "10px",
                      }}
                    />

                    <div className={styles.cardContent}>
                      <Heading
                        size={["sm", "md", "lg", "md"]}
                        fontSize={["sm", "sm", "lg", "2xl"]}
                        textAlign={"center"}
                      >
                        {nft.name}
                      </Heading>
                      <br />
                      <Text py="2" fontSize={["sm", "md", "lg", "xl"]}>
                        {nft.desc}
                      </Text>
                      <br />
                      <HStack className={styles.nftData} spacing={3}>
                        <Tag
                          size={["sm", "md", "lg", "md"]}
                          fontSize={["sm", "sm", "lg", "2xl"]}
                          key={nft.price}
                          padding={"1.5"}
                          variant="solid"
                          colorScheme="blue"
                          className={styles.tag__info}
                        >
                          <FaEthereum />
                          <TagLabel>
                            <b>
                              {ethers.utils
                                .formatEther(nft.price)
                                ?.substring(0, 9)}
                            </b>
                          </TagLabel>
                        </Tag>
                        <Tag
                          size={["sm", "md", "lg", "md"]}
                          fontSize={["sm", "sm", "lg", "2xl"]}
                          key={nft.price}
                          padding={"1.5"}
                          variant="solid"
                          colorScheme="blue"
                          className={styles.tag__info}
                        >
                          <FaDollarSign />
                          <TagLabel>
                            <b>
                              {(
                                ethers.utils.formatEther(nft.price) * ethPrice
                              ).toFixed(5)}
                            </b>
                          </TagLabel>
                        </Tag>
                        <Tag
                          size={["sm", "md", "lg", "md"]}
                          fontSize={["sm", "sm", "lg", "2xl"]}
                          padding={"1.5"}
                          key={nft.id}
                          variant="solid"
                          colorScheme="blue"
                          className={styles.tag__info}
                        >
                          ID: <b>{nft.tokenId}</b>
                        </Tag>
                        <Tag
                          size={["sm", "md", "lg", "md"]}
                          fontSize={["sm", "sm", "lg", "2xl"]}
                          key={nft.nft}
                          variant="solid"
                          colorScheme="blue"
                          padding={"1.5"}
                          cursor="pointer"
                          _hover={{ bg: "blue.900" }}
                          className={styles.tag__info}
                        >
                          <Popover arrowPadding={2}>
                            <PopoverTrigger>
                              <TagLabel size={["sm", "md", "lg", "md"]}>
                                Address
                              </TagLabel>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader color="black">
                                NFT Address: {nft.nft}
                              </PopoverHeader>
                              <PopoverBody color="black">
                                Seller: {nft.seller}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Tag>
                      </HStack>
                    </div>
                    <br />
                    <Buy id={nft.id} token={nft.price} />
                    <br />
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <Alert
          status="error"
          height={"300px"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
        >
          <AlertIcon />
          error 404 item not found
        </Alert>
      )}
    </div>
  );
};

export default ItemID;
