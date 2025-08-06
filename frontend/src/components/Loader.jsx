import React from 'react';
const Loader = ({ word, isVisible }) => {
    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <span
                className={`text-white text-5xl font-bold transition-opacity duration-100
                            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
                {word}
            </span>
        </div>
    );
};

export default Loader;