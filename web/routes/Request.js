class Request {
    constructor(Data) {
        this.alias = Data.alias;
        this.body = Data.body;
        this.params = Data.params;
        this.token = Data.token;
        this.auth = {};
    }

    setAuth(auth) {
        this.auth = auth;
    }
}

module.exports = Request;