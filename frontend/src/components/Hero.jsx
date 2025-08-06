import React from 'react';
import { FaPaperPlane, FaArrowDown } from 'react-icons/fa';
import InteractiveDotGrid from './InteractiveDotGrid';

const Hero = () => {
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes fly-in-repeated {
                        0% {
                            transform: translate(-150px, 80px) rotate(-45deg);
                            opacity: 0;
                        }
                        43% {
                            transform: translate(0, 0) rotate(0deg);
                            opacity: 1;
                        }
                        50% {
                            opacity: 1;
                        }
                        51% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 0;
                        }
                    }

                    .animate-fly-in {
                        animation: fly-in-repeated 3.5s ease-out infinite;
                        animation-delay: 0.7s;
                    }
                `}
            </style>

            <div id="hero" className="min-h-screen relative flex items-center overflow-hidden">
                <InteractiveDotGrid />

                <div className="relative z-10 p-8 md:p-16">
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Welcome to{' '}
                        <span className="relative inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text cursor-pointer transition-all duration-300 hover:brightness-110 hover:scale-105 py-2">
                            CodeSync
                            <div className="absolute top-0 left-full ml-4 animate-fly-in">
                                <FaPaperPlane size={40} className="text-indigo-400" />
                            </div>
                        </span>
                    </h1>

                    <div>
                        <p className="text-lg md:text-2xl text-gray-300 mt-4">
                            The real-time collaborative code editor.
                        </p>
                        <p className="text-md md:text-xl text-gray-400 mt-2">
                            Write, share, and compile code with your team, no matter where they are.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
                        <button
                            onClick={() => scrollTo('join-room')}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 transform hover:scale-105"
                        >
                            Start Coding
                        </button>
                        <button
                            onClick={() => scrollTo('footer')}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 transform hover:scale-105"
                        >
                            Reach Out
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <FaArrowDown size={24} onClick={() => scrollTo('join-room')} className="cursor-pointer" />
                </div>
            </div>
        </>
    );
};

export default Hero;