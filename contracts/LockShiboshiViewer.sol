//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ILockShiboshi {
    function weightOf(address user) external view returns (uint256);
}

contract LockShiboshiViewer {
    ILockShiboshi public immutable lockShiboshi;

    constructor(ILockShiboshi _lockShiboshi) {
        lockShiboshi = _lockShiboshi;
    }

    function weightOf(address user) public view returns (uint256) {
        uint256 weight = lockShiboshi.weightOf(user);

        if (weight == 45) {
            return 46;
        }
        return weight;
    }
}
