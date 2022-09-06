import React from 'react'
import AuctionItem from './AuctionItem'
import auctionItemsTestData from '../data/auctionItemsTestData.json';

import { useEffect } from 'react';

function AuctionList() {



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