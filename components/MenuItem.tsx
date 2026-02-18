
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
            <div className="group flex flex-col items-center text-center transition-all duration-700">
                <div 
                    className="relative w-full aspect-[16/11] mb-8 cursor-pointer overflow-hidden rounded-2xl border border-white/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img 
                        src={dish.imageUrl} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-base-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                            <PlusCircleIcon className="w-7 h-7" />
                        </div>
                    </div>
                    {/* Elegant Corner Framing */}
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/20 m-4 group-hover:m-2 transition-all duration-700 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/20 m-4 group-hover:m-2 transition-all duration-700 rounded-bl-lg"></div>
                </div>

                <div className="flex flex-col items-center max-w-[300px] px-2">
                    <h3 className="text-3xl font-serif italic text-white/95 mb-3 leading-tight tracking-tight group-hover:text-white transition-all duration-300">{dish.name}</h3>
                    
                    {/* Delicate Divider */}
                    <div className="w-8 h-[1px] bg-white/20 mb-6 transform scale-x-0 group-hover:scale-x-150 transition-transform duration-700"></div>
                    
                    <div className="flex items-center gap-6">
                        <span className="text-xl font-serif italic text-white/90">₹{dish.price}</span>
                        <div className="w-[1px] h-5 bg-white/10"></div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[10px] font-black tracking-[0.25em] uppercase text-white/50 hover:text-white transition-all border-b border-transparent hover:border-white/40 pb-1"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
                
                {showSuccess && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-base-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] animate-bounce shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20 border-2 border-base-100">
                        Selection Saved
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-2">
                    <h2 className="text-4xl font-serif italic text-white mb-2 text-center tracking-tight">{dish.name}</h2>
                    <p className="text-[10px] tracking-[0.5em] uppercase text-white/40 text-center mb-10 font-bold">Craft Your Order</p>
                    
                    <div className="relative w-full aspect-[16/9] mx-auto mb-12 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                        <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="space-y-12">
                        <div className="flex flex-col items-center">
                            <label className="text-[10px] tracking-[0.6em] uppercase text-white/20 mb-6 font-black">Desired Quantity</label>
                            <div className="flex items-center gap-12">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                                    className="w-12 h-12 rounded-full border border-white/10 hover:bg-white hover:text-base-100 transition-all text-2xl flex items-center justify-center font-light"
                                >
                                    −
                                </button>
                                <span className="text-4xl font-serif italic text-white w-12 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)} 
                                    className="w-12 h-12 rounded-full border border-white/10 hover:bg-white hover:text-base-100 transition-all text-2xl flex items-center justify-center font-light"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="instructions" className="block text-[10px] tracking-[0.6em] uppercase text-white/20 mb-6 font-black text-center">Special Nuances</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                placeholder="E.g., extra spice, no cilantro, etc."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-6 text-white placeholder:text-white/10 focus:border-white/30 focus:outline-none transition-all text-xs font-light min-h-[120px] text-center italic leading-relaxed"
                            ></textarea>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-white text-base-100 py-6 rounded-xl font-black text-[12px] tracking-[0.5em] uppercase hover:bg-white/90 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                        >
                            Add to Selection — ₹{dish.price * quantity}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MenuItem;
