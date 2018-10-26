const Controller = require('./Controller');
const peers = require('@service/Peers');


class MessageController extends Controller{
    
    send(Request, Response) {
        let peer = peers.findPeer(Request.body.reviever_id);

        peer.ws.send(Request.body.message);
    }

    get(Request, Response) {

    }
}

module.exports = new MessageController();
