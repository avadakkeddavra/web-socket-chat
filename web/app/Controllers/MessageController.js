const Controller = require('./Controller');
const peers = require('@service/Peers');


class MessageController extends Controller{
    
    send(Request, Response) {
        console.log('send message');
        let peer = peers.findPeer(Number(Request.body.receiver_id));
        if(peer) {
            peer.ws.send(JSON.stringify({
                type:"message",
                message: Request.body.message,
                sender: Request.auth.name
            }));
        }
        
    }

    get(Request, Response) {

    }
}

module.exports = new MessageController();
