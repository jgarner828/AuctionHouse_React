import React from 'react'
import {useState, useEffect } from 'react';
import StompClientGenerator from '../config/StompClientGenerator'
import { v4 as uuidv4 } from 'uuid';



let stompClient = null;
let stompClientConnected = false;

const startSocketConnection = (user, token , authCredentials) => {

  if (stompClientConnected) return;

  let newConnection = new StompClientGenerator(user, authCredentials, token);
  stompClient = newConnection.stompClient;
  newConnection.initConnect(stompClient, user);
  stompClientConnected = true;
  };



export default function AuctionList({user, authCredentials, token}) {

  const [userData, setUserData] = useState({
    email: user.email,
    name: user.name,
    message: ''
  });


  const [auctionItems, setAuctionItems] = useState([]);


  const [bid, setBid] = useState(0.0);


  const handleChange = async (e) =>{ 
  setBid(e.target.value);
  }


  const submitBid =  async (target) => { 


  const id = uuidv4();
  const time = Date.now();


  let newMessage = {
                type: "BID",
                newBid: {
                        id: id,
                        itemId: target.target.id,
                        email: user.email,
                        bidPrice: bid,
                        bidTime: time
                      },
                sender: userData.email,
                time: new Date().getTime()
  };



            try { 
              // startSocketConnection(user, authCredentials, token);
              stompClient.send("/app/socket.send", {}, JSON.stringify(newMessage));
            } catch(err){ 
              console.log(err); }
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



  useEffect(() => {
    getAuctionList();
  
    // websocket connection starting....
    // let newConnection = new StompClientGenerator(user);
    // stompClient = newConnection.stompClient;
    startSocketConnection(user, authCredentials, token);
  }, []);






  return (
    <ul>  
        {auctionItems.map( item =>  {
          return(                
                <div key={item.id} className = "auctionItemComponent">
                <h3>{item.name}</h3>
                <span>{item.desc}</span>
                <span>Current Bid: ${item.price}</span>
                <span>Minimum Bid: {item.itemMinBid}</span>
                <span>Time left</span>
        
                <input type="number"  name="bidInput" onChange={handleChange} ></input>
                <button type='submit' id={item.id} onClick={submitBid}>Submit bid</button>
              </div>)

        })}
    </ul> 
  )
}
