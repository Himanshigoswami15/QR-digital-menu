
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="relative w-full bg-base-100 min-h-[70vh] md:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-white/[0.05] to-transparent opacity-60 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.1] animate-[spin_180s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[1px] border-white/5 rounded-full scale-[1.5] animate-[spin_120s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative group z-10 flex flex-col items-center gap-4 text-center px-4 -translate-y-4 md:-translate-y-10">
                <div className="relative p-4 transition-transform duration-1000 hover:scale-[1.02] flex flex-col items-center">
                    <div className="absolute inset-0 rounded-full bg-white/[0.01] scale-[1.4] blur-[100px] pointer-events-none"></div>
                    
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-48 w-48 md:h-72 md:w-72 lg:h-96 lg:w-96 object-contain filter brightness-110 drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] animate-float"
                    />
                </div>

                <div className="flex flex-col items-center gap-3 animate-fade-in max-w-4xl">
                    <span className="text-[9px] md:text-[11px] tracking-[1em] uppercase font-black text-white/40 mb-2 italic">A Legacy of Taste</span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white/95 leading-[1.1] tracking-tight">
                        Refining the Art of <br className="hidden md:block" /> Authentic Flavors
                    </h1>
                    <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6"></div>
                </div>
            </div>
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
