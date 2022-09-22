import React from 'react'
import { useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function AuctionItem({item, user}) {

  console.log(user)
  console.log(item)



const [bid, setBid] = useState(0.00);


function handleChange (e) { 
  setBid(e.target.value);
}

function submitBid () { 


        let newBid = {
                      item_id: item.id,
                      user_email: user.email,
                      bid_price: bid,
                      bid_time: new Date().getTime(),



        }


        var stompClient = null;
            const onError = (err) => {console.log(err);}
            const onMessageReceived = (payload)=>{console.log(payload)}
            const onConnected = () => {
                                stompClient.subscribe('/topic/bids', onMessageReceived)
                          }        
                          // eslint-disable-next-line no-undef
            const socket = new SockJS('http://localhost:8080/ws')
                          // eslint-disable-next-line no-undef
            stompClient = Stomp.over(socket)
            stompClient.connect({}, onConnected, onError)


            stompClient.send("/socket.send", {}, JSON.stringify(JSON.stringify(newBid)));




}




  return (

      <div className = "auctionItemComponent">
        <h3>{item.name}</h3>
        <span>{item.desc}</span>
        <span>Current Bid: ${item.itemStartingPrice}</span>
        <span>Minimum Bid: {item.itemMinBid}</span>
        <span>Time left</span>

        <input type="number" id="bidInput" name="bidInput" onChange={handleChange} ></input>
        <button type='submit' onClick={submitBid}>Submit bid</button>
      </div>

  )
}

export default AuctionItem