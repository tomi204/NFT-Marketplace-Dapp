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
} from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import styles from "./id.module.css";
import { FaDollarSign, FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
import { Buy } from "../../components/api/Buy";

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

  console.log(ethPrice, " ethPrice");

  return (
    <div>
      <Navbar />
      {bool ? (
        <div>
          {itemsFind
            ?.filter((item) => {
              return item.id === itemId;
            })
            .map((nft) => {
              return (
                <div key={nft.id} className={styles.NFTDiv}>
                  <img
                    className={styles.imgNft}
                    src={nft.tokenURI}
                    alt={nft.desc}
                  />

                  <div>
                    <Heading textAlign={"center"} size="md">
                      {nft.name}
                    </Heading>
                    <Text py="2">{nft.desc}</Text>
                    <HStack spacing={3}>
                      <Tag
                        size="lg"
                        key={nft.price}
                        variant="solid"
                        colorScheme="blue"
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
                        size="lg"
                        key={nft.price}
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
                        size="lg"
                        key={nft.id}
                        variant="solid"
                        colorScheme="blue"
                      >
                        Token ID: <b>{nft.tokenId}</b>
                      </Tag>
                      <Tag
                        size="lg"
                        key={nft.nft}
                        variant="solid"
                        colorScheme="blue"
                        cursor="pointer"
                      >
                        <Popover arrowPadding={2}>
                          <PopoverTrigger>
                            <TagLabel>Owner</TagLabel>
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
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <h1>404</h1>
        </div>
      )}
    </div>
  );
};

export default ItemID;
