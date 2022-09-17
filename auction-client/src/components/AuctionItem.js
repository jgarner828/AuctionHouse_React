import React from 'react'

function AuctionItem({item}) {



console.log(item)



function submitBid(event) {
  console.log(event.target)
}




  return (

      <div className = "auctionItemComponent">
        <h3>{item.name}</h3>
        <span>{item.desc}</span>
        <span>Current Bid</span>
        <span>Time left</span>

        <input type="number" id="bidInput" name="bidInput" placeholder="Enter your bid."></input>
        <button type='submit' onClick={submitBid}>Submit bid</button>
      </div>

  )
}

export default AuctionItem