
import React from 'react';

const Header: React.FC = () => {
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="relative w-full bg-base-100 min-h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-gradient-radial from-white/[0.04] to-transparent opacity-60 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[1px] border-white/5 rounded-full scale-[1.1] animate-[spin_120s_linear_infinite]"></div>
            </div>

            <div className="relative group z-10 flex flex-col items-center gap-2 text-center -translate-y-4 pt-8">
                <div className="relative p-2 flex flex-col items-center">
                    {/* Depth Glows */}
                    <div className="absolute inset-0 rounded-full bg-white/[0.01] scale-[1.3] blur-[60px] pointer-events-none"></div>
                    
                    <img 
                        src={logoUrl} 
                        alt="Kargil Kitchen" 
                        className="h-40 w-40 object-contain filter brightness-110 drop-shadow-[0_0_50px_rgba(255,255,255,0.15)] animate-float"
                    />
                </div>

                <div className="flex flex-col items-center gap-2 animate-fade-in px-6">
                    <span className="text-[8px] tracking-[0.8em] uppercase font-black text-white/30 mb-1 italic">A Legacy of Taste</span>
                    <h1 className="text-2xl font-serif italic text-white/95 max-w-xs leading-tight tracking-tight">
                        Refining the Art of <br /> Authentic Flavors
                    </h1>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"></div>
                </div>
            </div>
            
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </header>
    );
};

export default Header;
