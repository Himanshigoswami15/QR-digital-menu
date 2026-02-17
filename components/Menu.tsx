
import React from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import type { Dish } from '../types';

const Menu: React.FC = () => {
    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

    return (
        <div className="space-y-16 pb-20">
            {categories.map(category => {
                const items = MENU_ITEMS.filter(item => item.category === category);
                if (items.length === 0) return null;
                return (
                    <div key={category}>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-white">{category}s</h2>
                            <div className="h-[1px] flex-grow bg-white/20"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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