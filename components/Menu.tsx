
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
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const categoryName = entry.target.getAttribute('data-category');
                    if (categoryName) {
                        setActiveCategory(categoryName);
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
            rootMargin: '-15% 0% -80% 0%',
            threshold: 0
        });

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
            {/* Sticky Section Navigation - Mobile Optimized */}
            <nav className="sticky top-4 z-40 mb-12 mx-auto">
                <div 
                    ref={navRef}
                    className="bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-1.5 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar shadow-[0_10px_30px_rgba(0,0,0,0.3)] scroll-smooth mx-2"
                >
                    {categories.map(category => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                data-nav-item={category}
                                onClick={() => scrollToSection(category)}
                                className={`relative px-4 py-2 rounded-full text-[10px] tracking-wider uppercase font-bold transition-all whitespace-nowrap ${
                                    isActive ? 'text-white bg-white/10' : 'text-white/40'
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </nav>

            <div className="space-y-24 pb-20">
                {categories.map((category, index) => {
                    const items = MENU_ITEMS.filter(item => item.category === category);
                    if (items.length === 0) return null;
                    const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    
                    return (
                        <section 
                            key={category} 
                            id={sectionId} 
                            data-category={category}
                            className="scroll-mt-32 px-2"
                        >
                            <div className="flex flex-col items-center mb-10 text-center">
                                <div className="flex items-center gap-3 mb-4 opacity-20">
                                    <div className="w-8 h-[1px] bg-white"></div>
                                    <span className="text-[9px] tracking-[0.5em] uppercase font-black italic">Page {index + 1}</span>
                                    <div className="w-8 h-[1px] bg-white"></div>
                                </div>
                                <h2 className="text-4xl font-serif italic text-white mb-4 tracking-tight">{category}</h2>
                                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            {/* Strictly 1 column for mobile impact */}
                            <div className="grid grid-cols-1 gap-y-16">
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
