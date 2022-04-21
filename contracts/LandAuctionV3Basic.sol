// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract LandAuctionV3 {

    function getReservePriceShib(int16 x, int16 y) public view returns (uint256) {
        return 0;
    }

    function mintPublicWithShib(int16 x, int16 y) external { }

    function mintPublicWithShibMulti(
        int16[] calldata xs,
        int16[] calldata ys,
        uint256[] calldata prices
    ) external { }
}
