
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
            <nav className="sticky top-6 z-40 mb-20 mx-auto max-w-fit px-4">
                <div className="bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-2 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[92vw] md:max-w-5xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => scrollToSection(category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}
                            className="px-5 py-2.5 rounded-full text-[9px] md:text-[10px] tracking-[0.1em] uppercase font-bold text-white/50 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="space-y-40 pb-40">
                {categories.map((category, index) => {
                    const items = MENU_ITEMS.filter(item => item.category === category);
                    if (items.length === 0) return null;
                    const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    
                    return (
                        <section key={category} id={sectionId} className="scroll-mt-32 px-4">
                            <div className="flex flex-col items-center mb-20 text-center">
                                <div className="flex items-center gap-5 mb-6 opacity-20">
                                    <div className="w-12 h-[1px] bg-white"></div>
                                    <span className="text-[10px] tracking-[0.6em] uppercase font-black italic">Section {index + 1}</span>
                                    <div className="w-12 h-[1px] bg-white"></div>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-serif italic text-white mb-8 tracking-tight">{category}</h2>
                                <div className="flex items-center gap-6 w-full max-w-md">
                                    <div className="h-[0.5px] flex-grow bg-gradient-to-l from-white/30 to-transparent"></div>
                                    <div className="flex gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full border border-white/40"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                                        <div className="w-1.5 h-1.5 rounded-full border border-white/40"></div>
                                    </div>
                                    <div className="h-[0.5px] flex-grow bg-gradient-to-r from-white/30 to-transparent"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
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
