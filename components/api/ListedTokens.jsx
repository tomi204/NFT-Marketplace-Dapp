import React from "react";
import { paginatedIndexesConfig, useContractInfiniteReads } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
import TokenURI from "./TokenURI.jsx";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import contractAdress from "./ContractAdress";
import { Network, Alchemy } from "alchemy-sdk";
const itemData = {};
const mlootContractConfig = {
  address: "0x88Ab79411cDc6A17cA1D8233A505FC4d41BC7f80",
  chainId: 5,
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_itemId",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      name: "getItems",
      outputs: [
        {
          internalType: "struct marketPlace.item",
          name: "",
          type: "tuple",
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "nft",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "seller",
              type: "address",
            },
            {
              internalType: "bool",
              name: "sold",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "image",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};

export function GetAllItems() {
  const { address } = useAccount();
  const { data, fetchNextPage, isLoading } = useContractInfiniteReads({
    cacheKey: "mlootAttributes",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            ...mlootContractConfig,
            functionName: "getItems",
            args: [BigNumber.from(index)],
          },
        ];
      },
      { start: 1, perPage: 100, direction: "increment" }
    ),
  });

  const [nfts, setNfts] = useState([]); // state for nfts

  const settings = {
    apiKey: "EypKcb615zspS9zr3YpMF1zNodFvArmW",
    network: Network.ETH_GOERLI,
  }; // Alchemy settings
  const [loadingOwner, setLoadingOwner] = useState(true); // loading state for owner
  const alchemy = new Alchemy(settings); // alchemy object
  async function getNftsForUser() {
    /// Get NFTs for user
    const nftsResponse = await alchemy.nft
      .getNftsForOwner(address)
      .then((nfts) => {
        setLoadingOwner(false);
        setNfts(nfts);
      });
  }
  useEffect(() => {
    getNftsForUser();
  }, []);
  console.log(nfts, "nfts loloolol");

  //get items from data and return in a new array
  const result = data?.pages?.map((page) => {
    return page?.map((item) => {
      console.log(item, "itemsx");
      if (!isLoading || item?.id != 0 || item?.id != null) {
        itemData = {
          id: item[0]?.toNumber(),
          nft: item[1],
          tokenId: item[2]?.toString(),
          seller: item[3],
          sold: item[4],
          price: item[5],
          name: item[6],
          desc: item[7],
          tokenURI: item[8],
          //  tokenURI: TokenURI(item[2]?.toNumber(), item[1]),
        };
      }
      return itemData;
    });
  });
  const items = result?.map((item) => {
    return item?.filter((item) => item.id !== 0);
  });

  const itemsFind = items?.find((item) => item);

  return {
    items,
    data,
    fetchNextPage,
    isLoading,
    itemsFind,
    nfts,
    loadingOwner,
  };
}
