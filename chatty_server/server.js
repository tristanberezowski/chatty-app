//WebSockets Server Setup
const uuid = require('uuid/v4');
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const PORT = 3001;
const server = express()
   // Mount static assets to the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Keep track of online users
wss.online = 0;

 //broadcast function is useful for sending messages to all open connections easily
 //data is an ordinary object
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      return client.send(JSON.stringify(data));
    }
  })
}
//when a user connects, update the online users
wss.on('connection', (ws) => {
  wss.online = wss.online + 1;
  console.log('Users online:', wss.online);
  wss.broadcast({
    content: wss.online,
    type: "online-users"
  });

  //handling incoming messages to send to App.jsx
  ws.on('message', (message) => {
    message = JSON.parse(message);
    message.id = uuid();
    // This error type is for domain specific commands in the future
    if (message.type === 'error') {
      ws.send(JSON.stringify(message));
    }
    else {
      wss.broadcast(message);
    }
  });

  // When a user closes the connection, update the online users
  ws.on('close', () => {
    wss.online = wss.online - 1;
    console.log('Users online:', wss.online);
    wss.broadcast({
      content: wss.online,
      type: "online-users"
    })
  });
  
});