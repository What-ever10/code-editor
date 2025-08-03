require('dotenv').config();
const express=require ('express');
const cors=require('cors')
const http = require('http');
const { Server } = require('socket.io');
const mongoose=require('mongoose');
const compilerRoutes=require('./routes/compilerRoutes');

//connect to mongoose using an iife js
(async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
})();

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true, 
        index: true, 
    },
    code: {
        type: String,
        default: '// Start coding here....', // Default code when a room is created
    },
});

// Creating a Mongoose model from the schema
const Room = mongoose.model('Room', roomSchema);

const PORT = process.env.PORT || 5001;

const app=express();
//mdidlewares
//app.use(express.json());
app.use(cors());

//socket logic
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});
//event handlers

io.on('connection',(socket)=>{
    console.log(`A user connected at:${socket.id}`);
    socket.on('room-join',async (roomId)=>{
        socket.join(roomId);//it subscribes the socket to a room id
        console.log(`User ${socket.id} connected to ${roomId}`);
        let room = await Room.findOne({roomId});
        if(!room){
            room =Room.create({roomId});
        }
        socket.emit('initial code',room.code);//initial-code is an identifier used when by the client side to get the event details in the .on method
        socket.to(roomId).emit('user-joined',socket.id);//identify others except the user 
    });
    socket.on('code-change',async (data)=>{
        const {roomId, code}= data;
        await Room.findOneAndUpdate(//updating the database
            { roomId },
            { code },
            { upsert: true, new: true }
        );
        socket.to(roomId).emit('code-update', code);
    });
    //discoonnection logic
    socket.on('disconnecting', () => {
        const rooms = Object.keys(socket.rooms);
        rooms.forEach((roomId) => {
            if (roomId !== socket.id) {
                socket.to(roomId).emit('user-left', socket.id);
                console.log(`User ${socket.id} left room ${roomId}`);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
})

//server testing
app.get('/',(req,res)=>{
    console.log('server is running');
    res.send('server is running');
})
//routing
app.use('/api/compiler', compilerRoutes);
server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})

