
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="relative w-full bg-base-100 h-[65vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ease-out">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-white/[0.03] to-transparent opacity-50 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.5] animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[2] animate-[spin_90s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative group z-10 flex flex-col items-center gap-8">
                <div className="relative p-8 transition-transform duration-700 hover:scale-105 flex flex-col items-center">
                    {/* Visual breathing room - complex layered glows */}
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-[2.5] opacity-10 group-hover:scale-[2.6] transition-transform duration-1000 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.9] opacity-20 group-hover:scale-[2] transition-transform duration-700 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full bg-white/[0.02] scale-[1.5] blur-2xl pointer-events-none"></div>
                    
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-48 w-48 md:h-72 md:w-72 lg:h-96 lg:w-96 object-contain filter brightness-110 drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-500"
                    />
                </div>

                {/* Brand Tagline */}
                <div className="flex flex-col items-center gap-4 text-center px-6">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-white/60 font-light italic leading-relaxed">
                        Refined flavors, Unforgettable moments
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-8 animate-bounce opacity-40">
                    <p className="text-[10px] tracking-[0.8em] uppercase font-light text-white">Scroll to Explore</p>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
