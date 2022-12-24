// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "";
contract marketPlace is Ownable, IERC721 {

    //@dev state variables
    address payable public immutable owner; //owner of the contract
    uint64 public immutable fee; //marketplace fee
    uint256 public itemCount; // item count

    //@dev struct of items

    struct item{
        uint256 id;
        address nft;
        uint256 tokenId;
        address payable seller;
        bool sold;
        uint256 price;
        string name;
        string description;
        string image;
    }

    constructor(uint64 _fee) {
        owner = payable(msg.sender);
        fee = _fee;
    }
        
    }

