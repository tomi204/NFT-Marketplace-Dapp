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
  Container,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { GetAllItems } from "./../api/ListedTokens";
import styles from "./product.module.css";
import { Spinner } from "@chakra-ui/react";
const Product = (data) => {
  const { isLoading } = GetAllItems();
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
          {data?.data?.map((item) => (
            <Card
              maxW="sm"
              key={item.id}
              justifyContent={"center"}
              margin={"10%"}
              borderRadius={"lg"}
              boxShadow={"dark-lg"}
            >
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
                <br />

                <Container
                  color="blue.600"
                  className={styles.precio}
                  width={"100%"}
                  fontSize={[15, 17, 18, 23]}
                >
                  <FaEthereum className={styles.eth} />
                  {ethers.utils.formatEther(item.price)?.substring(0, 9)}
                </Container>
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
