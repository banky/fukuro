import { useState } from "react";
import { Button } from "./Button";

type Auction = {
  state: string;
  highestBid: number;
  highestBidder: string;
};

const READABLE_AUCTION_STATE = {
  active: "Active",
  canceled: "Canceled",
  finalized: "Finalized",
} as any;

export const Auction = ({ auction }: { auction: Auction }) => {
  const { state, highestBid, highestBidder } = auction;
  const [bid, setBid] = useState(highestBid + 1);
  return (
    <div className="bg-gray-950 opacity-60 p-4 rounded-xl">
      <div className="mb-4">
        <h1 className="text-lg">{READABLE_AUCTION_STATE[state]}</h1>
      </div>
      <div className="flex mb-4">
        <div className="flex flex-col">
          <div className="text-lg">Highest bid: {highestBid}</div>
          <div className="text-lg">Highest bidder: {highestBidder}</div>
        </div>
      </div>
      <div className="my-8 flex gap-4 w-fit mx-auto">
        <input
          className="text-black px-4 py-2 rounded-md"
          value={bid}
          onChange={(e) => setBid(Number(e.target.value))}
          placeholder="Enter a bid value"
        />
        <Button
          onClick={() => {
            console.log("Place bid");
          }}
          disabled={bid <= highestBid}
        >
          Place bid
        </Button>
      </div>
    </div>
  );
};
