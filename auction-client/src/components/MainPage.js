import React from 'react'
import AuctionList from './AuctionList'
import StompWrapper from './StompWrapper'


export default function MainPage(user, token, authCredentials) {


  return (
    <StompWrapper className="stompWrapper" user ={user} authToken={token} authCredentials={authCredentials} />
  )
}