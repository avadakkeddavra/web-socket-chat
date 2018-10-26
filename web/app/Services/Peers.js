class Peers {
    constructor() {
        this.peers = [];
    }

    add(peer) {

        this.peers.push(peer);
    }

    addPeerFriends(friends) {
        let peerFriends = [];
        for(let peer of this.peers) {
            console.log(peer)
            if(friends.indexOf(Number(peer.id)) != -1) {
                peerFriends.push(peer)
            }
        }
        return peerFriends;
    }

    findPeer(id) {
        
        for(let peer of this.peers) {
            if(peer.id == id) {
                return peer;
            }
        }

        return false;
    }
}

const peers = new Peers();

module.exports = peers;