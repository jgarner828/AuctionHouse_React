import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default class StompClientGenerator {



    constructor(user) {
        this.socket = new SockJS('http://localhost:8080/ws')
        this.stompClient = Stomp.over(this.socket)
        this.initConnect();
    }


    initConnect =  async () => {
        console.log("initConnect")
        await this.stompClient.connect({}, this.stompClient.onConnected(), this.stompClient.onError())
    }


    onConnected = async () => {
        console.log('onConnected')
        await this.stompClient.subscribe('/topic/bids', this.stompClient.onMessageReceived())
    }


     onMessageReceived = (payload)=>{
        console.log("onMessageReceived")
        console.log(payload)
    }

    
    onError =  (err) => {
        console.log(err);
       
    }


}