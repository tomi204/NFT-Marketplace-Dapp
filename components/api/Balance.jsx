import { FaEthereum } from "react-icons/fa";
import { useBalance } from "wagmi";
import { Button } from "@chakra-ui/react";

function Balance(NFT) {
  const { data, isError, isLoading } = useBalance({
    address: NFT.NFT,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <Button rightIcon={<FaEthereum />} colorScheme="blue" variant="outline">
      {data?.formatted}
    </Button>
  );
}
export default Balance;
