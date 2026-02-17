
import React, { useState, useEffect, useRef } from 'react';
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

    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
    const navRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Observer to track which section is currently in view
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const categoryName = entry.target.getAttribute('data-category');
                    if (categoryName) {
                        setActiveCategory(categoryName);
                        // Automatically scroll the navigation bar to the active item
                        const navButton = document.querySelector(`[data-nav-item="${categoryName}"]`);
                        if (navButton && navRef.current) {
                            navButton.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                                inline: 'center'
                            });
                        }
                    }
                }
            });
        }, {
            // Adjust rootMargin to trigger when section is near the top of the viewport
            rootMargin: '-20% 0% -70% 0%',
            threshold: 0
        });

        // Attach observer to all sections
        categories.forEach(category => {
            const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            const el = document.getElementById(sectionId);
            if (el) observer.current?.observe(el);
        });

        return () => observer.current?.disconnect();
    }, []);

    const scrollToSection = (category: string) => {
        const id = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 140;
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
                <div 
                    ref={navRef}
                    className="bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-2 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[92vw] md:max-w-5xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] scroll-smooth"
                >
                    {categories.map(category => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                data-nav-item={category}
                                onClick={() => scrollToSection(category)}
                                className={`relative px-5 py-2.5 rounded-full text-[9px] md:text-[10px] tracking-[0.15em] uppercase font-bold transition-all whitespace-nowrap ${
                                    isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                                }`}
                            >
                                {category}
                                {isActive && (
                                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white animate-width-expand"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            <div className="space-y-40 pb-40">
                {categories.map((category, index) => {
                    const items = MENU_ITEMS.filter(item => item.category === category);
                    if (items.length === 0) return null;
                    const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    
                    return (
                        <section 
                            key={category} 
                            id={sectionId} 
                            data-category={category}
                            className="scroll-mt-40 px-4"
                        >
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
                @keyframes width-expand {
                    from { width: 0; opacity: 0; }
                    to { width: 1rem; opacity: 1; }
                }
                .animate-width-expand {
                    animation: width-expand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default Menu;
