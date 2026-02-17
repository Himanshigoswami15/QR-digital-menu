
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="relative w-full bg-base-100 h-[70vh] md:h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ease-out">
            {/* Decorative Ornaments */}
            <div className="absolute top-0 left-0 p-12 opacity-15 pointer-events-none hidden md:block">
                <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <path d="M0 20 C 40 20, 20 40, 20 100 M0 40 C 60 40, 40 60, 40 100 M0 0 L 100 0" strokeWidth="0.3" />
                    <circle cx="5" cy="5" r="1.5" fill="currentColor" />
                    <path d="M15 0 L 15 15 L 0 15" strokeWidth="0.2" opacity="0.5"/>
                </svg>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-15 pointer-events-none rotate-90 hidden md:block">
                <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <path d="M0 20 C 40 20, 20 40, 20 100 M0 40 C 60 40, 40 60, 40 100 M0 0 L 100 0" strokeWidth="0.3" />
                    <circle cx="5" cy="5" r="1.5" fill="currentColor" />
                    <path d="M15 0 L 15 15 L 0 15" strokeWidth="0.2" opacity="0.5"/>
                </svg>
            </div>

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-white/[0.05] to-transparent opacity-70 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.2] animate-[spin_100s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.8] animate-[spin_150s_linear_infinite_reverse]"></div>
            </div>

            <div className="relative group z-10 flex flex-col items-center gap-12 text-center">
                <div className="relative p-10 transition-transform duration-1000 hover:scale-[1.03] flex flex-col items-center">
                    {/* Layered glows for depth */}
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-[2.4] opacity-10 group-hover:scale-[2.5] transition-transform duration-1000 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-full bg-white/[0.02] scale-[1.4] blur-[100px] pointer-events-none"></div>
                    
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-64 w-64 md:h-80 md:w-80 lg:h-[450px] lg:w-[450px] object-contain filter brightness-110 drop-shadow-[0_0_90px_rgba(255,255,255,0.2)] transition-all duration-700"
                    />
                </div>

                <div className="flex flex-col items-center gap-4 mt-6 animate-fade-in pointer-events-none px-6">
                    <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-white/30 mb-1">A Legacy of Taste</span>
                    <h1 className="text-3xl md:text-5xl font-serif italic text-white/90 max-w-2xl leading-tight">
                        Refining the Art of <br className="hidden md:block" /> Authentic Flavors
                    </h1>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"></div>
                </div>
            </div>
            
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
