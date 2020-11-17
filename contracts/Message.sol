// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

contract Message {
    string message;

    function set(string memory _message) public {
        message = _message;
    }

    function get() public view returns (string memory) {
        return message;
    }
}
