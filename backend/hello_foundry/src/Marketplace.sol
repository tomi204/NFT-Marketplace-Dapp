// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract marketPlace is ReentrancyGuard {
    //@dev state variables
    address payable public immutable owner; //owner of the contract
    uint64 public immutable fee; //marketplace fee
    uint256 public itemCount; // item count

    //@dev constructor
    constructor(uint64 _fee) {
        owner = payable(msg.sender);
        fee = _fee;
    }

    //@dev struct of items

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

    //@dev events
    event listed(
        uint256 id,
        address nft,
        uint256 tokenId,
        uint256 price,
        address seller
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
            nft.safeTransferFrom(msg.sender, address(this), _tokenId); // transfer the NFT to the contract
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

    //dev buy function
    function buyNFT(uint256 _itemId)
        public
        payable
        nonReentrant
        securityFrontRunning(_itemId)
    {
        item storage Item = items[_itemId]; // get the item from the items mapping
        require(Item.sold == false, "item already sold"); // check if the item is already sold
        require(msg.value == (Item.price * fee) / 100, "insufficient funds"); // check if the msg.value is greater than or equal to the item price
        IERC721 nft = IERC721(Item.nft); // cast the item nft address to IERC721
        nft.safeTransferFrom(address(this), msg.sender, Item.tokenId); // transfer the NFT to the buyer
        Item.sold = true; // set the item sold state to true
        uint256 feeAmount = (Item.price * fee) / 100; // calculate the fee amount
        uint256 sellerAmount = Item.price - feeAmount; // calculate the seller amount
        payable(owner).transfer(feeAmount); // transfer the fee amount to the owner
        payable(Item.seller).transfer(sellerAmount); // transfer the seller amount to the seller
        delete _security[_itemId]; // delete the security front running
        delete items[_itemId]; // delete the item from the items mapping
    }
}
