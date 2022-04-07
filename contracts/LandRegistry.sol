// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LandRegistry is ERC721, ERC721Enumerable {
    uint32 constant clearLow = 0xffff0000;
    uint32 constant clearHigh = 0x0000ffff;
    uint32 constant factor = 0x10000;

    constructor() ERC721("Land", "Land") {}

    function encode(int16 x, int16 y) external pure returns (uint32) {
        return _encodeTokenId(x, y);
    }

    function _encodeTokenId(int16 x, int16 y) internal pure returns (uint32) {
        return
            ((uint32(uint16(x)) * factor) & clearLow) |
            (uint32(uint16(y)) & clearHigh);
    }

    function mint(
        address user,
        int16 x,
        int16 y
    ) external {
        _safeMint(user, _encodeTokenId(x, y));
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
