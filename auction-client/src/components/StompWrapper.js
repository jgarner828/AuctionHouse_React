import React from 'react'

import AuctionList from './AuctionList'
import StompClientGenerator from '../config/StompClientGenerator'


export default function StompWrapper(user, token, authCredentials) {

  let stompClient = null;
  let stompClientConnected = false;
  
  const startSocketConnection = (user, token , authCredentials) => {
  
    if (!stompClientConnected) {
      
      let stompClient = StompClientGenerator();
      // stompClient.initConnect(stompClient, user);
      stompClientConnected = true;
    }
  
  
  };

  startSocketConnection(user, authCredentials, token);



  return (
    <AuctionList className="auctionContainer" user ={user} authToken={token} authCredentials={authCredentials} stompClient={stompClient} />
  )
}
