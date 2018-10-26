const ResponseClass = require('./Response');
const RequestClass = require('./Request');

class Router{

    constructor(routes = []) {
        this.routes = [];
    }

    callRoute(Data, WebSocket) {
        Data = JSON.parse(Data);
        const Response = new ResponseClass(WebSocket, Data.alias);
        try {
            const Request = new RequestClass(Data);
            for(let route of this.routes) {
          
                if(route.alias === Request.alias) {
                   
                   let paramCheck = this.checkRequestParams(route.params, Request.params)
                   if(paramCheck != true) {
                        Response.send({
                            type: 'Error',
                            status: 400,
                            message: paramCheck
                        });
                        return;
                   }
                   
                   var flag = true;
                   for(let i = 0; i < route.callbacks.length; i = i + 2) {
                       let callback = route.callbacks[i];
                       let nextCallback = route.callbacks[i+1];
                       
                       if(flag == true) {
                        flag = callback(Request, Response, function() {return true});
                       }
    
                       if(flag == true) {
                           flag = nextCallback(Request, Response, function() {return true});
                       }
                   }
                   return;
                }
            }
    
            Response.send({
                type: 'Error',
                status: 404,
                message: 'This alias does not exist'
            }); 

        } catch(Error) {
            Response.send({
                type: 'Error',
                status: 400,
                message: Error.message,
                trace: Error.fileName +' at Line '+Error.stack
            }); 
        }
    }   

    add(alias,params,... callbacks) {

        this.routes.push({
            alias: alias,
            params: params,
            callbacks
        })

    }

    checkRequestParams(AllowParams, params = []) {
        if(AllowParams.length === Object.keys(params).length){
            for(let index of AllowParams) {
                if(!params[index] || params[index].length === 0) {
                    return 'Missing `' + index + '` param';
                }
            }
        } 
        return true;
    }

    getRoutes() {
        console.log(this.routes);
    }

}

module.exports = Router;