import React from 'react';
import { FaPlay } from 'react-icons/fa';

const Header = ({ language, setLanguage, handleRunCode, isLoading }) => {
    return (
        <div className="h-14 bg-[#252526] px-4 flex items-center justify-between border-b border-gray-700 z-20">
            <div className="w-48"></div>

            <div className="text-center">
                <h2 className="text-lg font-bold text-gray-300">
                    CodeSync Editor
                </h2>
            </div>

            <div className="w-48 flex justify-end items-center gap-4">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-[#3c3c3c] text-white rounded-md px-3 py-1 focus:outline-none"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                </select>
                
                <button
                    onClick={handleRunCode}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-green-500 transition-colors duration-200 disabled:text-gray-600"
                    title="Run Code"
                >
                    <FaPlay size={20} />
                </button>
            </div>
        </div>
    );
};

export default Header;