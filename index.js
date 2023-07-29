// import https from "https"
const express = require('express');
const app = express()
const { readFileSync, readFile } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");
const cors = require('cors');

const httpsServer = createServer({
    key: readFileSync('/etc/letsencrypt/live/alertify.live/privkey.pem'),
    cert: readFileSync('/etc/letsencrypt/live/alertify.live/fullchain.pem')
}, app);

const io = new Server(httpsServer, {
  cors: {
    origin: ['https://khateraho.com', 'https://qrcode.khateraho.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  }
});
app.use(cors({origin: '*'}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ['https://khateraho.com', 'https://qrcode.khateraho.com']);
  next();
});

// Parse request bodies as JSON
app.use(express.json());

// Parse request bodies as URL-encoded data
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
    console.log("A server user connected!!!");

    socket.on('createRoom', (roomName) => {
        // Create a new room with the specified name
        socket.join(roomName);
        console.log(`Room "${roomName}" created and user joined!`);
    });

    // You can also receive data from the client and process it here if needed
    socket.on('clientMessage', (data) => {
        console.log('Received data from the client:', data);
    });
});


app.use(express.static('public'))
app.use(express.urlencoded({extended: true, limit: '3mb'}))

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))

app.post("/registration", (req, res) => {
    console.log(req.body)
    res.redirect("/")
})
const audioData = readFileSync(__dirname+'/public/alien_shoot.mp3');

app.post('/send_data', (req, res) => {
    var send_server_msg = req.body.msg;
    var table = req.body.table;
    var fooderid= req.body.fooderid;
    var notification_div = req.body.notification_div;
    io.sockets.in(fooderid).emit('serverMessage', {send_server_msg, audio: audioData, notification_div});
    // console.log(r_msg);
    // readFile(__dirname+'/public/alien_shoot.mp3', (err, data) => {
    //     if (err) {
    //         console.error('Error reading audio file:', err);
    //         return;
    //     }
        
    //     // Variables to send to the client
    //     // Emit an object containing the two variables and the audio data
    //     // socket.emit('audioData', { variable1, variable2, audioData: data });
    //     io.sockets.in(fooderid).emit('serverMessage', {send_server_msg, audioData: data});
    // });
    // Emit the received data to the connected socket clients
    // io.emit('serverMessage', req.body.msg);
    
    // Create a new room when the server receives client data
    // io.emit('createRoom', 'room_name_here');

    // Send a response back to the POST request indicating success
    res.send('Data sent successfully');
});

const PORT = process.env.PORT || 443
httpsServer.listen(PORT, console.log(`server runs on port ${PORT}`))
