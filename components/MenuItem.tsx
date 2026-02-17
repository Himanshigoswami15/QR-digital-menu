
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
            <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden group hover:border-white/30 transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                        src={dish.imageUrl} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 to-transparent"></div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold tracking-wide text-white uppercase">{dish.name}</h3>
                            <span className="text-sm font-light tracking-widest text-white/70">₹{dish.price}</span>
                        </div>
                        <p className="text-white/50 text-xs leading-relaxed font-light line-clamp-2 italic">{dish.description}</p>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full border border-white text-white hover:bg-white hover:text-base-100 px-4 py-2 rounded-sm text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                        >
                            <PlusCircleIcon className="w-4 h-4" />
                            Add to Order
                        </button>
                    </div>
                </div>
                 {showSuccess && <div className="bg-white text-base-100 text-center py-1 text-[10px] font-black uppercase tracking-widest">Added to Order</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold tracking-[0.2em] uppercase mb-4 text-white">{dish.name}</h2>
                <img src={dish.imageUrl} alt={dish.name} className="w-full h-48 object-cover rounded-sm mb-6 border border-white/10"/>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] tracking-widest uppercase text-white/50 mb-3 font-bold">Quantity</label>
                        <div className="flex items-center">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-colors">-</button>
                            <div className="w-16 h-12 flex items-center justify-center border-t border-b border-white/20 text-white font-bold">{quantity}</div>
                            <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 border border-white/20 hover:bg-white/10 flex items-center justify-center text-white transition-colors">+</button>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="instructions" className="block text-[10px] tracking-widest uppercase text-white/50 mb-3 font-bold">Special Requests</label>
                        <textarea
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g., extra spicy, allergens..."
                            className="w-full bg-white/5 border border-white/20 rounded-sm p-3 text-white placeholder:text-white/20 focus:border-white focus:outline-none transition-all text-sm font-light"
                            rows={3}
                        ></textarea>
                    </div>
                    
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-white text-base-100 py-4 rounded-sm font-bold text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all"
                    >
                        Confirm — ₹{dish.price * quantity}
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default MenuItem;
