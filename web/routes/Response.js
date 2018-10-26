class Response {
    constructor(WebSocket,Alias) {
        this.Alias = Alias
        this.WebSocket = WebSocket;
        this.AllowTypes = ['string', 'Buffer', 'ArrayBuffer', 'Array'];
    }

    send(Data) {
        console.log((typeof Data));
        if( this.AllowTypes.indexOf((typeof Data)) != -1) {
            this.WebSocket.send(Data);
        } else if((typeof Data) === 'object') {
            this.json(Data);
        }
        else {
            throw new Error('The data for sending must be like a type of `string`, `Buffer`, `ArrayBuffer`, `Array`');
        }
    }

    json(Data) {
       Data.alias = this.Alias;
       Data = JSON.stringify(Data);
       this.WebSocket.send(Data);
    }
}

module.exports = Response;