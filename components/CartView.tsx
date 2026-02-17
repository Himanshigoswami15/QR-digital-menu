
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
            payload: `Order received. Our kitchen is preparing your selection.`
        });
    };

    const subtotal = state.cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="flex items-center mb-10">
                 <button onClick={onBackToMenu} className="mr-6 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <ArrowLeftIcon className="w-5 h-5 text-white"/>
                </button>
                <h2 className="text-2xl font-light tracking-[0.3em] uppercase text-white">Review Order</h2>
            </div>
            
            {state.cart.length === 0 ? (
                <div className="text-center py-20 border border-white/5 bg-white/5 rounded-sm">
                    <p className="text-white/30 uppercase tracking-widest text-sm">Your selection is empty.</p>
                    <button onClick={onBackToMenu} className="mt-4 text-xs font-bold tracking-[0.2em] uppercase text-white hover:underline underline-offset-4">Return to Menu</button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="space-y-4">
                        {state.cart.map((item: CartItem) => (
                            <div key={item.dish.id} className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex gap-4 items-center">
                                   <div className="w-16 h-16 rounded-sm overflow-hidden border border-white/10">
                                       <img src={item.dish.imageUrl} alt={item.dish.name} className="w-full h-full object-cover" />
                                   </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-widest uppercase text-white">{item.dish.name}</h3>
                                        <p className="text-[10px] text-white/40 tracking-widest uppercase">${item.dish.price.toFixed(2)} each</p>
                                        {item.instructions && <p className="text-[10px] text-white/70 mt-1 italic font-light italic opacity-60">Note: {item.instructions}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center border border-white/20 rounded-sm">
                                        <button onClick={() => handleQuantityChange(item.dish.id, item.quantity - 1)} className="w-8 h-8 text-xs hover:bg-white/10">-</button>
                                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.dish.id, item.quantity + 1)} className="w-8 h-8 text-xs hover:bg-white/10">+</button>
                                    </div>
                                    <span className="font-bold text-sm tracking-widest w-16 text-right">${(item.dish.price * item.quantity).toFixed(2)}</span>
                                    <button onClick={() => handleRemove(item.dish.id)} className="text-white/30 hover:text-white transition-colors">
                                        <TrashIcon className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="pt-8 space-y-4">
                        <div className="flex justify-between items-center text-sm font-bold tracking-[0.2em] uppercase">
                            <span className="text-white/50">Subtotal</span>
                            <span className="text-white text-xl">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="p-4 bg-white/5 rounded-sm border border-white/5">
                            <p className="text-[10px] tracking-widest uppercase text-white/40 leading-relaxed">
                                Prices exclude local taxes. Your final bill will be presented upon completion of your visit.
                            </p>
                        </div>
                        <button
                           onClick={handlePlaceOrder}
                           className="w-full bg-white text-base-100 py-4 mt-4 rounded-sm font-black text-xs tracking-[0.3em] uppercase hover:bg-white/90 transition-transform active:scale-[0.98]"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartView;