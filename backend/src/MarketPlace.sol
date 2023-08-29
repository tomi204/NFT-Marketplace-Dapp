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
    mapping(address => uint256) public balances; // balances of the users

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

    function buyNFT(
        uint256 _itemId
    ) public payable nonReentrant securityFrontRunning(_itemId) {
        item storage Item = items[_itemId]; // get the item from the items mapping
        require(Item.sold == false, "item already sold"); // check if the item is already sold
        require(msg.value >= Item.price, "insufficient funds"); // check if the msg.value is greater than or equal to the item price
        IERC721(Item.nft).safeTransferFrom(
            Item.seller,
            msg.sender,
            Item.tokenId
        ); // trasnfer the nft to the buyer
        Item.sold = true; // set the item sold state to true
        balances[Item.seller] += Item.price; // add the item price to the seller balance
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

    function cancelSale(
        uint256 _itemId
    ) public nonReentrant securityFrontRunning(_itemId) {
        item storage Item = items[_itemId]; // get the item from the items mapping
        require(Item.sold == false, "item already sold"); // check if the item is already sold
        require(Item.seller == msg.sender, "you are not the seller"); // check if the msg.sender is the seller
        delete items[_itemId]; // delete the item from the items mapping
    }

    ///@dev withdraw founds function

    function withdrawFunds() public nonReentrant onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function withdrawFundsUser() public {
        require(balances[msg.sender] > 0, "you have no funds");
        require(address(this).balance > 0, "contract has no funds");
        uint256 amount = balances[msg.sender];
        payable(msg.sender).transfer(amount);
        balances[msg.sender] = 0;
    }

    ///@dev get items for front end function

    function getItems(uint256 _itemId) public view returns (item memory) {
        item storage itemsList = items[_itemId]; // get specific item from the items mapping
        return itemsList; // return the item
    }
}
