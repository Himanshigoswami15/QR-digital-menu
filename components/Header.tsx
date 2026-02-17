
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

    return (
        <header className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-md border-b border-white/5 shadow-2xl z-50 h-20 md:h-24">
            <div className="max-w-7xl mx-auto px-4 h-full relative">
                <div className="flex justify-between items-center h-full">
                    
                    {/* Left Section: Menu Toggle */}
                    <div className="flex items-center w-1/3">
                        <button 
                            onClick={onMenuClick}
                            className="group flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300"
                        >
                            <div className="p-2 border border-white/10 rounded-full group-hover:border-white/40 transition-colors">
                                <UtensilsIcon className="w-5 h-5" />
                            </div>
                            <span className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase">Browse Menu</span>
                        </button>
                    </div>

                    {/* Center Section: Primary Branding (The Logo) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pt-2">
                        <div 
                            className="cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95"
                            onClick={onMenuClick}
                        >
                            <img 
                                src="/logo.png" 
                                alt="Kargil Kitchen Logo" 
                                className="h-16 w-16 md:h-20 md:w-20 object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                onError={(e) => {
                                    // Fallback if image isn't found during initial setup
                                    e.currentTarget.src = 'https://placehold.co/200x200/204534/ffffff?text=KK';
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center justify-end gap-4 md:gap-8 w-1/3">
                        {state.tableNumber && (
                             <div className="hidden lg:block text-[9px] tracking-[0.2em] uppercase font-black border border-white/20 px-3 py-1 rounded-sm text-white/60">
                               Table {state.tableNumber}
                             </div>
                        )}
                        
                        <div className="flex items-center gap-2 md:gap-4">
                            <button 
                                onClick={onKitchenClick} 
                                className="p-2 text-white/50 hover:text-white transition-colors"
                                title="Kitchen View"
                            >
                                <ChefHatIcon className="w-5 h-5" />
                            </button>
                            
                            <button 
                                onClick={onCartClick} 
                                className="relative p-2 group transition-all"
                            >
                                <ShoppingCartIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-base-100 text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-lg border border-base-100">
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