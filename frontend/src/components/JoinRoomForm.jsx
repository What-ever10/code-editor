import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import InteractiveDotGrid from './InteractiveDotGrid';

const JoinRoomForm = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div id="join-room" className="min-h-screen flex justify-center items-center px-4 relative overflow-hidden">
            <InteractiveDotGrid />
            

            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Join a Collaboration Room</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Enter Room ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Enter your Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition duration-300 transform hover:scale-105 active:scale-100"
                        onClick={joinRoom}
                    >
                        Join
                    </button>
                    <div className="text-center text-gray-400">
                        Don't have an invite?&nbsp;
                        <a
                            onClick={createNewRoom}
                            href=""
                            className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                            Create a new room
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center border-t border-gray-700 pt-4">
                    <a
                        href="https://discord.com/invite/google-dev-community"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white font-semibold transition duration-300 inline-flex items-center gap-2"
                    >
                        <FaDiscord size={22} />
                        <span>Connect via Discord before joining</span>
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                        (Recommended for a smooth collaboration experience)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinRoomForm;
