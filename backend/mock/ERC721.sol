// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("Bored ape 204", "Bored Ape #204") {
        _mint(msg.sender, 1);
        tokenCounter = 1;
    }

    function mint(address to) public {
        tokenCounter++;
        _mint(to, tokenCounter);
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/QmdRpbUC8TjJ1b9tZWPRxBvbCsgJisWEuN4dcXFW4Mvrh8";
    }
}
