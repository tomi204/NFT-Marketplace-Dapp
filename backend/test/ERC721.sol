// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {NFT} from "../src/ERC721.sol";

contract NFTTest is Test{
    NFT nft;
    
    function test() public {
        nft  = new NFT();
        nft.mint();
    }
}