
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
        // Reset for next time
        setQuantity(1);
        setInstructions('');
    };

    return (
        <>
            <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <img src={dish.imageUrl} alt={dish.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                        <p className="text-gray-400 mt-2 text-sm">{dish.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-semibold text-accent">${dish.price.toFixed(2)}</span>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-primary-content px-4 py-2 rounded-full font-semibold hover:bg-primary-focus transition-colors flex items-center gap-2"
                        >
                            <PlusCircleIcon className="w-5 h-5" />
                            Add
                        </button>
                    </div>
                </div>
                 {showSuccess && <div className="bg-success text-white text-center py-1 text-sm font-bold">Added to cart!</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4 text-white">{dish.name}</h2>
                <img src={dish.imageUrl} alt={dish.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Quantity</label>
                    <div className="flex items-center">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-base-300 px-4 py-2 rounded-l-lg font-bold text-xl">-</button>
                        <input type="text" readOnly value={quantity} className="w-16 text-center bg-base-200 py-2" />
                        <button onClick={() => setQuantity(q => q + 1)} className="bg-base-300 px-4 py-2 rounded-r-lg font-bold text-xl">+</button>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="instructions" className="block text-gray-300 mb-2">Special Instructions</label>
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g., extra spicy, no onions"
                        className="w-full bg-base-200 border border-base-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-primary transition"
                        rows={3}
                    ></textarea>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-primary-content py-3 rounded-lg font-bold text-lg hover:bg-primary-focus transition-colors"
                >
                    Add to Cart - ${(dish.price * quantity).toFixed(2)}
                </button>
            </Modal>
        </>
    );
};

export default MenuItem;
