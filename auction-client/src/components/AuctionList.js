import React, { useRef } from 'react'
import {useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';



export default function AuctionList({user, authCredentials, authToken}) {


 const stompClientRef = useRef(null);

 const [auctionItemList, setAuctionItemList] = useState([]);
 const [bid, setBid] = useState(0.00);

 const userData = {
                    email: user.email,
                    name: user.name,
                    message: ''
                                          };


 const handleChange = async (event) =>{ 
      setBid(event.target.value);
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
                  console.log("send bid from AuctionList");
                  stompClientRef.current.send("/app/socket.send", {}, JSON.stringify(newMessage));
                } catch(err){ 
                  console.log(err); }
 }


 const getAuctionList = async () => {

    const url = "http://localhost:8080/auctionlist";
  
    const init = {
      method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${authToken}`, // notice the Bearer before your token
        },
    };

    fetch(url, init)
    .then(response => response.json())
    .then(response => {setAuctionItemList(response)})
 };





 useEffect(() => {

  if(!stompClientRef.current){
      
      const socket = new SockJS('http://localhost:8080/ws');
      stompClientRef.current = Stomp.over(socket);

      stompClientRef.current.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClientRef.current.subscribe('/topic/bids', function (bids) {
        alert(JSON.parse(bids.body).content);
        });
      });
    }

  getAuctionList();

}, []);


  
 return stompClientRef ? (
    <ul>  
        {auctionItemList.map( item =>  {
          return(                <div key={item.id} className = "auctionItemComponent">
                <h3>{item.name}</h3>
                <span>{item.desc}</span>
                <span>Current Bid: ${item.itemStartingPrice}</span>
                <span>Minimum Bid: {item.itemMinBid}</span>
                <span>Time left</span>
        
                <input type="number"  name="bidInput" onChange={handleChange} ></input>
                <button type='submit' id={item.id} onClick={submitBid}>Submit bid</button>
              </div>)

        })}
    </ul> 
  ) : null;
}