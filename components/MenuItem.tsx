
import React, { useState } from 'react';
import type { Dish } from '../types';
import { useAppContext } from '../context/AppContext';
import Modal from './Modal';
import { PlusCircleIcon } from './icons/Icons';

interface MenuItemProps {
    dish: Dish;
}

const MenuItem: React.FC<MenuItemProps> = ({ dish }) => {
    const { dispatch } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [instructions, setInstructions] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { dish, quantity, instructions },
        });
        setIsModalOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        setQuantity(1);
        setInstructions('');
    };

    return (
        <>
            <div className="group flex flex-col items-center text-center transition-all duration-500">
                <div 
                    className="relative w-full aspect-[4/3] mb-6 cursor-pointer overflow-hidden rounded-xl border border-white/5 shadow-2xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img 
                        src={dish.imageUrl} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-base-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                            <PlusCircleIcon className="w-6 h-6" />
                        </div>
                    </div>
                    {/* Subtle Corner Decoration on Image */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 m-3 group-hover:m-2 transition-all"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20 m-3 group-hover:m-2 transition-all"></div>
                </div>

                <div className="flex flex-col items-center max-w-[280px]">
                    <h3 className="text-2xl font-serif italic text-white mb-2 leading-tight group-hover:text-primary transition-colors">{dish.name}</h3>
                    
                    {/* Item Flourish */}
                    <div className="w-6 h-[1px] bg-white/20 mb-3"></div>

                    <p className="text-white/40 text-[11px] leading-relaxed font-light tracking-wide mb-4 line-clamp-2 uppercase">
                        {dish.description}
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-serif italic text-white/80">₹{dish.price}</span>
                        <div className="w-[1px] h-4 bg-white/10"></div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
                        >
                            Select Item
                        </button>
                    </div>
                </div>
                
                {showSuccess && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-base-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] animate-bounce shadow-2xl z-20 border border-emerald-900">
                        Selection Added
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-2">
                    <h2 className="text-3xl font-serif italic text-white mb-2 text-center">{dish.name}</h2>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 text-center mb-8">Personalize Order</p>
                    
                    <div className="relative w-full aspect-video mx-auto mb-10 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                        <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="space-y-10">
                        <div className="flex flex-col items-center">
                            <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4 font-bold">Quantity</label>
                            <div className="flex items-center gap-8">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                                    className="w-10 h-10 rounded-full border border-white/10 hover:bg-white hover:text-base-100 transition-all text-xl flex items-center justify-center"
                                >
                                    −
                                </button>
                                <span className="text-2xl font-serif italic text-white w-8 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)} 
                                    className="w-10 h-10 rounded-full border border-white/10 hover:bg-white hover:text-base-100 transition-all text-xl flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="instructions" className="block text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4 font-bold text-center">Kitchen Preferences</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                placeholder="Any special requests? (e.g. Extra spicy, no onions)"
                                className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-all text-xs font-light min-h-[100px] text-center italic"
                            ></textarea>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-white text-base-100 py-5 rounded-sm font-black text-[11px] tracking-[0.4em] uppercase hover:bg-white/90 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                        >
                            Confirm Selection — ₹{dish.price * quantity}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MenuItem;
