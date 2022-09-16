import React from 'react'
import AuctionItem from './AuctionItem'
import auctionItemsTestData from '../data/auctionItemsTestData.json';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useState, useEffect } from 'react';

function AuctionList({user, authCredentials, token}) {

 console.log(user)
 console.log(authCredentials);
 console.log(token);
 
 var stompClient = null;


 const [userData, setUserData] = useState({
     username: user.name,
     receivername: '',
     connected: false,
     message: ''
   });


const connect = () => {
      // eslint-disable-next-line no-undef
      const socket = new SockJS('http://localhost:8080/ws')
      // eslint-disable-next-line no-undef
      stompClient = Stomp.over(socket)
      stompClient.connect({}, onConnected, onError)
}

const onConnected = () => {
  console.log("onConnected function")

  stompClient.subscribe('/topic/public', onMessageReceived)
  

  stompClient.send("/app/socket.newUser",
      {},
      JSON.stringify({
          sender: "username",
          type: 'NORMAL',
      })
  )

}


const onMessageReceived = (payload)=>{
  console.log(payload)
}


const onError = (err) => {
  console.log(err);
 
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
    .then((response)=>{ response.json() })
    .then((result)=>{console.log(result)})

};


 useEffect(() => {

  getAuctionList();
   connect();
 }, []);




  if (!auctionItemsTestData) return null;


  return (
    <ul>  
        {
            auctionItemsTestData.map(data => {
              return (
                    <AuctionItem key={data.id} item={data} />
                    )
            })
        }
    </ul> 
  )

}

export default AuctionList