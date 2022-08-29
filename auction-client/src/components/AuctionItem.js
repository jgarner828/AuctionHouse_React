import React from 'react'

function AuctionItem(item) {

  console.log("Auction Item: " + JSON.stringify(item));
  return (
    <li >{item.item.name}</li>
  )
}

export default AuctionItem