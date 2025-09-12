
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
            payload: `New order from Table ${state.tableNumber} sent to Kitchen Display 9057276950.`
        });
    };

    const subtotal = state.cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

    return (
        <div className="bg-base-200 p-6 rounded-xl shadow-2xl">
            <div className="flex items-center mb-6">
                 <button onClick={onBackToMenu} className="mr-4 p-2 rounded-full hover:bg-base-300 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6"/>
                </button>
                <h2 className="text-3xl font-extrabold text-white">Your Order</h2>
            </div>
            {state.cart.length === 0 ? (
                <p className="text-gray-400 text-center py-10">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {state.cart.map((item: CartItem) => (
                        <div key={item.dish.id} className="flex items-start justify-between bg-base-300 p-4 rounded-lg">
                            <div className="flex items-start gap-4">
                               <img src={item.dish.imageUrl} alt={item.dish.name} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-bold text-lg">{item.dish.name}</h3>
                                    <p className="text-sm text-gray-400">${item.dish.price.toFixed(2)}</p>
                                    {item.instructions && <p className="text-xs text-amber-300 mt-1 italic">"{item.instructions}"</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-gray-600 rounded-full">
                                    <button onClick={() => handleQuantityChange(item.dish.id, item.quantity - 1)} className="px-3 py-1 font-bold">-</button>
                                    <span className="px-3">{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.dish.id, item.quantity + 1)} className="px-3 py-1 font-bold">+</button>
                                </div>
                                <span className="font-bold w-20 text-right">${(item.dish.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => handleRemove(item.dish.id)} className="text-gray-500 hover:text-error transition-colors">
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="pt-6 border-t border-base-300">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-right text-sm text-gray-400 mt-1">Taxes and fees calculated at payment.</p>
                        <button
                           onClick={handlePlaceOrder}
                           className="w-full bg-accent text-white py-3 mt-6 rounded-lg font-bold text-lg hover:bg-green-600 transition-transform transform hover:scale-105"
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
