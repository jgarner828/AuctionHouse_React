/* eslint-disable no-undef */
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuctionList from './components/AuctionList';
import { useState, useEffect } from 'react';
import env from "react-dotenv";
import jwt_decode from 'jwt-decode';




function App() {

  let CLIENT_ID = env.CLIENT_ID;

  const [user, setUser] = useState();


  function handleCallBackResponse(response) {

    console.log(response)
    
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallBackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    )
      }, []);



   
  return (
 
    <div className="App">
          {
           user ? 
                  (<AuctionList />) 
                :
                  (<div id="signInDiv"></div>)
          }
    </div> 
  );


}

export default App;
