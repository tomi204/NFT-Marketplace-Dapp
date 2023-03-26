import { Button } from "@chakra-ui/react";
import { erc721ABI, useAccount } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";

const ApproveMarketplace = (NFT, tokenID) => {
  const { address, isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: NFT.NFT,
    abi: erc721ABI,
    overrides: {
      from: address,
      gasLimit: 10000,
    },
    functionName: "approve",
    args: ["0x88Ab79411cDc6A17cA1D8233A505FC4d41BC7f80", NFT.tokenID],
    enabled: [NFT],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <Button
        size={"md"}
        width={"100%"}
        isLoading={isLoading}
        height={"30px"}
        fontSize={"medium"}
        colorScheme={"blue"}
        onClick={() => write?.()}
      >
        Approve Marketplace
      </Button>
    </div>
  );
};
export default ApproveMarketplace;
