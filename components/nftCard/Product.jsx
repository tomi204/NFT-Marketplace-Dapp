import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { GetAllItems } from "./../api/ListedTokens";
import styles from "./product.module.css";
const Product = () => {
  const { items, itemsFind, isLoading } = GetAllItems();
  return (
    <div>
      {isLoading ? (
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
            <AlertTitle>Error</AlertTitle>
            <br />
            <AlertDescription>reload website</AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className={styles.mainCard}>
          {itemsFind.map((item) => (
            <Card maxW="sm" key={item.id} justifyContent={"center"}>
              <CardBody>
                <img
                  src={item.tokenURI}
                  alt={item.name}
                  borderRadius="lg"
                  className={styles.imgCard}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{item.name}</Heading>
                </Stack>
                <Text color="blue.600" fontSize="2xl" justifyContent={"center"}>
                  <FaEthereum /> {ethers.utils.formatEther(item.price)}
                </Text>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
