import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class StompClientGenerator {

    static instance = null;



    constructor(user) {
        if(!StompClientGenerator.instance) {
            this.socket = new SockJS('http://localhost:8080/ws');
            this.stompClient = Stomp.over(this.socket);
            this.initConnect();
            StompClientGenerator.instance = this; 
        }
    }

    static getInstance() {
        if (!StompClientGenerator.instance) {
            StompClientGenerator.instance = new StompClientGenerator();
        }
        return StompClientGenerator.instance;
    }


    initConnect =  async () => {
        try {
            console.log("initConnect")
            await this.stompClient.connect({}, this.onConnected(), this.onError())
        } catch (error) {
            this.onError(error)
        }
    }


    onConnected = () => {
        console.log('onConnected')
        this.stompClient.subscribe('/topic/bids', this.onMessageReceived())
    }


     onMessageReceived = (payload)=>{
        console.log("onMessageReceived")
        console.log(JSON.stringify(payload))
    }

    
    onError =  (err) => {
        console.log(err);
    }


}

export default StompClientGenerator;