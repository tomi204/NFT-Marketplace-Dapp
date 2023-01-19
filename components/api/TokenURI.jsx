import { useContractRead, useContractReads } from "wagmi";
import React from "react";
import { erc721ABI } from "wagmi";
export default function TokenURI(tokenId, contractAddress) {
       const contractConfig ={
        address: contractAddress,
        chainId: 5,
        abi: erc721ABI, 
        
      };
      const contractConfig2 ={
        address: contractAddress,
        chainId: 5,
        abi: erc721ABI,
      };
 
      const { data } = useContractReads({
        cacheKey: "tokenURI",
        contracts: [
          {
            ...contractConfig,
          functionName: "_baseURI", args: [tokenId], abi: erc721ABI
        }, 
          {
          ...contractConfig2, functionName: "tokenURI", args: [tokenId]
        }
      ],
      
      });
      console.log(data[1], "datatatata");
      return data[1];
    }
      
    
