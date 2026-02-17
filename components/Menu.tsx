
import React from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import type { Dish } from '../types';

const Menu: React.FC = () => {
    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

    return (
        <div className="space-y-16 pb-20">
            {/* Elegant spacing element */}
            <div className="flex flex-col items-center mb-12">
                <div className="w-12 h-[1px] bg-white/20 mb-4"></div>
                <p className="text-[10px] tracking-[0.6em] uppercase text-white/40 font-light">Culinary Excellence since 2024</p>
            </div>

            {categories.map(category => {
                const items = MENU_ITEMS.filter(item => item.category === category);
                if (items.length === 0) return null;
                return (
                    <div key={category}>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-white">{category}s</h2>
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {items.map((dish: Dish) => (
                                <MenuItem key={dish.id} dish={dish} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Menu;