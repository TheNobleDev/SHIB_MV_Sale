// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Shib is ERC20, Ownable {
    constructor() ERC20("SHIB_MOCK", "SHIB_MOCK") {}

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
