
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
                    className="relative w-full aspect-[4/3] mb-8 cursor-pointer overflow-hidden rounded-[2rem] border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] transition-all duration-700"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img 
                        src={dish.imageUrl} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white text-base-100 p-4 rounded-full shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
                            <PlusCircleIcon className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full max-w-[340px] px-4">
                    <h3 className="text-3xl font-serif italic text-white/95 mb-3 leading-tight tracking-tight group-hover:text-white transition-all duration-300">{dish.name}</h3>
                    
                    <div className="w-10 h-[1px] bg-white/20 mb-5 transform scale-x-50 group-hover:scale-x-150 transition-transform duration-700"></div>

                    <div className="flex items-center gap-6">
                        <span className="text-xl font-serif italic text-white/90">₹{dish.price}</span>
                        <div className="w-[1px] h-5 bg-white/10"></div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[10px] font-black tracking-[0.25em] uppercase text-white/50 hover:text-white transition-all border-b border-transparent hover:border-white/30 pb-1"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
                
                {showSuccess && (
                    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white text-base-100 px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 animate-bounce">
                        Saved to Selection
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-2">
                    <h2 className="text-4xl font-serif italic text-white mb-2 text-center tracking-tight">{dish.name}</h2>
                    <p className="text-[10px] tracking-[0.5em] uppercase text-white/30 text-center mb-10 font-bold">Preferences</p>
                    
                    <div className="relative w-full aspect-[16/10] mx-auto mb-10 rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl">
                        <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    <div className="space-y-12">
                        <div className="flex flex-col items-center">
                            <label className="text-[10px] tracking-[0.6em] uppercase text-white/20 mb-6 font-black">Quantity</label>
                            <div className="flex items-center gap-12">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-2xl font-light text-white hover:bg-white hover:text-base-100 transition-all"
                                >
                                    −
                                </button>
                                <span className="text-4xl font-serif italic text-white w-14 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)} 
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-2xl font-light text-white hover:bg-white hover:text-base-100 transition-all"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                placeholder="Special notes? (E.g. extra spicy)"
                                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-[12px] font-light min-h-[100px] italic leading-relaxed transition-all"
                            ></textarea>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-white text-base-100 py-6 rounded-2xl font-black text-[12px] tracking-[0.5em] uppercase shadow-2xl hover:bg-white/90 active:scale-[0.98] transition-all"
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
