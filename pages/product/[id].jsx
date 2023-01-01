import React from "react";
import { useIsMounted } from "./../../components/utils/mounted";
import { GetAllItems } from "./../../components/api/ListedTokens";
import { useRouter } from "next/router";

const ItemID = () => {
  const mounted = useIsMounted();
  const { items, itemsFind } = GetAllItems();
  const router = useRouter();
  const { id } = router.query;
  const itemId = parseInt(id);
  const bool = itemsFind?.some((item) => {
    return item.id === itemId;
  });

  return (
    <div>
      {bool ? (
        <div>
          {itemsFind
            ?.filter((item) => {
              return item.id === itemId;
            })
            .map((nft) => {
              return (
                <div key={nft.id}>
                  <h1>{nft.name}</h1>
                  <img src={nft.tokenURI} />
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <h1>404</h1>
        </div>
      )}
    </div>
  );
};

export default ItemID;
