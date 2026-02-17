
import React from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import type { Dish } from '../types';

const Menu: React.FC = () => {
    const categories: Dish['category'][] = [
        'On The Run', 
        'Chaat House', 
        'Tandoori Starters', 
        'Chinese', 
        'Shahi Vegetable', 
        'Veg Main Course', 
        'Dal & Rice', 
        'Indian Bread', 
        'Salad & Raita'
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative">
            {/* Sticky Section Navigation */}
            <nav className="sticky top-4 z-40 mb-16 mx-auto max-w-fit">
                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-1.5 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[90vw] md:max-w-5xl">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => scrollToSection(category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
                            className="px-4 py-2 rounded-full text-[9px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="space-y-32 pb-32">
                {categories.map(category => {
                    const items = MENU_ITEMS.filter(item => item.category === category);
                    if (items.length === 0) return null;
                    const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    
                    return (
                        <section key={category} id={sectionId} className="scroll-mt-32">
                            <div className="flex flex-col items-center mb-16 text-center">
                                <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 font-bold mb-4">Discover Our</span>
                                <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">{category}</h2>
                                <div className="flex items-center gap-4 w-full max-w-xs">
                                    <div className="h-[1px] flex-grow bg-gradient-to-l from-white/20 to-transparent"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                                    <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                                {items.map((dish: Dish) => (
                                    <MenuItem key={dish.id} dish={dish} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Menu;
