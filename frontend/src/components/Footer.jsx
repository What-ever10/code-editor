import React from 'react';
import { FaReddit, FaDiscord } from 'react-icons/fa';

const Footer = () => {
    const year = new Date().getFullYear();
    const socialLinks = {
        reddit: 'https://www.reddit.com/r/developersIndia/',
        discord: 'https://discord.com/invite/google-dev-community',
    };

    return (
        <footer id="footer" className="bg-gray-800 text-gray-400 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
                <p className="mb-8">Connect with other developers.</p>
                <div className="flex justify-center space-x-6 mb-8">
                    <a 
                        href={socialLinks.reddit} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-white transition-transform duration-300 hover:-translate-y-1 active:scale-90" 
                        title="Connect with fellow developers"
                    >
                        <FaReddit size={28} />
                    </a>
                    <a 
                        href={socialLinks.discord} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-white transition-transform duration-300 hover:-translate-y-1 active:scale-90" 
                        title="Join the Discord community"
                    >
                        <FaDiscord size={28} />
                    </a>
                </div>
                <div className="border-t border-gray-700 pt-8">
                    <p>&copy; {year} Pratyush Kumar. All Rights Reserved.</p>
                    <p className="mt-2">Built with ❤️ for the love of code.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;