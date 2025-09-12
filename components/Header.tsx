
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShoppingCartIcon, UtensilsIcon } from './icons/Icons';

interface HeaderProps {
    onCartClick: () => void;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onMenuClick }) => {
    const { state } = useAppContext();
    const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="fixed top-0 left-0 right-0 bg-base-200/80 backdrop-blur-md shadow-lg z-50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={onMenuClick}
                    >
                        <UtensilsIcon className="w-8 h-8 text-primary" />
                        <h1 className="text-xl font-bold text-white tracking-wider">
                            QR Dine<span className="text-primary">In</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                       {state.tableNumber && (
                         <div className="text-lg font-semibold bg-primary text-primary-content px-3 py-1 rounded-full">
                           Table: {state.tableNumber}
                         </div>
                       )}
                        <button onClick={onCartClick} className="relative text-gray-300 hover:text-white transition-colors">
                            <ShoppingCartIcon className="w-7 h-7" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
