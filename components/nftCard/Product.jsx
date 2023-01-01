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
import React from "react";
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
            <AlertTitle>Connect your wallet</AlertTitle>
            <br />
            <AlertDescription>
              connect your wallet to access this function
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div>
          {itemsFind.map((item) => (
            <Card maxW="sm" key={item.id}>
              <CardBody>
                <img src={item.tokenURI} alt={item.name} borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Living room Sofa</Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque
                    inspired spaces, earthy toned spaces and for people who love
                    a chic design with a sprinkle of vintage design.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    {item.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter></CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
