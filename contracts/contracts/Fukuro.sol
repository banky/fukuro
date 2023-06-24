// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/utils/introspection/IERC165.sol";

import "openzeppelin-contracts/utils/cryptography/ECDSA.sol";
import "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";
import "openzeppelin-contracts/utils/cryptography/SignatureChecker.sol";

import "openzeppelin-contracts/token/ERC721/IERC721.sol";
import "openzeppelin-contracts/token/ERC721/IERC721Receiver.sol";
import "openzeppelin-contracts/token/ERC1155/IERC1155Receiver.sol";
import "openzeppelin-contracts/interfaces/IERC1271.sol";

import "erc6551/interfaces/IERC6551Account.sol";
import "erc6551/lib/ERC6551AccountLib.sol";

contract Fukuro is
    IERC165,
    IERC1271,
    IERC721Receiver,
    IERC1155Receiver,
    IERC6551Account
{
    using ECDSA for bytes32;
    uint256 public nonce;

    bool public isVerified;
    bytes32 public verifiedRoot;

    /* ============== MODIFER ============= */

    receive() external payable {}

    function executeCall(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable returns (bytes memory result) {
        require(msg.sender == owner(), "Not token owner");

        ++nonce;

        emit TransactionExecuted(to, value, data);

        bool isTransfer = _callIsTransfer(msg.sig);
        if (isTransfer) {
            isVerified = false;
        }

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
            interfaceId == type(IERC1155Receiver).interfaceId ||
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

    /**
     * @dev validates merkleProof
     */
    function verifyBundle(bytes32[] calldata merkleProof) public view {
        bool verificationResult = MerkleProof.verify(
            merkleProof,
            verifiedRoot,
            keccak256(abi.encodePacked(msg.sender))
        );
        if (!verificationResult) {
            revert("Verification failed");
        }
    }

    // ============ OVERRIDE RECEIVER FUNCTIONS ============
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external override returns (bytes4) {
        isVerified = false;
        return IERC721Receiver.onERC721Received.selector;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external override returns (bytes4) {
        isVerified = false;
        return IERC1155Receiver.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external override returns (bytes4) {
        isVerified = false;
        return IERC1155Receiver.onERC1155BatchReceived.selector;
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============
    function setVerifiedRoot(bytes32 merkleRoot) external {
        require(owner() == msg.sender, "Not token owner");
        verifiedRoot = merkleRoot;
        isVerified = true;
    }

    // ============ INTERNAL FUNCTIONS ============
    /*
     *  @dev check if the function is a transfer function
     * not 100% coverage but ok for demo purposes
     */
    function _callIsTransfer(
        bytes4 msgSig
    ) internal pure returns (bool isTransferFunction) {
        if (msgSig == 0x42842e0e) {
            // ERC721
            // safeTransferFrom(address,address,uint256)
            return true;
        } else if (msgSig == 0x23b872dd) {
            // ERC721
            // transferFrom(address,address,uint256)
            return true;
        } else if (msgSig == 0xb88d4fde) {
            // ERC721
            // safeTransferFrom(address,address,uint256,bytes)
            return true;
        } else if (msgSig == 0x23b872dd) {
            // ERC20
            // transferFrom(address,address,uint256)
            return true;
        } else if (msgSig == 0xf242432a) {
            // ERC 1155
            // safeTransferFrom(address,address,uint256,uint256,bytes)
            return true;
        } else if (msgSig == 0x2eb2c2d6) {
            // ERC 1155
            // safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)
            return true;
        }
        return false;
    }
}
