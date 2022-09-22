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




var stompClient = null;


const connect = () => {
      // eslint-disable-next-line no-undef
      const socket = new SockJS('http://localhost:8080/ws')
      // eslint-disable-next-line no-undef
      stompClient = Stomp.over(socket)
      stompClient.connect({}, onConnected, onError)
}


const onConnected = () => {
  console.log("onConnected function")

  stompClient.subscribe('/topic/bids', onMessageReceived)
  

  stompClient.send("/app/socket.newUser",
      {},
      JSON.stringify({
          sender: user.name,
          type: 'NORMAL',
          time: Date.now()
      })
  )

}

 
const onError = (err) => {
  console.log(err);
 
}

const [bid, setBid] = useState(0.00);


function handleChange (e) { 
  setBid(e.target.value);
}

function submitBid (item) { 


  let newBid = {
                item_id: item.id,
                user_email: user.email,
                bid_price: bid,
                bid_time: new Date().now()
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



const onMessageReceived = (payload)=>{
  console.log(payload)
}



const handleMessage =(event)=>{
  const {value}=event.target;
  setUserData({...userData,"message": value});
}


const sendValue=()=>{
  if (stompClient) {
    var chatMessage = {
      senderName: userData.username,
      message: userData.message,
      status:"MESSAGE"
    };
    console.log(chatMessage);
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    setUserData({...userData,"message": ""});
  }
}

const getAuctionList=()=>{

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


 useEffect(() => {
  getAuctionList();
   connect();
 }, []);


 useEffect(() => {

 }, [auctionItems]);


  if (!auctionItems.length === 0 || userData.email == null) return null;

  return (
    <ul>  
        {auctionItems.map( item =>  {
          return(                <div className = "auctionItemComponent">
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