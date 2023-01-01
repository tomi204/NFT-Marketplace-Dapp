import { Button } from "@chakra-ui/react";
import { erc721ABI, useAccount } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

const ApproveMarketplace = (NFT, tokenID) => {
  const { address, isConnected } = useAccount();
  const { config } = usePrepareContractWrite({
    address: NFT,
    abi: erc721ABI,
    overrides: {
      from: address,
    },
    functionName: "approve",
    args: [NFT, tokenID],
    enabled: [NFT, tokenID],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <Button disabled={!NFT} colorScheme={"blue"} onClick={() => write?.()}>
        Approve
      </Button>
      {isLoading && (
        <Button loadingText="Loading" colorScheme="teal" variant="outline" />
      )}
      {isSuccess && (
        <Button colorScheme="teal" variant="outline">
          Success
        </Button>
      )}
    </div>
  );
};
export default ApproveMarketplace;
