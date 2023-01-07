import React from "react";
import { useRouter } from "next/router";
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
  CardFooter,
  Divider,
  Stack,
  CardBody,
  Card,
  Button,
} from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import styles from "../styles/wallet.module.css";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
import { useIsMounted } from "./../components/utils/mounted";
import { GetAllItems } from "./../components/api/ListedTokens";
import { useAccount } from "wagmi";
import Navbar from "./../components/navbar/Navbar";
import Balance from "./../components/api/Balance";
import Footer from "./../components/footer/Footer";
import MobileNav from "./../components/mobileNav/MobileNav";

const Wallet = () => {
  const mounted = useIsMounted();
  const { itemsFind } = GetAllItems();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { id } = router.query;
  const itemId = parseInt(id);
  const bool = itemsFind?.some((item) => {
    return item.seller === address;
  });
  if (mounted)
    return (
      <div className={styles.walletPage}>
        <Navbar />
        <MobileNav />
        {isConnected ? (
          <div className={styles.container}>
            <Button colorScheme="blue" variant="outline">
              {address}
            </Button>
            <br />
            {mounted ? <Balance NFT={address} /> : null}
          </div>
        ) : (
          <div>
            <Heading textAlign={"center"} size="md">
              Connect your wallet
            </Heading>
          </div>
        )}

        {bool ? (
          <div className={styles.cardDiv}>
            {itemsFind
              ?.filter((item) => {
                return item.seller === address;
              })
              .map((item) => {
                return (
                  <Card
                    maxW="sm"
                    key={item.id}
                    className={styles.cards}
                    justifyContent={"center"}
                  >
                    <CardBody>
                      <img
                        src={item.tokenURI}
                        alt={item.name}
                        className={styles.imgCard}
                      />
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{item.name}</Heading>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <a href={`/product/${item.id}`}>
                        <Button variant="ghost" colorScheme="blue">
                          View More
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        ) : (
          <div>
            <h1>You dont have NFTs listed</h1>
          </div>
        )}
      </div>
    );
};

export default Wallet;
