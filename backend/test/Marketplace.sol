// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/MarketPlace.sol";
import "../src/MarketPlace.sol";
contract MarketplaceTest is Test{
    marketPlace MarketPlace;
    
    function test() public {
        MarketPlace  = new marketPlace(0);
        MarketPlace.listItem(
            address(this),
            1,
            100,
            "test",
            "test",
            "test"
        );
        marketPlace.buyItem(1);
    }
}
