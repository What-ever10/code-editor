import { io } from 'socket.io-client';

// Defining the options for our connection.
const options = {
    'force new connection': true,
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
};

//It runs only once when the application first starts.
// It creates the single, shared socket instance.
const socket = io(import.meta.env.VITE_BACKEND_URL, options);

// We export the single instance itself, not a function to create instances.
export default socket;