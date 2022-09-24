import React from 'react'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useState, useEffect } from 'react';

function AuctionList({user, authCredentials, token}) {

 
 const [auctionItems, setAuctionItems] = useState([]);

 const [userData, setUserData] = useState({
                                            email: user.email,
                                            name: user.name,
                                            message: ''
                                          });

  const [bid, setBid] = useState(0.00);

  let stompClient;
  let socket;

const connect = async () => {
      socket = new SockJS('http://localhost:8080/ws')
      stompClient = Stomp.over(socket)
      stompClient.connect({}, onConnected, onError)
}


const onConnected = async() => {

  stompClient.subscribe('/topic/bids', onMessageReceived)

  stompClient.send("/app/socket.newUser",
      {},
      JSON.stringify({
          sender: user.name,
          type: 'NEW_USER',
          time: Date.now()
      })
  )
}



 
const onError = async (err) => {
  console.log(err);
 
}


const handleChange = async (e) =>{ 
  setBid(e.target.value);
}


const submitBid =  async (item) => { 
  

  let newMessage = {
                type: "BID",
                newBid: {
                        itemId: item.id,
                        email: user.email,
                        bidPrice: bid,
                        bidTime: new Date().getTime()
                       },
                sender: userData.email,
                time: new Date().getTime()
      };

            try { 
              stompClient.send("/socket.send", {}, JSON.stringify(newMessage));
            } catch(err){ 
              console.log(err); }
}


const onMessageReceived = async (payload)=>{
  console.log("onMessageReceived")
  console.log(payload)
}



const getAuctionList = async () => {

    const url = "http://localhost:8080/auctionlist";
  
    const init = {
      method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        },
    };

    fetch(url, init)
    .then(response => response.json())
    .then(response => {setAuctionItems(response)})
};


useEffect( () => {
  getAuctionList();
  connect();
}, []);


return (
    <ul>  
        {auctionItems.map( item =>  {
          return(                <div key={item.id} className = "auctionItemComponent">
                <h3>{item.name}</h3>
                <span>{item.desc}</span>
                <span>Current Bid: ${item.itemStartingPrice}</span>
                <span>Minimum Bid: {item.itemMinBid}</span>
                <span>Time left</span>
        
                <input type="number" id="bidInput_" name="bidInput" onChange={handleChange} ></input>
                <button type='submit' onClick={submitBid}>Submit bid</button>
              </div>)

        })}
    </ul> 
  )
}



export default AuctionList