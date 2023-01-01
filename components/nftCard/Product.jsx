import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
            <div key={item.id}>
              <div>{item.name}</div>
              <div>{item.description}</div>
              <div>{item.price}</div>
              <div>{item.image}</div>
              <div>{item.seller}</div>
              <div>{item.sold}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
