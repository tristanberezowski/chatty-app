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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //broadcast function is useful for sending messages to all open connections easily
  wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        return client.send(JSON.stringify(data));
      }
  })}

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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});