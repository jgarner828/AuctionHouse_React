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
    
       await stompClient.subscribe('/topic/bids', stompClient.onMessageReceived())
      
      }
      
    
     onMessageReceived = async (payload)=>{
        console.log("onMessageReceived")
        console.log(payload)
      }
      
       
    onError = async (err) => {
        console.log(err);
       
    }

    initConnect = async (stompClient, user) => {
        console.log("initConnect")
     await stompClient.connect({}, stompClient.onConnected(stompClient, user), stompClient.onError())
    }
}