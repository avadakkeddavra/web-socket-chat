const globalModel =  require('./../Models/index');
const User = globalModel.users;
const Peers = require('@service/Peers');
const jwt = require('jsonwebtoken');

const authMiddleware = {
    // Method handler for intercept request with auth;
    auth:  function (Request, Response, next)
    {
        
        var RequestObject = Request;
        if (!Request.token)
        {
            Response.send({success: false, message:'token does not exists'});
        }
        else
        {
            let  token = Request.token;
            let Decoded = jwt.verify(token,process.env.JWT_KEY) 
 
            let user = User.findOne({
                where:{
                    email:Decoded.email
                }
            }).then(user => {
                if(user)
                {   
                    let peer = Peers.findPeer(user.id);
    
                    if(!peer) {
                        Peers.add({
                            id: user.id,
                            ws: Response.WebSocket
                        })
                    } 
    
                    Request.auth = user;
                    
                }else{
                    Response.send({success:false,error:'There are no such user founded'});
                }
            });
            return next();
        }
        
    },

    admin:async function (request, response, next)
    {
        if(request.auth && request.auth.role == 1)
        {
            next();
        }else{
            
            response.status(400);
            response.send({success:false,error:"You are not admin",user:request.body.auth});
        
        }
    }

};


// Export auth interceptor handler;
module.exports = authMiddleware;