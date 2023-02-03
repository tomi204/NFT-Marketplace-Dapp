// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {marketPlace} from "../src/MarketPlace.sol";

contract MarketplaceTest is Test{
    marketPlace MarketPlace;
    
    function test() public {
        MarketPlace  = new marketPlace();
        MarketPlace.listNFT(address(0), 0, 50, "name", "description", "image");
    }
}
