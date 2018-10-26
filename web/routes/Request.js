class Request {
    constructor(Data) {
        this.alias = Data.alias;
        this.body = Data.body;
        this.params = Data.params;
    }
}

module.exports = Request;