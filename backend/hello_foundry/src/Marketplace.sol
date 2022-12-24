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

    //@dev constructor
    constructor(uint64 _fee) {
        owner = payable(msg.sender);
        fee = _fee;
    }

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
     
     //@dev mappings
    mapping(uint256 => item) public items;// item id to item
    mapping(uint256 => uint256) _security; // security front running
    

    //@modifiers

    modifier securityFrontRunning(uint256 _itemId){
     item storage Item = items[_itemId];
        require(
            _security[_itemId] == 0 || _security[_itemId] > block.number,
            "error security"
        );

        _security[_itemId] = block.number;
        _;
    }

    //@dev events
    event listed(uint256 id, address nft, uint256 tokenId, uint256 price, address seller);


    //@dev functions

    function listNFT(address _nft, 
    uint256 _tokenId,
    uint256 _price,
    string memory _name,
    string memory _description,
    string memory _image) public {
        require(_price > 0, "price must be greater than 0");

        IERC721 nft = IERC721(_nft);
        if (nft.ownerOf(_tokenId) == msg.sender) {
            nft.safeTransferFrom(msg.sender, address(this), _tokenId);
            itemCount++;
            items[itemCount] = item(
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
        emit listed(itemCount, address(_nft), _tokenId, _price, msg.sender);
        itemCount++;
        }else {
            revert("you are not the owner of this NFT");
        }
            
        }

    
    }
        
    

