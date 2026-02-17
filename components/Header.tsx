
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
        <header className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-xl border-b border-white/5 shadow-2xl z-50 h-28 md:h-32">
            <div className="max-w-7xl mx-auto px-4 h-full relative">
                <div className="flex justify-between items-center h-full">
                    
                    {/* Left Section: Navigation */}
                    <div className="flex items-center w-1/3">
                        <button 
                            onClick={onMenuClick}
                            className="group flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300"
                        >
                            <div className="p-2 border border-white/10 rounded-full group-hover:border-white/40 transition-colors">
                                <UtensilsIcon className="w-5 h-5" />
                            </div>
                            <span className="hidden lg:block text-[9px] font-black tracking-[0.4em] uppercase">Browse Menu</span>
                        </button>
                    </div>

                    {/* Center Section: Centered Circular Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-2">
                        <div 
                            className="cursor-pointer transition-all duration-700 hover:scale-110 active:scale-95 group"
                            onClick={onMenuClick}
                        >
                            {/* Decorative Outer Ring for more "Space" and attractiveness */}
                            <div className="absolute inset-0 rounded-full border border-white/5 scale-150 group-hover:scale-125 transition-transform duration-1000"></div>
                            
                            <img 
                                src={logoUrl} 
                                alt="Kargil Kitchen" 
                                className="h-20 w-20 md:h-24 md:w-24 object-contain filter brightness-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-white/5 rounded-full p-1"
                            />
                        </div>
                    </div>

                    {/* Right Section: Utilities */}
                    <div className="flex items-center justify-end gap-3 md:gap-8 w-1/3">
                        {state.tableNumber && (
                             <div className="hidden lg:block text-[8px] tracking-[0.3em] uppercase font-black opacity-40">
                               Table {state.tableNumber}
                             </div>
                        )}
                        
                        <div className="flex items-center gap-2 md:gap-4">
                            <button 
                                onClick={onKitchenClick} 
                                className="p-2 text-white/30 hover:text-white transition-colors"
                                title="Kitchen View"
                            >
                                <ChefHatIcon className="w-5 h-5" />
                            </button>
                            
                            <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>

                            <button 
                                onClick={onCartClick} 
                                className="relative p-2 group transition-all"
                            >
                                <ShoppingCartIcon className="w-6 h-6 text-white group-hover:translate-y-[-2px] transition-transform" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-base-100 text-[8px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-2xl border border-base-100">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;