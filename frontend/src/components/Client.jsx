import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    return (
        <div className="flex items-center space-x-3 mb-2 p-2 rounded-md hover:bg-white/10 transition-colors duration-200">
            <Avatar 
                name={username} 
                size="20" 
                round={true} 
                textSizeRatio={2.5} 
            />
            <span className="font-semibold text-xs text-gray-300">{username}</span>
        </div>
    );
};

export default Client;
