
import React from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import type { Dish } from '../types';

const Menu: React.FC = () => {
    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

    return (
        <div className="space-y-12">
            {categories.map(category => {
                const items = MENU_ITEMS.filter(item => item.category === category);
                if (items.length === 0) return null;
                return (
                    <div key={category}>
                        <h2 className="text-3xl font-extrabold text-primary mb-6 border-b-2 border-primary/30 pb-2">{category}s</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
