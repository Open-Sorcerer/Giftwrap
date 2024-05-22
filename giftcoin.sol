// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Giftcoin is
    ERC721,
    ERC721Pausable,
    Ownable,
    ERC721Burnable,
    ERC721URIStorage
{
    uint256 private _nextTokenId;
    mapping(uint256 => uint256) private _giftCardAmounts;
    mapping(address => uint256[]) private _userGiftCards;
    IERC20 private _usdcToken;

    event GiftCardCreated(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed recipient,
        uint256 amount,
        bool isETH
    );
    event GiftCardRedeemed(uint256 indexed tokenId, address indexed redeemer);

    constructor(
        address initialOwner,
        address usdcTokenAddress
    ) ERC721("Giftcoin", "GC") Ownable(initialOwner) {
        _usdcToken = IERC20(usdcTokenAddress);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function createGiftCard(
        address recipient,
        uint256 amount,
        bool useETH
    ) external payable {
        require(amount > 0, "Gift card amount must be greater than zero");

        if (useETH) {
            require(
                msg.value == amount,
                "ETH amount must match the gift card amount"
            );
        } else {
            _usdcToken.transferFrom(msg.sender, address(this), amount);
        }

        uint256 tokenId = _nextTokenId++;
        _safeMint(recipient, tokenId);
        _giftCardAmounts[tokenId] = amount;
        _userGiftCards[recipient].push(tokenId);

        string memory tokenUri = generateTokenURI(tokenId, amount);
        _setTokenURI(tokenId, tokenUri);

        emit GiftCardCreated(tokenId, msg.sender, recipient, amount, useETH);
    }

    function getUserGiftCards(
        address user
    ) external view returns (uint256[] memory) {
        return _userGiftCards[user];
    }

    function redeemGiftCard(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender);
        uint256 amount = _giftCardAmounts[tokenId];
        _burn(tokenId);
        payable(msg.sender).transfer(amount);

        emit GiftCardRedeemed(tokenId, msg.sender);
    }

    function bridgeToFilecoin(uint256 amount, bool useETH) external payable {
        require(amount > 0, "Bridge amount must be greater than zero");

        if (useETH) {
            require(
                msg.value == amount,
                "ETH amount must match the bridge amount"
            );
            // Implement the bridging logic for ETH to Filecoin blockchain
        } else {
            _usdcToken.transferFrom(msg.sender, address(this), amount);
            // Implement the bridging logic for USDC to Filecoin blockchain
        }
    }

    function generateTokenURI(
        uint256 tokenId,
        uint256 amount
    ) internal pure returns (string memory) {
        string memory svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
                "<style>.base { fill: white; font-family: serif; font-size: 24px; }</style>",
                '<rect width="100%" height="100%" fill="black" />',
                '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">Giftcoin Card</text>',
                '<text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle">Amount: ',
                Strings.toString(amount),
                " ETH/USDC</text>",
                "</svg>"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Giftcoin Card #',
                        Strings.toString(tokenId),
                        '", "description": "A gift card for Giftcoin", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '"}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
