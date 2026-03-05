
import React, { useState } from 'react';
import type { Dish, Portion } from '../types';
import { useAppContext } from '../context/AppContext';

interface MenuItemProps {
    dish: Dish;
}

const MenuItem: React.FC<MenuItemProps> = ({ dish }) => {
    const { dispatch } = useAppContext();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { dish, quantity: 1, instructions: '' },
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleAddPortionToCart = (portion: Portion) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { dish, quantity: 1, instructions: '', selectedPortion: portion },
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className="group flex flex-col items-center text-center transition-all duration-700 relative">
            <div 
                className="relative w-full aspect-[4/3] mb-8 overflow-hidden rounded-[2rem] border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] transition-all duration-700"
            >
                <img 
                    src={dish.imageUrl || undefined} 
                    alt={dish.name} 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                />
            </div>

            <div className="flex flex-col items-center w-full max-w-[340px] px-4">
                <h3 className="text-3xl font-serif italic text-white/95 mb-3 leading-tight tracking-tight group-hover:text-white transition-all duration-300">{dish.name}</h3>
                
                <div className="w-10 h-[1px] bg-white/20 mb-5 transform scale-x-50 group-hover:scale-x-150 transition-transform duration-700"></div>

                {dish.portions && dish.portions.length > 0 ? (
                    <div className="flex flex-col gap-4 w-full">
                        {dish.portions.map((portion) => (
                            <div key={portion.name} className="flex items-center justify-between w-full group/portion">
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-serif italic text-white/90">{portion.name}</span>
                                    {portion.description && (
                                        <span className="text-[9px] text-white/30 uppercase tracking-widest">{portion.description}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-serif italic text-white/80">₹{portion.price}</span>
                                    <button
                                        onClick={() => handleAddPortionToCart(portion)}
                                        className="text-[9px] font-black tracking-[0.2em] uppercase text-white/40 hover:text-white transition-all border border-white/10 px-3 py-1 rounded-full hover:bg-white/5"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
                        <span className="text-xl font-serif italic text-white/90">₹{dish.price}</span>
                        <div className="w-[1px] h-5 bg-white/10"></div>
                        <button
                            onClick={handleAddToCart}
                            className="text-[10px] font-black tracking-[0.25em] uppercase text-white/50 hover:text-white transition-all border-b border-transparent hover:border-white/30 pb-1"
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>

            {showSuccess && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white text-base-100 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl z-20 animate-bounce">
                    Added to Selection
                </div>
            )}
        </div>
    );
};

export default MenuItem;
