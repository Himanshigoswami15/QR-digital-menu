
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
            <div className="flex flex-col items-center text-center px-4">
                <div 
                    className="relative w-full aspect-[4/3] mb-6 cursor-pointer overflow-hidden rounded-3xl border border-white/5 shadow-2xl active:scale-95 transition-transform duration-300"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img 
                        src={dish.imageUrl} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[10%]" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-base-100 p-2.5 rounded-full shadow-lg">
                        <PlusCircleIcon className="w-5 h-5" />
                    </div>
                </div>

                <div className="flex flex-col items-center w-full">
                    <h3 className="text-2xl font-serif italic text-white/95 mb-2 leading-tight tracking-tight">{dish.name}</h3>
                    
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-serif italic text-white/90">₹{dish.price}</span>
                        <div className="w-[1px] h-4 bg-white/10"></div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[9px] font-black tracking-[0.2em] uppercase text-white/60 active:text-white transition-colors py-2"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
                
                {showSuccess && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white text-base-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-50 animate-bounce">
                        Added to Tray
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-0">
                    <h2 className="text-3xl font-serif italic text-white mb-1 text-center">{dish.name}</h2>
                    <p className="text-[8px] tracking-[0.4em] uppercase text-white/30 text-center mb-6 font-bold">Preferences</p>
                    
                    <div className="relative w-full aspect-video mx-auto mb-8 rounded-2xl overflow-hidden border border-white/5">
                        <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="flex flex-col items-center">
                            <label className="text-[9px] tracking-[0.4em] uppercase text-white/20 mb-4 font-black">Quantity</label>
                            <div className="flex items-center gap-8">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xl font-light text-white"
                                >
                                    −
                                </button>
                                <span className="text-3xl font-serif italic text-white w-10 text-center">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)} 
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xl font-light text-white"
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
                                className="w-full bg-white/[0.04] border border-white/5 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none text-[11px] font-light min-h-[80px] italic leading-relaxed"
                            ></textarea>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-white text-base-100 py-5 rounded-2xl font-black text-[11px] tracking-[0.4em] uppercase shadow-lg active:scale-95 transition-transform"
                        >
                            Confirm — ₹{dish.price * quantity}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MenuItem;
