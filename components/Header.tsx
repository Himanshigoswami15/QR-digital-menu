
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-2xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 h-48 md:h-72 flex items-center justify-center transition-all duration-700 ease-in-out">
            <div className="relative group p-8">
                {/* Ethereal background rings for depth and scale */}
                <div className="absolute inset-0 rounded-full border border-white/5 scale-[2.2] opacity-10 group-hover:scale-[2.4] transition-transform duration-1000"></div>
                <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.8] opacity-20 group-hover:scale-[1.9] transition-transform duration-700"></div>
                <div className="absolute inset-0 rounded-full bg-white/[0.02] scale-[1.4] blur-xl"></div>
                
                <div className="relative z-10">
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-32 w-32 md:h-56 md:w-56 object-contain filter brightness-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-500 hover:scale-105"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
