
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="relative w-full bg-base-100 h-[65vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ease-out">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-radial from-white/[0.04] to-transparent opacity-60 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.5] animate-[spin_80s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[2] animate-[spin_120s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative group z-10 flex flex-col items-center gap-12">
                <div className="relative p-8 transition-transform duration-700 hover:scale-[1.02] flex flex-col items-center">
                    {/* Layered glows for depth */}
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-[2.2] opacity-10 group-hover:scale-[2.3] transition-transform duration-1000 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full bg-white/[0.01] scale-[1.3] blur-3xl pointer-events-none"></div>
                    
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-56 w-56 md:h-80 md:w-80 lg:h-[400px] lg:w-[400px] object-contain filter brightness-110 drop-shadow-[0_0_80px_rgba(255,255,255,0.25)] transition-all duration-700"
                    />
                </div>

                <div className="flex flex-col items-center gap-6 mt-4 animate-fade-in pointer-events-none">
                    <p className="text-[11px] tracking-[1em] uppercase font-bold text-white/50">Culinary Excellence</p>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 via-white/10 to-transparent"></div>
                </div>
            </div>
            
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 2s ease-out forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
