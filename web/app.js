require('module-alias/register');
require('dotenv').config();
/**
 * WEB SOCKET SERVER
 */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5544 });
/**
 * Router for a web-socket protocol
 */
const Router = require('./routes/web');

if(process.env.DB_NAME && process.env.DB_HOST && process.env.DB_PASSWORD && process.env.DB_USER)
{
    require('@model/connection');

}


/**
 * 
 * Start server && mount handlers
 * 
 */

let peers = [];

wss.on('connection', function connection(ws, req) {
  peers.push(ws);
  ws.on('message', function incoming(message) {
    Router.callRoute(message, ws);    
  });
  ws.send(JSON.stringify({success: true}));
});

