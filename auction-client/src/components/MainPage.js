import React from 'react'
import AuctionList from './AuctionList'


export default function MainPage(user, token, authCredentials) {


  return (
    <AuctionList className="auctionContainer" user ={user} authToken={token} authCredentials={authCredentials} />
  )
}