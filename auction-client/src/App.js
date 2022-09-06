/* eslint-disable no-undef */
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuctionList from './components/AuctionList';
import { useEffect } from 'react';
import env from "react-dotenv";



function App() {

  let CLIENT_ID = env.CLIENT_ID;



  function handleCallBackResponse(response) {
    console.log("response credential: " + response.credential)

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
        {/* <Header />
        <AuctionList />
        <Footer /> */}

        <div id="signInDiv"></div>
    </div>
  );
}

export default App;
