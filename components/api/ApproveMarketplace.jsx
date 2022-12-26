import { erc721ABI, useAccount } from "wagmi";
import { useState } from "react";

const ApproveMarketplace = () => {
  const { account, library } = useAccount();
  const [tokenId, setTokenId] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contract, setContract] = useState("");
  const [isApproved, setIsApproved] = useState(false);
};
