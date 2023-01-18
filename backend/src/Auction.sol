// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract AuctionMarket is ReentrancyGuard, Ownable {
    
    constructor() {}

    struct item{
        address nftAddress;
        uint256 nftId;
        uint256 tokenId;
        address seller;
        uint256 price;
        uint256 endTime;
        address highestBidder;
    }

   mapping(uint256 => uint256) _security; // security front running
    mapping(uint256 => item) public items; // item id to item
    //@modifiers

    //@dev security front running modifier
    modifier securityFrontRunning(uint256 _itemId) {
        item storage Item = items[_itemId];
        require(
            _security[_itemId] == 0 || _security[_itemId] > block.number,
            "error security"
        );

        _security[_itemId] = block.number;
        _;
    }





}