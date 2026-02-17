
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TrashIcon, ArrowLeftIcon } from './icons/Icons';
import type { CartItem } from '../types';

interface CartViewProps {
    onBackToMenu: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onBackToMenu }) => {
    const { state, dispatch } = useAppContext();

    const handleRemove = (dishId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: dishId });
    };

    const handleQuantityChange = (dishId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const item = state.cart.find(i => i.dish.id === dishId);
        if(item) {
             dispatch({ type: 'UPDATE_CART_ITEM', payload: { dishId, quantity: newQuantity, instructions: item.instructions } });
        }
    };
    
    const handlePlaceOrder = () => {
        dispatch({
            type: 'PLACE_ORDER',
            payload: {
                items: state.cart,
                total: subtotal,
                tableNumber: state.tableNumber!
            }
        });
        dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: `Your order has been received. Thank you!`
        });
        onBackToMenu();
    };

    const subtotal = state.cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

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
                        {state.cart.map((item: CartItem) => (
                            <div key={item.dish.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] transition-all">
                                <div className="flex gap-6 items-center">
                                   <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                       <img src={item.dish.imageUrl} alt={item.dish.name} className="w-full h-full object-cover" />
                                   </div>
                                    <div>
                                        <h3 className="font-serif italic text-xl text-white mb-1">{item.dish.name}</h3>
                                        <p className="text-[10px] text-white/40 tracking-widest uppercase mb-2">₹{item.dish.price} each</p>
                                        {item.instructions && (
                                            <p className="text-[10px] text-white/60 bg-white/5 px-3 py-1.5 rounded-sm italic max-w-xs">
                                                “{item.instructions}”
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-10">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleQuantityChange(item.dish.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">−</button>
                                        <span className="text-lg font-serif italic text-white w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.dish.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="font-serif italic text-xl text-white">₹{item.dish.price * item.quantity}</span>
                                        <button onClick={() => handleRemove(item.dish.id)} className="text-[9px] tracking-widest uppercase text-white/30 hover:text-error transition-colors flex items-center gap-2 group">
                                            <TrashIcon className="w-3 h-3 group-hover:scale-110"/>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-12 border-t border-white/5 space-y-10">
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[11px] tracking-[0.5em] uppercase text-white/30 font-bold">Total Investment</span>
                            <span className="text-6xl font-serif italic text-white">₹{subtotal}</span>
                        </div>
                        
                        <div className="p-8 bg-white/[0.03] rounded-2xl border border-white/5 text-center max-w-md mx-auto">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-relaxed italic">
                                All prices exclude GST. Our culinary team prepares each selection with focused attention.
                            </p>
                        </div>

                        <button
                           onClick={handlePlaceOrder}
                           className="w-full max-w-md mx-auto block bg-white text-base-100 py-6 rounded-sm font-black text-xs tracking-[0.5em] uppercase hover:bg-white/90 transition-transform active:scale-[0.98] shadow-2xl"
                        >
                            Finalize Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartView;
