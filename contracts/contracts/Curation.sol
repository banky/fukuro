// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "openzeppelin-contracts/utils/introspection/IERC165.sol";
import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/interfaces/IERC1271.sol";
import "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";
import "sstore2/utils/Bytecode.sol";
import "erc6551/interfaces/IERC6551Account.sol";
import "erc6551/lib/ERC6551AccountLib.sol";

contract Curation is IERC165, IERC1271, IERC6551Account {
    uint256 public nonce;
    bytes public verifyHash;

    bool public isOriginal;
    bool public enforceVerified;

    receive() external payable {}

    function executeCall(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable returns (bytes memory result) {
        require(msg.sender == owner(), "Not token owner");

        ++nonce;

        // TODO: first 32 bytes used for verification Hash?
        // TODO: hardcode the function calldata header, to identify transfer
        // when its a transfer then you flip the bit

        // msg sig

        // transfer, safeTranfer, safeTransferFrom, etc a bunch of them
        emit TransactionExecuted(to, value, data);

        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function token() external view returns (uint256, address, uint256) {
        return ERC6551AccountLib.token();
    }

    function owner() public view returns (address) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = this
            .token();
        if (chainId != block.chainid) return address(0);

        return IERC721(tokenContract).ownerOf(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return (interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC6551Account).interfaceId);
    }

    function isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) external view returns (bytes4 magicValue) {
        bool isValid = SignatureChecker.isValidSignatureNow(
            owner(),
            hash,
            signature
        );

        if (isValid) {
            return IERC1271.isValidSignature.selector;
        }

        return "";
    }

    /*
     * @dev Set the hash that must be signed by the token owner to verify the
     * transaction.
     */
    // TODO: is this even useful? you can verify offchain, but can't add it as a modifier to anything
    function setVerifier(string memory _verifyHash) external {
        require(msg.sender == owner(), "Not token owner");
        verifyHash = abi.encodePacked(_verifyHash); // TODO: overflow issues?
    }
}
