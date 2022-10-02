import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export default class StompClientGenerator {



    constructor(user) {
        this.socket = new SockJS('http://localhost:8080/ws')
        this.stompClient = Stomp.over(this.socket)
        this.initConnect();
    }


    onConnected = async (stompClient, user) => {
        console.log('onConnected')
        console.log(stompClient)
    
        stompClient.subscribe('/topic/bids', stompClient.onMessageReceived)
      
        stompClient.send("/app/socket.newUser",
            {},
            JSON.stringify({
                sender: user.name,
                type: 'NEW_USER',
                time: Date.now()
            })
        )
      }
      
    
    onMessageReceived = async (payload)=>{
        console.log("onMessageReceived")
        console.log(payload)
      }
      
       
    onError = async (err) => {
        console.log(err);
       
    }

    initConnect = async (stompClient, user) => {
         await stompClient.connect({}, stompClient.onConnected(stompClient, user), stompClient.onError)
    }
}