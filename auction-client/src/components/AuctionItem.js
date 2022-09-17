import React from 'react'
import { useState } from 'react';



function AuctionItem({item, user}) {

  console.log(user)
  console.log(item)



const bidMessage = {
  id: Date.now(),
  itemId : item.id,
  userId : user.userId,
  bidPrice : {}
}

const [bid, setBid] = useState(0.00);


function handleChange (e) { 
  setBid(e.target.value);
  console.log(bid)
}

function submitBid () { 
  // TODO: set the submit message
}

  return (

      <div className = "auctionItemComponent">
        <h3>{item.name}</h3>
        <span>{item.desc}</span>
        <span>Current Bid</span>
        <span>Time left</span>

        <input type="number" id="bidInput" name="bidInput" onChange={handleChange} placeholder="Enter your bid."></input>
        <button type='submit' onClick={submitBid}>Submit bid</button>
      </div>

  )
}

export default AuctionItem