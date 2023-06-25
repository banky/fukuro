import { ethers } from "ethers";

export const FUKURO_ADDRESS = "0xDA6c577241cB047628a370802D0CD20319F307B7";
export const FUKUFUKU_ADDRESS = "0xA6d32Be299C481c7C689b6f7238A1cE1b5A3213d";
export const AFROPOLITAN_ADDRESS = "0x8E16e15381729fFEeDC4755f2Dcf6F5461f7F389";
export const ERC6551_REGISTRY_ADDRESS =
  "0x02101dfB77FDE026414827Fdc604ddAF224F0921";
export const AUCTION_FACTORY = "0xb16916Fc4c5bCb989b9e2c1e73Ed56b74003dbE2";

export const OPENSEA_URL = "https://testnets.opensea.io/assets/goerli";
export const BLOCK_EXPLORER_URL = "https://goerli.etherscan.io/";


export const AUCTIONS = [
  {
    tokenId: 26,
    auctionAddress: AFROPOLITAN_ADDRESS,
    imageUrl: "https://ipfs.io/ipfs/bafybeifcetut4fgnlmquws3c2jddt5i72vlculluw3tdyls7qiv2ixquum",
    title: "Auction",
    startBlock: 9000000,
    endBlock: 9500000,
    highestBid: ethers.utils.parseUnits("0.1", "ether").toString(),
    bidIncrement: ethers.utils.parseUnits("0.11", "ether").toString(),
  },
  {
    tokenId: 26,
    auctionAddress: AFROPOLITAN_ADDRESS,
    imageUrl: "https://ipfs.io/ipfs/bafybeid4blrpjudmqu7eborxklbnonoopqmm7opymlpfrgubw5ctt7m2c4",
    title: "Auction",
    startBlock: 9000000,
    endBlock: 9500000,
    highestBid: ethers.utils.parseUnits("0.2", "ether").toString(),
    bidIncrement: ethers.utils.parseUnits("0.12", "ether").toString(),
  },
  {
    tokenId: 26,
    auctionAddress: AFROPOLITAN_ADDRESS,
    imageUrl: "https://ipfs.io/ipfs/bafybeido3vjv6t2p7ijpdsa3qlpsejksv6js225g7bjt7zv67hfovjgqcq",
    title: "Auction",
    startBlock: 9000000,
    endBlock: 9500000,
    highestBid: ethers.utils.parseUnits("0.15", "ether").toString(),
    bidIncrement: ethers.utils.parseUnits("0.15", "ether").toString(),
  }
]