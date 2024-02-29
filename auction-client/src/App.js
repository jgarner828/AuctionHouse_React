/* eslint-disable no-undef */
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import env from "react-dotenv";
import jwt_decode from 'jwt-decode';
import AuctionList from './components/AuctionList';





function App() {

  let CLIENT_ID = env.CLIENT_ID;

  const [user, setUser] = useState();
  const [authCredentials, setAuthCredentials] = useState();
  const [authToken, setAuthToken] = useState();

  function handleCallBackResponse(response) {


    var userObject = jwt_decode(response.credential);
    // console.log(userObject)
    setUser(userObject)
    setAuthCredentials(response)
    setAuthToken(response.credential);
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
            <Header />
                {
                user ? 
                        (<AuctionList className="auctionContainer" user ={user} authToken={authToken} authCredentials={authCredentials} />) 
                      :
                        (<div id="signInDiv"></div>)
                }
              <Footer />
          </div> 
  );


}



export default App;
