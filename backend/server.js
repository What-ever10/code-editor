// Import necessary modules
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const compilerRoutes = require('./routes/compilerRoutes');

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// --- Mongoose Schema and Model ---
const roomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true, index: true },
    code: { type: String, default: `// Welcome to CodeSync! Start coding...\n` },
});
const Room = mongoose.model('Room', roomSchema);

const PORT = process.env.PORT || 5001;
const app = express();

// --- SECURE CORS CONFIGURATION ---
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

// 2. CORS options object.
const corsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true, 
};


app.use(cors(corsOptions));
// 

app.use(express.json());

const server = http.createServer(app);

// --- SECURE SOCKET.IO CONFIGURATION ---

const io = new Server(server, {
    cors: corsOptions
});


const userSocketMap = {};
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('join', async ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        io.in(roomId).emit('update-client-list', clients);
        let room = await Room.findOne({ roomId });
        if (!room) {
            room = await Room.create({ roomId: roomId });
        }
        io.to(socket.id).emit('load-code', room.code);
        socket.to(roomId).emit('user-joined-toast', username);
    });

    socket.on('code-change', async ({ roomId, code }) => {
        await Room.findOneAndUpdate({ roomId }, { code });
        socket.in(roomId).emit('code-change', { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        const username = userSocketMap[socket.id];
        rooms.forEach((roomId) => {
            const clients = getAllConnectedClients(roomId).filter(c => c.socketId !== socket.id);
            socket.in(roomId).emit('update-client-list', clients);
            socket.in(roomId).emit('user-left-toast', username);
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

app.get('/', (req, res) => {
    res.send('CodeSync server is running!');
});

app.use('/api/compiler', compilerRoutes);//routing

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
