import React from 'react'
import { NFT } from './NFT'

const MOCK_DATA = [{"title":"Citizen #46","description":"","contract":"0x8e16e15381729ffeedc4755f2dcf6f5461f7f389","imageUrl":"https://nft-cdn.alchemy.com/eth-goerli/94585a33eb7274b7d773bd1a846dcfec","tokenId":46},{"title":"Citizen #47","description":"","contract":"0x8e16e15381729ffeedc4755f2dcf6f5461f7f389","imageUrl":"https://nft-cdn.alchemy.com/eth-goerli/2aa7206e251708de33510ed90476ba76","tokenId":47},{"title":"Citizen #48","description":"","contract":"0x8e16e15381729ffeedc4755f2dcf6f5461f7f389","imageUrl":"https://nft-cdn.alchemy.com/eth-goerli/23b15551e2e7534914564795dd7e3972","tokenId":48}]

export const NFTList = () => {
  return (
    <div>
    <div className="grid grid-cols-4 mt-8 gap-4 max-w-4xl mx-auto">
        {MOCK_DATA.map((token) => { 
            return <NFT key={token.tokenId} token={token} />
        })
        }
        </div>
    </div>
  )
}
