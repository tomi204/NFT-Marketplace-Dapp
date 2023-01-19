// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract AuctionMarket is ReentrancyGuard, Ownable {
    
    constructor() {}

    uint256 itemCount;
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
    

    //@dev events
    event listed(
        uint256 indexed itemId,
        address indexed nftAddress,
        uint256 indexed nftId,
        address seller,
        uint256 price,
        uint256 endTime
    );

    event bid(
        uint256 indexed itemId,
        address indexed nftAddress,
        uint256 indexed nftId,
        address seller,
        uint256 price,
        uint256 endTime
    );

    function startSell(address _nft, uint256 _tokenId, uint256 _price, uint256 _duration)
        public
        nonReentrant
    {
        require(_price > 0, "price must be greater than 0");
        require(_duration > 0, "duration must be greater than 0");
        IERC721 nft = IERC721(_nft);
        require(
            nft.getApproved(_tokenId) == address(this),
            "contract is not approved to transfer nft"
        ); 
        require(nft.ownerOf(_tokenId) == msg.sender, "not the owner of nft");
        itemCount++;
        items[itemCount] = item({
            nftAddress: _nft,
            nftId: _tokenId,
            tokenId: itemCount,
            seller: msg.sender,
            price: _price,
            endTime: block.timestamp + _duration,
            highestBidder: address(0)
        });
        emit listed(
            itemCount,
            _nft,
            _tokenId,
            msg.sender,
            _price,
            block.timestamp + _duration
        );  
    }
   
   function offering(uint256 _itemId) public  payable securityFrontRunning(_itemId){
    item storage Item = items[_itemId];
    require(Item.endTime > block.timestamp, "auction is over");
    require(msg.value > Item.price, "bid must be greater than current price");
    if (Item.highestBidder != address(0)) {
        payable(Item.highestBidder).transfer(Item.price);
    }
   }




}