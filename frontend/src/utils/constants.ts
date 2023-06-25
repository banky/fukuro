import { ethers } from "ethers";

// export const FUKURO_ADDRESS = "0xDA6c577241cB047628a370802D0CD20319F307B7";
export const FUKURO_ADDRESS = "0xaA8F8b072a1A5cA50b6fEeFeb841AC644a2C6865";
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
    imageUrl:
      "https://ipfs.io/ipfs/bafybeifcetut4fgnlmquws3c2jddt5i72vlculluw3tdyls7qiv2ixquum",
    title: "Auction",
    startBlock: 9000000,
    endBlock: 9500000,
    highestBid: ethers.utils.parseUnits("0.1", "ether").toString(),
    bidIncrement: ethers.utils.parseUnits("0.11", "ether").toString(),
  },
  {
    tokenId: 26,
    auctionAddress: AFROPOLITAN_ADDRESS,
    imageUrl:
      "https://ipfs.io/ipfs/bafybeid4blrpjudmqu7eborxklbnonoopqmm7opymlpfrgubw5ctt7m2c4",
    title: "Auction",
    startBlock: 9000000,
    endBlock: 9500000,
    highestBid: ethers.utils.parseUnits("0.2", "ether").toString(),
    bidIncrement: ethers.utils.parseUnits("0.12", "ether").toString(),
  },
  {
    tokenId: 26,
    auctionAddress: AFROPOLITAN_ADDRESS,
    imageUrl:
      "https://ipfs.io/ipfs/bafybeido3vjv6t2p7ijpdsa3qlpsejksv6js225g7bjt7zv67hfovjgqcq",
    title: "Auction",
    startBlock: 9000000,
    endBlock: 9500000,
    highestBid: ethers.utils.parseUnits("0.15", "ether").toString(),
    bidIncrement: ethers.utils.parseUnits("0.15", "ether").toString(),
  },
];

// Linea
export const LINEA_Fukuro = "0xd77A3312A0aE3c18b68B2426AF5A2b916Bbab4Ac";
export const LINEA_FukuFuku = "0xc90995B5897B2BA7ee2580FA6d978f3E5394cCe0";
export const LINEA_AfropolitanNFT =
  "0xA6dBfAeD336F3586D5dc336f6E902803Ea0a9994";
export const LINEA_Registry = "0x45E67155e2F6e8107Cd17905B1A9c3510cE3aCa1";
export const LINEA_AuctionFactory =
  "0xA63872780B73BBD14C59dB6b0849c9550d44613B";

// Polygon ZK EVM
export const POLYGON_Fukuro = "0xd77A3312A0aE3c18b68B2426AF5A2b916Bbab4Ac";
export const POLYGON_FukuFuku = "0xc90995B5897B2BA7ee2580FA6d978f3E5394cCe0";
export const POLYGON_AfropolitanNFT =
  "0xA6dBfAeD336F3586D5dc336f6E902803Ea0a9994";
export const POLYGON_Registry = "0x45E67155e2F6e8107Cd17905B1A9c3510cE3aCa1";
export const POLYGON_AuctionFactory =
  "0xA63872780B73BBD14C59dB6b0849c9550d44613B";
