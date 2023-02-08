// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {marketPlace} from "../src/MarketPlace.sol";
import {NFT} from "../src/ERC721.sol";
contract MarketplaceTest is Test{
    marketPlace public MarketPlace;
    NFT public nft;

    function setUp() public {
        MarketPlace  = new marketPlace();
        nft = new NFT();
    }

    function test() public {
        nft.approve(address(MarketPlace), 1);
        MarketPlace.listNFT(address(nft), 1, 200, "hola", "this nft is for sale", "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8");
    }
}
