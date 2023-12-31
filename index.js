//import the express library
//which is a nodejs framework used to handle webserver and http middleware
import express from 'express';
//import createServer function from node.js native HTTP module
import {createServer} from 'node:http';
//The createServer function returns a new HTTP server instance
//that can be used to handle HTTP requests and responses

//import Server class from socket.io library
//it's used to manage Websocket servers
import {Server} from "socket.io";

//create an instance of the express application
//app is a function handler for express()
const app = express();
//initiate and assign a variable for the HTTP server port
const port = 3000;
//create an HTTP Server using the createServer function and pass the express app as it's handler
//everytime the server gets a request, the requestListener - app is executed
const server = createServer(app);
//initalize a new Websocket server instance from Server class
const io = new Server(server);

//Serve static files such as css from the public directory
app.use(express.static('public'));
//define a route that responds to HTTP GET requests at the root URL ('/')
app.get('/' , (req,res)=>{
  //res.send("<h1>Hello World</h1>"); 

  //sends mentioned file in response to an http reqest to the root url
  res.sendFile(new URL('./index.html', import.meta.url).pathname)
});

//Listens for a Websocket connection and executes a callback function
io.on('connection', (socket) => {
  console.log("a user has connected");
  //listens for disconnect event and executes a callback function
  socket.on('disconnect', ()=>{
    console.log("a user has disconnected");
  })

  //listens for 'chat message' event and executes a callback function
  socket.on('chat message', (msg)=>{
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  })
})
//Start HTTP Server and have it listen at {port}
server.listen(port, ()=>{
  console.log('server running at port 3000');
});

/* we use the native node http module over the express one 
 * because it gives us more low level control when it comes 
 * to low-level apis provided by nodejs when handling http requests.*/


/* the approach above lets me keep fine grain control over how my Server
 * handles HTTP requests while benefitting from express routing and middleware
 * capabilities*/
