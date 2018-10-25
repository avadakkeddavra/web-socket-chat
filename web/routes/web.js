
class Router{
    constructor(routes = []) {
        this.routes = [];
    }

    callRoute(Data, WebSocket) {
        for(let route of this.routes) {
            if(route.alias === Data.alias) {
                route.callback(Data.body, WebSocket);
            }
        }
    }

    add(alias, callback) {
        this.routes.push({
            alias,callback
        })
    }

    getRoutes() {
        console.log(this.routes);
    }

}

module.exports = Router;