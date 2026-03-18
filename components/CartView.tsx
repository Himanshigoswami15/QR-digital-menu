
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TrashIcon, ArrowLeftIcon } from './icons/Icons';
import type { CartItem } from '../types';

interface CartViewProps {
    onBackToMenu: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onBackToMenu }) => {
    const { state, dispatch } = useAppContext();

    const handleRemove = (dishId: number, portionName?: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { dishId, portionName } });
    };

    const handleQuantityChange = (dishId: number, portionName: string | undefined, newQuantity: number) => {
        if (newQuantity < 1) return;
        const item = state.cart.find(i => i.dish.id === dishId && i.selectedPortion?.name === portionName);
        if(item) {
             dispatch({ type: 'UPDATE_CART_ITEM', payload: { dishId, portionName, quantity: newQuantity, instructions: item.instructions } });
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="flex flex-col items-center mb-16 text-center">
                 <button 
                    onClick={onBackToMenu} 
                    className="mb-8 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all group"
                 >
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/>
                    Back to Menu
                </button>
                <h2 className="text-5xl font-serif italic text-white mb-4">Your Selection</h2>
                <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
            
            {state.cart.length === 0 ? (
                <div className="text-center py-24 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
                    <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Your cart is currently empty</p>
                    <button onClick={onBackToMenu} className="px-8 py-3 border border-white/20 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-white hover:bg-white hover:text-base-100 transition-all">Explore Menu</button>
                </div>
            ) : (
                <div className="space-y-12">
                    <div className="space-y-6">
                        {state.cart.map((item: CartItem) => {
                            const itemPrice = item.selectedPortion ? item.selectedPortion.price : item.dish.price;
                            return (
                                <div key={`${item.dish.id}-${item.selectedPortion?.name || 'default'}`} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-all">
                                    <div className="flex gap-6 items-center">
                                       <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                           <img src={item.dish.imageUrl} alt={item.dish.name} className="w-full h-full object-cover" />
                                       </div>
                                        <div>
                                            <h3 className="font-serif italic text-xl text-white mb-1">
                                                {item.dish.name}
                                                {item.selectedPortion && (
                                                    <span className="text-sm text-white/50 ml-3">({item.selectedPortion.name})</span>
                                                )}
                                            </h3>
                                            <p className="text-[10px] text-white/40 tracking-widest uppercase mb-2">₹{itemPrice} each</p>
                                            {item.instructions && (
                                                <p className="text-[10px] text-white/60 bg-white/5 px-3 py-1.5 rounded-sm italic max-w-xs">
                                                    “{item.instructions}”
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-10">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleQuantityChange(item.dish.id, item.selectedPortion?.name, item.quantity - 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">−</button>
                                            <span className="text-lg font-serif italic text-white w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.dish.id, item.selectedPortion?.name, item.quantity + 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <button onClick={() => handleRemove(item.dish.id, item.selectedPortion?.name)} className="text-[9px] tracking-widest uppercase text-white/30 hover:text-error transition-colors flex items-center gap-2 group">
                                                <TrashIcon className="w-3 h-3 group-hover:scale-110"/>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="pt-12 border-t border-white/5 space-y-10">
                        <div className="flex flex-col md:flex-row justify-end items-center gap-8">
                            <button 
                                onClick={() => {
                                    const total = state.cart.reduce((sum, item) => sum + (item.selectedPortion ? item.selectedPortion.price : item.dish.price) * item.quantity, 0);
                                    dispatch({ 
                                        type: 'PLACE_ORDER', 
                                        payload: { 
                                            items: state.cart, 
                                            total 
                                        } 
                                    });
                                    dispatch({ type: 'SET_VIEW', payload: 'order-status' });
                                    dispatch({ type: 'SHOW_NOTIFICATION', payload: 'Order placed successfully. Preparing your selection.' });
                                }}
                                className="w-full md:w-auto px-16 py-5 bg-white text-base-100 rounded-full text-[11px] font-black tracking-[0.4em] uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                            >
                                Place Order
                            </button>
                        </div>

                        <div className="p-8 bg-white/[0.03] rounded-2xl border border-white/5 text-center max-w-md mx-auto">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed italic mb-4">
                                Our culinary team prepares each selection with focused attention.
                            </p>
                            <p className="text-[11px] tracking-[0.3em] uppercase text-white font-black italic">
                                Your satisfaction is our priority.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartView;
