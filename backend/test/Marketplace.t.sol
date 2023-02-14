// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {marketPlace} from "../src/MarketPlace.sol";
import {NFT} from "../src/ERC721.sol";

contract MarketplaceTest is Test {
    marketPlace public MarketPlace;
    NFT public nft;

    function setUp() public {
        MarketPlace = new marketPlace();
        nft = new NFT();
    }

    function testSellAndBuy() public {
        nft.approve(address(MarketPlace), 1);
        MarketPlace.listNFT(
            address(nft),
            1,
            1 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );
        MarketPlace.cancelSale(1);
    }

    function testAuction() public {
        nft.approve(address(MarketPlace), 1);
        MarketPlace.listNFT(
            address(nft),
            1,
            1 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );
        MarketPlace.listNFTAuction(
            address(nft),
            1,
            1 ether,
            20,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );
        MarketPlace.cancelAuction(1);
    }

    ////////@dev you need run local blockchain to test this functions

    // function testBuy() public {
    //     nft.approve(address(MarketPlace), 1);
    //     MarketPlace.listNFT(
    //         address(nft),
    //         1,
    //         1 ether,
    //         "hola",
    //         "this nft is for sale",
    //         "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
    //     );
    //     MarketPlace.buyNFT(1);
    // }

    // function testBid() public {
    //     nft.approve(address(MarketPlace), 1);
    //     MarketPlace.listNFTAuction(
    //         address(nft),
    //         1,
    //         1 ether,
    //         20,
    //         "hola",
    //         "this nft is for sale",
    //         "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
    //     );
    //     MarketPlace.bidAuction(1);
    // }
}
