// import { newMockEvent } from "matchstick-as"
// import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
// import {
//   Approval,
//   ApprovalForAll,
//   ConsecutiveTransfer,
//   Initialized,
//   Invited,
//   OwnershipTransferred,
//   Referral,
//   Transfer,
//   Withdrawal
// } from "../generated/INS1D3RS/INS1D3RS"

// export function createApprovalEvent(
//   owner: Address,
//   approved: Address,
//   tokenId: BigInt
// ): Approval {
//   let approvalEvent = changetype<Approval>(newMockEvent())

//   approvalEvent.parameters = new Array()

//   approvalEvent.parameters.push(
//     new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
//   )
//   approvalEvent.parameters.push(
//     new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
//   )
//   approvalEvent.parameters.push(
//     new ethereum.EventParam(
//       "tokenId",
//       ethereum.Value.fromUnsignedBigInt(tokenId)
//     )
//   )

//   return approvalEvent
// }

// export function createApprovalForAllEvent(
//   owner: Address,
//   operator: Address,
//   approved: boolean
// ): ApprovalForAll {
//   let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

//   approvalForAllEvent.parameters = new Array()

//   approvalForAllEvent.parameters.push(
//     new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
//   )
//   approvalForAllEvent.parameters.push(
//     new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
//   )
//   approvalForAllEvent.parameters.push(
//     new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
//   )

//   return approvalForAllEvent
// }

// export function createConsecutiveTransferEvent(
//   fromTokenId: BigInt,
//   toTokenId: BigInt,
//   from: Address,
//   to: Address
// ): ConsecutiveTransfer {
//   let consecutiveTransferEvent = changetype<ConsecutiveTransfer>(newMockEvent())

//   consecutiveTransferEvent.parameters = new Array()

//   consecutiveTransferEvent.parameters.push(
//     new ethereum.EventParam(
//       "fromTokenId",
//       ethereum.Value.fromUnsignedBigInt(fromTokenId)
//     )
//   )
//   consecutiveTransferEvent.parameters.push(
//     new ethereum.EventParam(
//       "toTokenId",
//       ethereum.Value.fromUnsignedBigInt(toTokenId)
//     )
//   )
//   consecutiveTransferEvent.parameters.push(
//     new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
//   )
//   consecutiveTransferEvent.parameters.push(
//     new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
//   )

//   return consecutiveTransferEvent
// }

// export function createInitializedEvent(version: i32): Initialized {
//   let initializedEvent = changetype<Initialized>(newMockEvent())

//   initializedEvent.parameters = new Array()

//   initializedEvent.parameters.push(
//     new ethereum.EventParam(
//       "version",
//       ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
//     )
//   )

//   return initializedEvent
// }

// export function createInvitedEvent(key: Bytes, cid: Bytes): Invited {
//   let invitedEvent = changetype<Invited>(newMockEvent())

//   invitedEvent.parameters = new Array()

//   invitedEvent.parameters.push(
//     new ethereum.EventParam("key", ethereum.Value.fromFixedBytes(key))
//   )
//   invitedEvent.parameters.push(
//     new ethereum.EventParam("cid", ethereum.Value.fromFixedBytes(cid))
//   )

//   return invitedEvent
// }

// export function createOwnershipTransferredEvent(
//   previousOwner: Address,
//   newOwner: Address
// ): OwnershipTransferred {
//   let ownershipTransferredEvent = changetype<OwnershipTransferred>(
//     newMockEvent()
//   )

//   ownershipTransferredEvent.parameters = new Array()

//   ownershipTransferredEvent.parameters.push(
//     new ethereum.EventParam(
//       "previousOwner",
//       ethereum.Value.fromAddress(previousOwner)
//     )
//   )
//   ownershipTransferredEvent.parameters.push(
//     new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
//   )

//   return ownershipTransferredEvent
// }

// export function createReferralEvent(
//   affiliate: Address,
//   token: Address,
//   wad: BigInt,
//   numMints: BigInt
// ): Referral {
//   let referralEvent = changetype<Referral>(newMockEvent())

//   referralEvent.parameters = new Array()

//   referralEvent.parameters.push(
//     new ethereum.EventParam("affiliate", ethereum.Value.fromAddress(affiliate))
//   )
//   referralEvent.parameters.push(
//     new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
//   )
//   referralEvent.parameters.push(
//     new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
//   )
//   referralEvent.parameters.push(
//     new ethereum.EventParam(
//       "numMints",
//       ethereum.Value.fromUnsignedBigInt(numMints)
//     )
//   )

//   return referralEvent
// }

// export function createTransferEvent(
//   from: Address,
//   to: Address,
//   tokenId: BigInt
// ): Transfer {
//   let transferEvent = changetype<Transfer>(newMockEvent())

//   transferEvent.parameters = new Array()

//   transferEvent.parameters.push(
//     new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
//   )
//   transferEvent.parameters.push(
//     new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
//   )
//   transferEvent.parameters.push(
//     new ethereum.EventParam(
//       "tokenId",
//       ethereum.Value.fromUnsignedBigInt(tokenId)
//     )
//   )

//   return transferEvent
// }

// export function createWithdrawalEvent(
//   src: Address,
//   token: Address,
//   wad: BigInt
// ): Withdrawal {
//   let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

//   withdrawalEvent.parameters = new Array()

//   withdrawalEvent.parameters.push(
//     new ethereum.EventParam("src", ethereum.Value.fromAddress(src))
//   )
//   withdrawalEvent.parameters.push(
//     new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
//   )
//   withdrawalEvent.parameters.push(
//     new ethereum.EventParam("wad", ethereum.Value.fromUnsignedBigInt(wad))
//   )

//   return withdrawalEvent
// }
