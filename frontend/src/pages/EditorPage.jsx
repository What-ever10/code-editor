import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Client from '../components/Client';
import Editor from '../components/Editor';
import Header from '../components/Header';
import socket from '../socket';
import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';
import { FaPlay, FaTimes } from 'react-icons/fa';

const EditorPage = () => {
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [currentCode, setCurrentCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOutputVisible, setIsOutputVisible] = useState(false);
    const hasJoined = useRef(false);

    useEffect(() => {
        function handleErrors(e) {
            console.log('socket error', e);
            toast.error('Socket connection failed, try again later.');
            reactNavigator('/');
        }

        const setupListeners = () => {
            socket.on('connect_error', (err) => handleErrors(err));
            socket.on('connect_failed', (err) => handleErrors(err));

            if (!hasJoined.current) {
                socket.emit('join', {
                    roomId,
                    username: location.state?.username,
                });
                hasJoined.current = true;
            }

            socket.on('update-client-list', (clients) => setClients(clients));
            socket.on('user-joined-toast', (username) => {
                if (username && username !== location.state?.username) {
                    toast.success(`${username} joined the room.`);
                }
            });
            socket.on('user-left-toast', (username) => {
                if (username) toast.success(`${username} left the room.`);
            });
            socket.on('load-code', (code) => setCurrentCode(code));
            socket.on('code-change', ({ code }) => setCurrentCode(code));
        };

        if (socket.connected) {
            setupListeners();
        } else {
            socket.on('connect', setupListeners);
        }

        return () => {
            socket.off('connect_error');
            socket.off('connect_failed');
            socket.off('connect');
            socket.off('update-client-list');
            socket.off('user-joined-toast');
            socket.off('user-left-toast');
            socket.off('load-code');
            socket.off('code-change');
        };
    }, [roomId, location.state?.username]);

    const handleRunCode = async () => {
        setIsLoading(true);
        setOutput('Executing your code...');
        setIsOutputVisible(true);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/compiler/run`,
                {
                    language,
                    code: currentCode,
                }
            );

            if (data.stdout) setOutput(data.stdout);
            else if (data.stderr) setOutput(data.stderr);
            else if (data.compile_output) setOutput(data.compile_output);
            else setOutput('Execution finished with no output.');

        } catch (error) {
            console.error(error);
            const errorMessage = error.response ? error.response.data.error : 'An error occurred.';
            setOutput(errorMessage);
            toast.error('Could not run the code.');
        } finally {
            setIsLoading(false);
        }
    };

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        hasJoined.current = false;
        socket.disconnect();
        reactNavigator('/');
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <div className="h-screen bg-[#1e1e1e] text-white">
            <div className="flex flex-col h-full">
                <Header
                    language={language}
                    setLanguage={setLanguage}
                    handleRunCode={handleRunCode}
                    isLoading={isLoading}
                />
                <div className="flex flex-grow min-h-0">
                    <div className="w-64 bg-[#252526] flex flex-col flex-shrink-0 border-r border-gray-700">
                        <div className="p-4">
                            <h3 className="text-md font-bold text-gray-300">Connected Users:</h3>
                        </div>
                        <div className="flex-grow px-4 overflow-auto">
                            {clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    username={client.username}
                                />
                            ))}
                        </div>
                        <div className="mt-auto p-4 border-t border-gray-700">
                            <button 
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-2 rounded-lg text-sm transition-all duration-300 hover:bg-white/20 hover:border-indigo-500/50 mb-2"
                                onClick={copyRoomId}
                            >
                                Copy Room ID
                            </button>
                            <button 
                                className="w-full bg-red-500/20 backdrop-blur-md border border-red-500/30 text-white font-bold py-2 rounded-lg text-sm transition-all duration-300 hover:bg-red-500/30 hover:border-red-500/50"
                                onClick={leaveRoom}
                            >
                                Leave Room
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow relative">
                        <Editor
                            roomId={roomId}
                            code={currentCode}
                            onCodeChange={setCurrentCode}
                        />
                    </div>
                </div>
            </div>
            
            <div
                className={`fixed bottom-0 left-64 right-0 h-64 bg-[#252526] flex flex-col z-30
                            transition-all duration-300 ease-in-out
                            ${isOutputVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                    <h3 className="font-bold">Output</h3>
                    <button onClick={() => setIsOutputVisible(false)} className="hover:text-red-500">
                        <FaTimes />
                    </button>
                </div>
                <div className="flex-grow overflow-auto bg-black">
                    <pre className="p-2 text-sm font-mono whitespace-pre-wrap">
                        <code>{output}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;