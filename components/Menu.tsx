
import React from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import type { Dish } from '../types';

const Menu: React.FC = () => {
    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

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
            <nav className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-xl border-b border-white/5 mb-16 py-4 -mx-4 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 md:gap-12 overflow-x-auto no-scrollbar">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => scrollToSection(category.toLowerCase().replace(' ', '-'))}
                            className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-black text-white/50 hover:text-white transition-all border-b border-transparent hover:border-white pb-1 whitespace-nowrap"
                        >
                            {category}s
                        </button>
                    ))}
                </div>
            </nav>

            <div className="space-y-24 pb-20">
                {/* Elegant spacing element */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-12 h-[1px] bg-white/20 mb-4"></div>
                    <p className="text-[10px] tracking-[0.6em] uppercase text-white/40 font-light italic">Refined flavors, Unforgettable moments</p>
                </div>

                {categories.map(category => {
                    const items = MENU_ITEMS.filter(item => item.category === category);
                    if (items.length === 0) return null;
                    const sectionId = category.toLowerCase().replace(' ', '-');
                    
                    return (
                        <section key={category} id={sectionId} className="scroll-mt-32">
                            <div className="flex items-center gap-6 mb-12">
                                <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-white">{category}s</h2>
                                <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                                <span className="text-[9px] tracking-widest uppercase opacity-30 font-bold">{items.length} items</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
