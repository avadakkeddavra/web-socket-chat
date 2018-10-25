require('module-alias/register');
const express = require('express');
require('dotenv').config();
var app = express();

const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 5544 });

const Router = require('./routes/web');
let router = new Router();
router.add('/', function(Body, WebSocket){
    console.log(Body);
    WebSocket.send('Hi there');
});
router.getRoutes();

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    router.callRoute(JSON.parse(message), ws);
  });
 
  ws.send('something');
});

if(process.env.DB_NAME && process.env.DB_HOST && process.env.DB_PASSWORD && process.env.DB_USER)
{
    require('@model/connection');

}
