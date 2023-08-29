// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {marketPlace} from "../src/MarketPlace.sol";
import {NFT} from "../mock/ERC721.sol";
error NotApprovedForMarketplace();

contract MarketplaceTest is Test {
    using stdStorage for StdStorage;

    marketPlace public MarketPlace;
    NFT public nft;
    bool passed;
    address bob = address(0x01);
    address alice = address(0x02);

    function setUp() public {
        MarketPlace = new marketPlace();
        nft = new NFT();
    }

    function testList() public {
        nft.mint(address(this));
        nft.approve(address(MarketPlace), 1);
        MarketPlace.listNFT(
            address(nft),
            1,
            1 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );
        assertEq(MarketPlace.itemCount(), 1, "expect 1 item listed");
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function testCancel() public {
        nft.mint(address(this));
        nft.approve(address(MarketPlace), 2);
        MarketPlace.listNFT(
            address(nft),
            2,
            1 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );
        MarketPlace.cancelSale(1);
        assertEq(MarketPlace.itemCount(), 1, "expect 1 item listed");
    }

    function testBuyWithNotFunds() public {
        nft.mint(bob);
        nft.approve(address(MarketPlace), 1);

        MarketPlace.listNFT(
            address(nft),
            1,
            1 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );
        vm.startPrank(bob);
        vm.expectRevert();
        MarketPlace.buyNFT{value: 0.4 ether}(1);
        vm.stopPrank();
        assertEq(MarketPlace.itemCount(), 1, "expect 1 item listed");
    }

    function testBuy() public {
        nft.mint(bob);
        vm.startPrank(bob);
        nft.approve(address(MarketPlace), 2);

        MarketPlace.listNFT(
            address(nft),
            2,
            0.5 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );

        vm.stopPrank();
        MarketPlace.buyNFT{value: 1 ether}(1);
        assertEq(MarketPlace.itemCount(), 1, "expect 0 item listed");
        assertEq(
            nft.ownerOf(2),
            address(this),
            "expect bob to be owner of nft"
        );
    }

    function testWithdrawFundsUser() public {
        nft.mint(bob);
        nft.mint(bob);
        vm.startPrank(bob);
        nft.approve(address(MarketPlace), 2);

        MarketPlace.listNFT(
            address(nft),
            2,
            0.5 ether,
            "hola",
            "this nft is for sale",
            "https://ipfs.io/ipfs//QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8"
        );

        vm.stopPrank();
        MarketPlace.buyNFT{value: 1 ether}(1);
        vm.startPrank(bob);
        vm.expectRevert();
        MarketPlace.withdrawFundsUser();
        vm.stopPrank();
    }
}
