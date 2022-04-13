//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ILockLeash {
    function weightOf(address user) external view returns (uint256);
}

contract LockLeashViewer {
    ILockLeash public immutable lockLeash;

    constructor(ILockLeash _lockLeash) {
        lockLeash = _lockLeash;
    }

    function weightOf(address user) public view returns (uint256) {
        uint256 weight = lockLeash.weightOf(user);
        
        if(weight == 9 ether) {
            return 9 ether + 1;
        }
        return weight;
    }
}
