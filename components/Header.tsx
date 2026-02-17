
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="relative w-full bg-base-100 min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ease-out">
            {/* Decorative Ornaments */}
            <div className="absolute top-0 left-0 p-12 opacity-10 pointer-events-none hidden md:block">
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <path d="M0 20 C 40 20, 20 40, 20 100 M0 40 C 60 40, 40 60, 40 100 M0 0 L 100 0" strokeWidth="0.2" />
                    <circle cx="5" cy="5" r="1" fill="currentColor" />
                </svg>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-90 hidden md:block">
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <path d="M0 20 C 40 20, 20 40, 20 100 M0 40 C 60 40, 40 60, 40 100 M0 0 L 100 0" strokeWidth="0.2" />
                    <circle cx="5" cy="5" r="1" fill="currentColor" />
                </svg>
            </div>

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-white/[0.04] to-transparent opacity-60 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.1] animate-[spin_120s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.6] animate-[spin_180s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative group z-10 flex flex-col items-center gap-2 text-center -translate-y-8 md:-translate-y-16 lg:-translate-y-20 transition-transform duration-1000 pt-20">
                <div className="relative p-4 transition-transform duration-1000 hover:scale-[1.02] flex flex-col items-center">
                    {/* Depth Glows */}
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-[2.1] opacity-5 group-hover:scale-[2.2] transition-transform duration-1000 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full bg-white/[0.01] scale-[1.3] blur-[80px] pointer-events-none"></div>
                    
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-48 w-48 md:h-72 md:w-72 lg:h-[380px] lg:w-[380px] object-contain filter brightness-110 drop-shadow-[0_0_70px_rgba(255,255,255,0.15)] transition-all duration-700"
                    />
                </div>

                <div className="flex flex-col items-center gap-3 animate-fade-in pointer-events-none px-6">
                    <span className="text-[9px] tracking-[0.8em] uppercase font-black text-white/40 mb-1 italic">A Legacy of Taste</span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white/95 max-w-4xl leading-[1.15] tracking-tight">
                        Refining the Art of <br className="hidden md:block" /> Authentic Flavors
                    </h1>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-3"></div>
                </div>
            </div>
            
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
                    opacity: 0;
                }
            `}</style>
        </header>
    );
};

export default Header;
