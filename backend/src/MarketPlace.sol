// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/////@dev errors
error NotApprovedForMarketplace();
error NotApprovedForAuction();
error AuctionNotEnded();

contract marketPlace is ReentrancyGuard {
    //@dev state variables
    address payable public immutable owner; //owner of the contract
    uint256 public itemCount; // item count


    ////////@dev constructor
    constructor() {
        owner = payable(msg.sender);
    }

    ////@dev struct of items

    struct item {
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

    //@dev mappings
    mapping(uint256 => item) public items; // item id to item
    mapping(uint256 => uint256) _security; // security front running

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

    //@dev onlyOwner modifier
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    ///////@dev events
    event listed(
        uint256 id,
        address nft,
        uint256 tokenId,
        uint256 price,
        address seller
    );

    event sold(
        uint256 id,
        address nft,
        uint256 tokenId,
        uint256 price,
        address seller,
        address buyer
    );

    //@dev functions

    function listNFT(
        address _nft,
        uint256 _tokenId,
        uint256 _price,
        string memory _name,
        string memory _description,
        string memory _image
    ) public nonReentrant {
        require(_price > 0, "price must be greater than 0");
        IERC721 nft = IERC721(_nft); // cast address to IERC721
        if (nft.ownerOf(_tokenId) == msg.sender) {
            // check if the msg.sender is the owner of the NFT

            if (nft.getApproved(_tokenId) != address(this)) {
                revert NotApprovedForMarketplace();
            }
            itemCount++; // increment the item count
            items[itemCount] = item( // add the item to the items mapping
                itemCount,
                _nft,
                _tokenId,
                payable(msg.sender),
                false,
                _price,
                _name,
                _description,
                _image
            );
            emit listed(itemCount, address(_nft), _tokenId, _price, msg.sender); // emit the listed event
        } else {
            revert("you are not the owner of this NFT");
        }
    }

    ///@dev buy function

    function buyNFT(uint256 _itemId)
        public
        payable
        nonReentrant
        securityFrontRunning(_itemId)
    {
        item storage Item = items[_itemId]; // get the item from the items mapping
        require(Item.sold == false, "item already sold"); // check if the item is already sold
        require(msg.value == Item.price, "insufficient funds"); // check if the msg.value is greater than or equal to the item price
        IERC721(Item.nft).safeTransferFrom(
            Item.seller,
            msg.sender,
            Item.tokenId
        ); // trasnfer the nft to the buyer        Item.sold = true; // set the item sold state to true
        uint256 sellerAmount = Item.price; // calculate the seller amount
        payable(Item.seller).transfer(sellerAmount); // transfer the seller amount to the seller
        emit sold(
            Item.id,
            Item.nft,
            Item.tokenId,
            Item.price,
            Item.seller,
            msg.sender
        ); // emit the sold event
        delete items[_itemId]; // delete the item from the items mapping
    }

    ///@dev cancel function

    function cancelSale(uint256 _itemId)
        public
        nonReentrant
        securityFrontRunning(_itemId)
    {
        item storage Item = items[_itemId]; // get the item from the items mapping
        require(Item.sold == false, "item already sold"); // check if the item is already sold
        require(Item.seller == msg.sender, "you are not the seller"); // check if the msg.sender is the seller
        delete items[_itemId]; // delete the item from the items mapping
    }

    ///@dev withdraw founds function

    function withdrawFunds() public nonReentrant onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    ///@dev get items for front end function

    function getItems(uint256 _itemId) public view returns (item memory) {
        item storage itemsList = items[_itemId]; // get specific item from the items mapping
        return itemsList; // return the item
    }

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////@dev AUCTION CODE
    ////////////////////////////////////////////////////////////////////////////////////

    uint256 public auctionCount; // auction count

    ///@dev struct of auctions

    struct auction {
        uint256 id;
        address nft;
        uint256 tokenId;
        address payable seller;
        bool sold;
        uint256 startPrice;
        uint256 price;
        uint256 endTime;
        address payable highestBidder;
        string name;
        string description;
        string image;
    }

    /////////////////@dev mappings
    mapping(uint256 => auction) public auctions; // auction id to auction
    mapping(uint256 => uint256) _securityAuction; // security front running

    ////@dev modifiers

    modifier securityFrontRunningAuction(uint256 _itemId) {
        auction storage Item = auctions[_itemId];
        require(
            _security[_itemId] == 0 || _security[_itemId] > block.number,
            "error security"
        );
        _security[_itemId] = block.number;
        _;
    }
    /////////////////////////////////@dev events
    event listedAuction(
        uint256 id,
        address nft,
        uint256 tokenId,
        uint256 price,
        address seller
    );
    event bid(
        uint256 id,
        address nft,
        uint256 tokenId,
        uint256 price,
        address seller
    );
    event soldAuction(
        uint256 id,
        address nft,
        uint256 tokenId,
        uint256 price,
        address seller,
        address buyer
    );

    //////////////////////@dev functions auction
    ///@dev function to create auction

    function listNFTAuction(
        address _nft,
        uint256 _tokenId,
        uint256 _price,
        uint256 _endTime,
        string memory _name,
        string memory _description,
        string memory _image
    ) public nonReentrant {
        require(_price > 0, "price must be greater than 0");
        IERC721 nft = IERC721(_nft); // cast address to IERC721
        if (nft.ownerOf(_tokenId) == msg.sender) {
            // check if the msg.sender is the owner of the NFT

            if (nft.getApproved(_tokenId) != address(this)) {
                revert NotApprovedForMarketplace();
            }
            auctionCount++; // increment the auction count
            auctions[auctionCount] = auction( // add the auction to the auctions mapping
                auctionCount,
                _nft,
                _tokenId,
                payable(msg.sender),
                false,
                _price,
                _price,
                _endTime,
                payable(address(0)),
                _name,
                _description,
                _image
            );
            emit listedAuction(
                auctionCount,
                address(_nft),
                _tokenId,
                _price,
                msg.sender
            ); // emit the listed event
        } else {
            revert("you are not the owner of this NFT");
        }
    }

    ///@dev bid function

    function bidAuction(uint256 _auctionId)
        public
        payable
        nonReentrant
        securityFrontRunningAuction(_auctionId)
    {
        auction storage Auction = auctions[_auctionId]; // get the auction from the auctions mapping
        require(Auction.sold == false, "auction already sold"); // check if the auction is already sold
        require(msg.value > Auction.price, "insufficient funds"); // check if the msg.value is greater than or equal to the auction price
        require(block.timestamp < Auction.endTime, "auction has ended"); // check if the auction has ended

        if (Auction.highestBidder != msg.sender) {
            payable(Auction.highestBidder).transfer(Auction.price); // transfer the seller amount to the seller
        }
        Auction.highestBidder = payable(msg.sender); // new best bidder
        Auction.price = msg.value; // new auction price
        emit bid(
            Auction.id,
            Auction.nft,
            Auction.tokenId,
            Auction.price,
            Auction.seller
        ); // emit the bid event
    }

    function closeOffering(uint256 _itemId)
        external
        securityFrontRunningAuction(_itemId)
    {
        auction storage ItemAuction = auctions[_itemId];
        require(
            msg.sender == ItemAuction.seller,
            "you dont are the owner of the nft"
        );
        require(
            ItemAuction.endTime < block.timestamp,
            "error time is not over"
        );
        require(ItemAuction.sold == false, "error nft sold");
        IERC721 nft = IERC721(ItemAuction.nft);
        if (nft.getApproved(ItemAuction.tokenId) != address(this)) {
            // if the nft is not approved for the marketplace
            if (ItemAuction.highestBidder != address(0)) {
                // if there is a highest bidder
               payable(ItemAuction.highestBidder).transfer(ItemAuction.price); // transfer the seller amount to the seller
            }

            delete (auctions[_itemId]);
            revert NotApprovedForMarketplace();
        }
        ItemAuction.sold = true;

        payable(ItemAuction.seller).transfer(ItemAuction.price); // transfer the seller amount to the seller
        IERC721(ItemAuction.nft).transferFrom(
            ItemAuction.seller,
            ItemAuction.highestBidder,
            ItemAuction.tokenId
        );
        emit soldAuction(
            ItemAuction.id,
            ItemAuction.nft,
            ItemAuction.tokenId,
            ItemAuction.price,
            ItemAuction.seller,
            ItemAuction.highestBidder
        );
        delete (auctions[_itemId]);
    }

    ///@dev cancel function

    function cancelAuction(uint256 _itemId)
        public
        nonReentrant
        securityFrontRunningAuction(_itemId)
    {
        auction storage Item = auctions[_itemId]; // get the auction from the auctions mapping
        require(Item.sold == false, "auction already sold"); // check if the auction is already sold
        require(Item.seller == msg.sender, "you are not the seller"); // check if the msg.sender is the seller
        if (Item.startPrice != Item.price) {
            payable(Item.highestBidder).transfer(Item.price); // transfer the seller amount to the seller
        }
        delete auctions[_itemId]; // delete the auction from the auctions mapping
    }
}
