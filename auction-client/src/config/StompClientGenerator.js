import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default class StompClientGenerator {



    constructor(user) {
        this.socket = new SockJS('http://localhost:8080/ws')
        this.stompClient = Stomp.over(this.socket)
        this.initConnect();
    }


    initConnect =  async () => {
        try {
            console.log("initConnect")
            await this.stompClient.connect({}, this.stompClient.onConnected(), this.stompClient.onError())
        } catch (error) {
            this.onError(error)
        }
    }


    onConnected = () => {
        console.log('onConnected')
        this.stompClient.subscribe('/topic/bids', this.stompClient.onMessageReceived())
    }


     onMessageReceived = (payload)=>{
        console.log("onMessageReceived")
        console.log(payload)
    }

    
    onError =  (err) => {
        console.log(err);
    }


}