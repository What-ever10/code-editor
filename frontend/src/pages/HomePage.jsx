import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import JoinRoomForm from '../components/JoinRoomForm';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const words = [
    'Code',
    'Código',
    'कोड',
    'コード',
    'Код',
];

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wordVisible, setWordVisible] = useState(true);

    useEffect(() => {
        const timeouts = [];
        let delay = 0;
        const wordDisplayTime = 250; 
        const fadeTime = 200;

        words.forEach((_, index) => {
            const fadeOutTimeout = setTimeout(() => {
                setWordVisible(false);
            }, delay + wordDisplayTime);
            
            const fadeInTimeout = setTimeout(() => {
                if (index < words.length - 1) {
                    setCurrentIndex(index + 1);
                    setWordVisible(true);
                }
            }, delay + wordDisplayTime + fadeTime);

            timeouts.push(fadeOutTimeout, fadeInTimeout);
            delay += wordDisplayTime + fadeTime;
        });

        const finalTimeout = setTimeout(() => {
            setLoading(false);
        }, delay + 500); 
        timeouts.push(finalTimeout);

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="bg-black text-white min-h-screen">
            <div
                className={`transition-opacity duration-1000
                            ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <Loader word={words[currentIndex]} isVisible={wordVisible} />
            </div>

            <div className={`transition-all duration-1000 ease-out 
                            ${loading ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}`}>
                <Hero />
                <JoinRoomForm />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;