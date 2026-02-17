
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
        <header className="fixed top-0 left-0 right-0 bg-base-100/90 backdrop-blur-md border-b border-white/10 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div 
                      className="flex items-center gap-2 cursor-pointer group"
                      onClick={onMenuClick}
                    >
                        <UtensilsIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <h1 className="text-xl font-bold text-white tracking-widest uppercase">
                            Kargil <span className="opacity-70 font-light">Kitchen</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                       {state.tableNumber && (
                         <div className="text-sm tracking-widest uppercase font-bold border border-white px-3 py-1 rounded-sm">
                           Table {state.tableNumber}
                         </div>
                       )}
                        <button onClick={onCartClick} className="relative text-white/80 hover:text-white transition-colors">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-base-100 text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        <button onClick={onKitchenClick} className="text-white/80 hover:text-white transition-colors" title="Kitchen View">
                            <ChefHatIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;