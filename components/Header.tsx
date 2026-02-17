
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShoppingCartIcon, UtensilsIcon, ChefHatIcon } from './icons/Icons';

interface HeaderProps {
    onCartClick: () => void;
    onMenuClick: () => void;
    onKitchenClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onMenuClick, onKitchenClick }) => {
    const { state } = useAppContext();
    const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    const logoUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

    return (
        <header className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-xl border-b border-white/5 shadow-2xl z-50 h-32 md:h-44 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-4 h-full relative">
                <div className="flex justify-between items-center h-full">
                    
                    {/* Left Section: Navigation Toggle */}
                    <div className="flex items-center w-1/4">
                        <button 
                            onClick={onMenuClick}
                            className="group flex flex-col items-center gap-2 text-white/40 hover:text-white transition-all duration-300"
                        >
                            <div className="p-3 border border-white/10 rounded-full group-hover:border-white/40 transition-colors shadow-lg">
                                <UtensilsIcon className="w-5 h-5" />
                            </div>
                            <span className="hidden lg:block text-[8px] font-black tracking-[0.5em] uppercase">Menu</span>
                        </button>
                    </div>

                    {/* Center Section: Substantial Branding Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div 
                            className="cursor-pointer transition-all duration-700 hover:scale-105 active:scale-95 group relative"
                            onClick={onMenuClick}
                        >
                            {/* Visual breathing room - subtle glow rings */}
                            <div className="absolute inset-0 rounded-full border border-white/5 scale-[1.8] opacity-20 group-hover:scale-[1.6] transition-transform duration-1000"></div>
                            <div className="absolute inset-0 rounded-full border border-white/10 scale-[1.4] opacity-40 group-hover:scale-[1.3] transition-transform duration-700"></div>
                            
                            <img 
                                src={logoUrl} 
                                alt="Kargil Kitchen" 
                                className="h-24 w-24 md:h-36 md:w-36 object-contain filter brightness-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] bg-white/5 rounded-full p-2 border border-white/10"
                            />
                        </div>
                    </div>

                    {/* Right Section: Order Actions */}
                    <div className="flex items-center justify-end gap-2 md:gap-10 w-1/4">
                        <div className="flex flex-col items-end gap-1">
                            <button 
                                onClick={onKitchenClick} 
                                className="p-2 text-white/30 hover:text-white transition-colors"
                                title="Kitchen View"
                            >
                                <ChefHatIcon className="w-5 h-5" />
                            </button>
                            {state.tableNumber && (
                                <div className="hidden lg:block text-[7px] tracking-[0.4em] uppercase font-black text-white/20">
                                    Table {state.tableNumber}
                                </div>
                            )}
                        </div>
                        
                        <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>

                        <button 
                            onClick={onCartClick} 
                            className="relative p-3 group transition-all bg-white/5 rounded-full border border-white/5 hover:border-white/20"
                        >
                            <ShoppingCartIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-white text-base-100 text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-2xl border-2 border-base-100">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
